import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes } from 'routes/routesConfig';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectPagination, setItemsCount } from 'store/slices/tableSlice';
import { getListOfUsers } from 'store/slices/usersSlice';
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { TablePaginator } from 'components/Table/TablePaginationContainer/TablePaginationContainer';
import Filters from 'components/UsersFilters';

export const UsersPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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
        search: filters?.search,
        limit: rowsPerPage,
        skip: currentPage * rowsPerPage,
      }),
    );
  }, [dispatch, rowsPerPage, currentPage, filters, count]);

  const handleOnClick = (id?: number) => {
    navigate(`${Routes.Users}/${id}`);
  };

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
        Користувачі
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Filters />
        {usersList.length ? (
          <>
            <List
              sx={{ width: '100%' }}
              component="nav"
              aria-labelledby="nested-list-subheader"
            >
              {usersList.map(user => (
                <ListItemButton
                  data-key={user.id}
                  onClick={() => handleOnClick(user?.id)}
                  sx={{ boxShadow: 1, borderRadius: 2 }}
                  key={user.id}
                >
                  <ListItemText
                    sx={{
                      color: 'grey.400',
                      height: 45,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    primary={`${user.surname} ${user.name} ${user.patronym}`}
                  />
                </ListItemButton>
              ))}
            </List>
            <TablePaginator />
          </>
        ) : (
          <p>No states</p>
        )}
      </Box>
    </Box>
  );
};
