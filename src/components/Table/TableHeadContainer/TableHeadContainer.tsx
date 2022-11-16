import React from 'react';
import { TableCell, TableHead, TableRow } from '@mui/material';

export const TableContainerHead = ({
  titles,
  headerName,
}: {
  titles: string[];
  headerName: string;
}) => {
  const headerPlug = [headerName, ...Array(titles.length - 1)].map(el => (
    <TableCell
      sx={{ color: 'white', border: 'none !important' }}
      variant="head"
      key={el}
    >
      {el}
    </TableCell>
  ));

  const headRow = titles.map(title => (
    <TableCell
      sx={{ color: 'white', border: 'none' }}
      variant="head"
      key={title}
    >
      {title}
    </TableCell>
  ));

  return (
    <TableHead
      key="header-head"
      sx={{ background: '#020202', border: '1px solid #020202' }}
    >
      <TableRow key="header-plug">{headerPlug}</TableRow>
      <TableRow
        key="header-main"
        sx={{ border: '1px solid #131313', background: '#131313' }}
      >
        {headRow}
      </TableRow>
    </TableHead>
  );
};
