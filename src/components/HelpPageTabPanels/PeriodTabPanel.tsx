import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectPagination } from 'store/slices/tableSlice';
import { getRequestedHelpByUserId } from 'store/slices/userSlice';
import { Box } from '@mui/material';
import { Status } from 'components/Status';
import TableContainerGenerator from 'components/Table/TableContainer/TableContainer';
import { TableContainerRow } from 'components/Table/TableContainerRow/TableContainerRow';
import { homePageTitleRequestedHelps } from 'utils/tableTitles';
import Filters from './filters/PeriodFilters';
import 'rsuite/dist/rsuite.min.css';
import { getCategoriesList } from 'store/slices/statSlice';
import { RequestHelpColumnChart } from 'components/Charts/RequestHelpColumnChart';

export const PeriodTabPanel = () => {
  const dispatch = useAppDispatch();
  const { rowsPerPage, currentPage } = useAppSelector(selectPagination);
  const { lastRequestedHelpList, userId, filters } = useAppSelector(state => ({
    lastRequestedHelpList: state.user.requestedHelp.list,
    userId: state.user.id,
    filters: state.stat.requestedHelpStat.filters,
  }));

  useEffect(() => {
    if (userId) {
      dispatch(
        getRequestedHelpByUserId({
          userId,
          limit: 4,
          skip: 0,
          dateFrom: filters?.dateFrom || '',
          dateTo: filters?.dateTo || '',
        }),
      );
      dispatch(getCategoriesList());
    }
  }, [
    dispatch,
    rowsPerPage,
    currentPage,
    filters?.dateFrom,
    filters?.dateTo,
    userId,
  ]);

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
      <RequestHelpColumnChart helpData={lastRequestedHelpList.items} title={"Графік наданої допомоги по категоріям"}/>
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
          <p>No requested helps yet</p>
        )}
      </Box>
    </Box>
  );
};
