import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import {
  getCommentsByUserId,
  getRequestedHelpByUserId,
} from 'store/slices/userSlice';
import { getUserById } from 'store/slices/usersSlice';
import {
  Avatar,
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { JobsLineChart } from 'components/Charts/JobsLineChart';
import { RequestHelpColumnChart } from 'components/Charts/RequestHelpColumnChart';
import { SocialDonutChart } from 'components/Charts/SocialDonutChart';
import { Status } from 'components/Status';
import TableContainerGenerator from 'components/Table/TableContainer/TableContainer';
import { TableContainerRow } from 'components/Table/TableContainerRow/TableContainerRow';
import {
  homePageTitleComments,
  homePageTitleRequestedHelps,
} from 'utils/tableTitles';

export const UserInfoPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    appliedJobList,
    proposedJobApplicationList,
    lastRequestedHelpList,
    lastUserComments,
  } = useAppSelector(state => ({
    proposedJobApplicationList: state.user.proposedJobApplications.list,
    appliedJobList: state.user.jobApplications.list,
    lastRequestedHelpList: state.user.requestedHelp.list,
    lastUserComments: state.user.comments.list,
    userId: state.user.id,
  }));
  const selectedUser = useAppSelector(state => state.users.selectedUser);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(getUserById({ userId: +userId || 0 }));
  }, [dispatch, userId]);

  useEffect(() => {
    if (userId) {
      dispatch(
        getRequestedHelpByUserId({
          userId: +userId || 0,
          limit: 4,
          skip: 0,
          dateFrom: '',
          dateTo: '',
        }),
      );
      dispatch(
        getCommentsByUserId({
          userId: +userId || 0,
          limit: 4,
          skip: 0,
        }),
      );
    }
  }, [dispatch, userId]);

  const commentItems = lastUserComments.items.map(comment => (
    <TableContainerRow
      id={comment.id.toString()}
      key={comment.id}
      commentDate={new Date(comment.createDateTime).toLocaleDateString('en-US')}
      commentAuthor={`${comment.author.name} ${comment.author.surname}`}
      threadName={comment.forumName}
      commentName={comment.text}
    />
  ));

  const requestedHelpList = lastRequestedHelpList.items.map(
    requestedHelpItem => (
      <TableContainerRow
        id={requestedHelpItem.id.toString()}
        key={requestedHelpItem.id}
        commentDate={new Date(requestedHelpItem.createdAt).toLocaleDateString(
          'en-US',
        )}
        userInfo={`${requestedHelpItem.author.name} ${requestedHelpItem.author.surname}`}
        categoryName={requestedHelpItem.helpCategory.name}
        categoryStatus={<Status status={requestedHelpItem.status} />}
      />
    ),
  );

  const types = [
    {
      id: 1,
      name: 'Кухар',
    },
    {
      id: 2,
      name: 'Поліцейський',
    },
    {
      id: 3,
      name: 'Сушист',
    },
    {
      id: 4,
      name: 'Далекобійник',
    },
    {
      id: 5,
      name: 'Продавець-консультант',
    },
    {
      id: 6,
      name: 'Дизайнер',
    },
    {
      id: 7,
      name: 'Програміст',
    },
  ];

  return (
    <Box padding={5} width="100%" sx={{ overflowY: 'hidden' }} mt={5}>
      <Box display="flex" justifyContent="flex-start" margin="20px 0 ">
        <Button variant="contained" onClick={() => navigate(-1)}>
          Назад
        </Button>
      </Box>
      <Paper sx={{ background: '#242424', color: 'grey.700' }}>
        <Box padding={5}>
          <Box display="flex" pb={7} justifyContent="center">
            <Avatar
              sx={{
                width: 200,
                height: 200,
                fontSize: 65,
                textAlign: 'center',
              }}
            >{`${selectedUser.name[0]}${selectedUser.surname[0]}`}</Avatar>
          </Box>
          <Typography variant="h4">
            {selectedUser.name} {selectedUser.surname}
          </Typography>
          <Stack
            display="flex"
            alignItems="center"
            justifyContent="center"
            direction="row"
          >
            <Chip
              label={selectedUser.role}
              sx={{ margin: 2 }}
              color="primary"
            />
            <Typography>{selectedUser.email}</Typography>
          </Stack>
        </Box>
      </Paper>
      <Typography
        sx={{ marginTop: 5, color: 'grey.200' }}
        variant="h4"
        textAlign="left"
      >
        Статистика отримання допомоги
      </Typography>
      <Paper sx={{ background: '#242424', color: 'grey.700' }}>
        <RequestHelpColumnChart
          helpData={lastRequestedHelpList.items}
          title={'Графік наданої допомоги по категоріям'}
        />
      </Paper>
      <Box mt={5}>
        {requestedHelpList.length ? (
          <TableContainerGenerator
            headerName="Останні запрошені допомоги"
            count={requestedHelpList.length}
            tableTitles={homePageTitleRequestedHelps}
            tableItems={requestedHelpList}
          />
        ) : (
          <p>No requested help by user yet</p>
        )}
      </Box>
      <Box>
        <Typography
          sx={{ marginTop: 5, color: 'grey.200' }}
          variant="h4"
          textAlign="left"
        >
          Соціальна статистика
        </Typography>
        <Paper sx={{ background: '#242424', color: 'grey.700' }}>
          <SocialDonutChart userId={userId ? +userId : 0} />
        </Paper>
      </Box>
      <Box mt={5}>
        {commentItems.length ? (
          <TableContainerGenerator
            headerName="Останні коментарі"
            count={commentItems.length}
            tableTitles={homePageTitleComments}
            tableItems={commentItems}
          />
        ) : (
          <p>No comments</p>
        )}
      </Box>
      <Typography
        sx={{ marginTop: 5, color: 'grey.200' }}
        variant="h4"
        textAlign="left"
      >
        Статистика сертифікацій та працевлаштування
      </Typography>
      <Paper sx={{ background: '#242424', color: 'grey.700' }}>
        <JobsLineChart
          applicationData={proposedJobApplicationList.items}
          applicationTypes={types}
          title={'Графік пропонованих вакансій'}
        />
        <JobsLineChart
          applicationData={appliedJobList.items}
          applicationTypes={types}
          title={'Графік поданих вакансій'}
        />
      </Paper>
    </Box>
  );
};
