import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectPagination, setItemsCount } from 'store/slices/tableSlice';
import { getRequestedHelpByUserId } from 'store/slices/userSlice';
import { getListOfUsers } from 'store/slices/usersSlice';
import { Box, Typography } from '@mui/material';
import TableContainerGenerator from 'components/Table/TableContainer/TableContainer';
import { TableContainerRow } from 'components/Table/TableContainerRow/TableContainerRow';
import { homePageTitleRequestedHelps, usersTitle } from 'utils/tableTitles';

export const UsersPage = () => {
  const dispatch = useAppDispatch();
  const { rowsPerPage, currentPage } = useAppSelector(selectPagination);
  const { usersList, count, filters } = useAppSelector(state => ({
    count: state.users.list.itemCount,
    usersList: state.users.list.items,
    filters: state.users.filters,
  }));

  useEffect(() => {
    dispatch(setItemsCount(count));
    dispatch(
      getListOfUsers({
        limit: rowsPerPage,
        skip: currentPage * rowsPerPage,
      }),
    );
  }, [dispatch, rowsPerPage, currentPage, filters, count]);

  const parsedUsersList = usersList.map(user => (
    <TableContainerRow
      id={user!.id!.toString()}
      key={user!.id}
      userInfo={`${user!.name} ${user!.surname} ${user!.patronym}`}
    />
  ));

  return (
    <Box padding={5} width="100%" mt={10}>
      <Typography textAlign="left" sx={{ color: 'white' }} variant="h5">
        Order info
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{}}
      >
        {parsedUsersList.length ? (
          <TableContainerGenerator
            pagination
            headerName="Остання запрошені допомоги"
            count={parsedUsersList.length}
            tableTitles={usersTitle}
            tableItems={parsedUsersList}
          />
        ) : (
          <p>No states</p>
        )}
      </Box>
    </Box>
  );
};
