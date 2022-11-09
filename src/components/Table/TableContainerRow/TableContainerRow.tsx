import React from 'react';
import { Avatar, TableCell, TableRow } from '@mui/material';

interface ITableContainerRow {
  id: string;
  image?: string;
  editHandler?: any;
  clickHandler?: any;
  deleteHandler?: any;
  infoHandler?: any;
  showInfo?: boolean;
  showAvatar?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;
  [key: string]: any;
}

export const TableContainerRow = ({
  id,
  image,
  editHandler,
  showAvatar,
  showEdit,
  showInfo,
  showDelete,
  infoHandler,
  deleteHandler,
  clickHandler,
  ...rest
}: ITableContainerRow) => {
  const properties: any = { ...rest };
  const tableCells = Object.keys(properties).map(property => (
    <TableCell key={property} data-cy="table-cell">
      {properties[property]}
    </TableCell>
  ));
  return (
    <TableRow
      style={{ height: 60 }}
      key={id}
      hover
      onClick={e => clickHandler(e)}
    >
      {tableCells}
    </TableRow>
  );
};
