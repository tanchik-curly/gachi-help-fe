import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectPagination } from 'store/slices/tableSlice';
import {
  getCommentsByUserId,
  getSocialStatsByUserId,
} from 'store/slices/userSlice';
import { Box, Typography } from '@mui/material';
import TableContainerGenerator from 'components/Table/TableContainer/TableContainer';
import { TableContainerRow } from 'components/Table/TableContainerRow/TableContainerRow';
import { homePageTitleComments } from 'utils/tableTitles';
import { SocialDonutChart } from '../components/Charts/SocialDonutChart';

export const SocialInfoPage = () => {
  const dispatch = useAppDispatch();

  const { rowsPerPage, currentPage } = useAppSelector(selectPagination);
  const { lastUserComments, userId } = useAppSelector(state => ({
    lastRequestedHelpList: state.user.requestedHelp.list,
    lastUserComments: state.user.comments.list,
    socialStats: state.user.socialStats,
    userId: state.user.id,
  }));

  useEffect(() => {
    if (userId) {
      dispatch(
        getSocialStatsByUserId({
          userId,
        }),
      );
      dispatch(
        getCommentsByUserId({
          userId,
          limit: rowsPerPage,
          skip: currentPage * rowsPerPage,
        }),
      );
    }
  }, [dispatch, rowsPerPage, currentPage, userId]);

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
        Соціальна інформація
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <SocialDonutChart userId={userId}/>
        {commentItems.length ? (
          <TableContainerGenerator
            pagination
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
