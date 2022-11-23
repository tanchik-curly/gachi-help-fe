import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getCategoriesList } from 'store/slices/statSlice';
import { selectPagination } from 'store/slices/tableSlice';
import {
  getCommentsByUserId,
} from 'store/slices/userSlice';
import { Box, Typography } from '@mui/material';
import TableContainerGenerator from 'components/Table/TableContainer/TableContainer';
import { TableContainerRow } from 'components/Table/TableContainerRow/TableContainerRow';
import {
  homePageTitleComments,
} from 'utils/tableTitles';
import Filters from './filters/QuantityFilters';

export const QuantityTabPanel = () => {
  const dispatch = useAppDispatch();
  const { rowsPerPage, currentPage } = useAppSelector(selectPagination);
  const { lastUserComments, userId } = useAppSelector(state => ({
    lastUserComments: state.user.comments.list,

    userId: state.user.id,
  }));

  useEffect(() => {
    if (userId) {
      dispatch(getCategoriesList());
      dispatch(
        getCommentsByUserId({
          userId,
          limit: 4,
          skip: 0,
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
    <Box padding={5}>
      <Filters />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        {commentItems.length ? (
          <TableContainerGenerator
            headerName="Остання запрошені допомоги"
            count={commentItems.length}
            tableTitles={homePageTitleComments}
            tableItems={commentItems}
          />
        ) : (
          <p>No comments yet</p>
        )}
      </Box>
    </Box>
  );
};
