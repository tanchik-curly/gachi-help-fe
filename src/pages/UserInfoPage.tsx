import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getUserById } from 'store/slices/usersSlice';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

export const UserInfoPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const selectedUser = useAppSelector(state => state.users.selectedUser);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(getUserById({ userId: +userId || 0 }));
  }, [dispatch, userId]);

  console.log(userId);
  return (
    <Box padding={5} width="100%" mt={10}>
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
    </Box>
  );
};
