import React from 'react';
import { Box, Typography } from '@mui/material';
import TableContainerGenerator from 'components/Table/TableContainer/TableContainer';
import { TableContainerRow } from 'components/Table/TableContainerRow/TableContainerRow';
import { homePageTitle } from 'utils/tableTitles';

export const HomePage = () => {
  const commentList = [
    {
      id: 1,
      date: Date.now(),
      fullName: 'John Doe',
      threadName: 'Search for Dungeon Master',
      messageText:
        'Can someone help me? I am struggling to find decent dungeon master',
    },
    {
      id: 2,
      date: Date.now(),
      fullName: 'John Doe',
      threadName: 'Search for Dungeon Master',
      messageText:
        'Can someone help me? I am struggling to find decent dungeon master',
    },
    {
      id: 3,
      date: Date.now(),
      fullName: 'John Doe',
      threadName: 'Search for Dungeon Master',
      messageText:
        'Can someone help me? I am struggling to find decent dungeon master',
    },
  ];

  const commentItems =
    commentList &&
    commentList.map(comment => (
      <TableContainerRow
        id={comment.id.toString()}
        key={comment.id}
        commentDate={new Date(comment.date).toLocaleDateString('en-US')}
        commentAuthor={comment.fullName}
        threadName={comment.threadName}
        commentName={comment.messageText}
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
        {commentItems?.length ? (
          <TableContainerGenerator
            pagination
            headerName="Last comments"
            count={commentItems?.length}
            tableTitles={homePageTitle}
            tableItems={commentItems}
          />
        ) : (
          <p>No states</p>
        )}
      </Box>
    </Box>
  );
};
