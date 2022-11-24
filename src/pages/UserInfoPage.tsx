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
  const { lastRequestedHelpList, lastUserComments } = useAppSelector(state => ({
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
    </Box>
  );
};
