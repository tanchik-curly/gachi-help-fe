import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectPagination } from 'store/slices/tableSlice';
import {
  getCommentsByUserId,
  getRequestedHelpByUserId,
} from 'store/slices/userSlice';
import { Box, Typography } from '@mui/material';
import { Status } from 'components/Status';
import TableContainerGenerator from 'components/Table/TableContainer/TableContainer';
import { TableContainerRow } from 'components/Table/TableContainerRow/TableContainerRow';
import {
  homePageTitleComments,
  homePageTitleRequestedHelps,
} from 'utils/tableTitles';

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const { lastRequestedHelpList, lastUserComments, userId } = useAppSelector(
    state => ({
      lastRequestedHelpList: state.user.requestedHelp.list,
      lastUserComments: state.user.comments.list,
      userId: state.user.id,
    }),
  );

  useEffect(() => {
    if (userId) {
      dispatch(
        getRequestedHelpByUserId({
          userId,
          limit: 4,
          skip: 0,
        }),
      );
      dispatch(
        getCommentsByUserId({
          userId,
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
    <Box padding={5} width="100%" mt={5}>
      <Typography
        sx={{
          fontWeight: 'medium',
          color: '#828282',
          textAlign: 'left',
          fontSize: 32,
          marginBottom: 2,
        }}
      >
        Домашня сторінка
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
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
        <Box sx={{ height: '50px' }} />
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
