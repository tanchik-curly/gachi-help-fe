import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectPagination } from 'store/slices/tableSlice';
import { getRequestedHelpByUserId } from 'store/slices/userSlice';
import { Box, Typography } from '@mui/material';
import { Status } from 'components/Status';
import TableContainerGenerator from 'components/Table/TableContainer/TableContainer';
import { TableContainerRow } from 'components/Table/TableContainerRow/TableContainerRow';
import { homePageTitleRequestedHelps } from 'utils/tableTitles';
import Filters from './filters/PeriodFilters';

export const PeriodTabPanel = () => {
  const dispatch = useAppDispatch();
  const { rowsPerPage, currentPage } = useAppSelector(selectPagination);
  const { lastRequestedHelpList, userId } = useAppSelector(state => ({
    lastRequestedHelpList: state.user.requestedHelp.list,
    userId: state.user.id,
  }));

  useEffect(() => {
    if (userId) {
      dispatch(
        getRequestedHelpByUserId({
          userId,
          limit: 4,
          skip: 0,
        }),
      );
    }
  }, [dispatch, rowsPerPage, currentPage, userId]);

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
    <Box padding={5}>
      <Filters />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        {requestedHelpList.length ? (
          <TableContainerGenerator
            headerName="Остання запрошені допомоги"
            count={requestedHelpList.length}
            tableTitles={homePageTitleRequestedHelps}
            tableItems={requestedHelpList}
          />
        ) : (
          <p>No states</p>
        )}
      </Box>
    </Box>
  );
};
