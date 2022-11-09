import { TableContainer, Paper, Table, TableBody } from '@mui/material';
import React from 'react';
import { TableContainerHead } from '../TableHeadContainer/TableHeadContainer';
import { TablePaginator } from '../TablePaginationContainer/TablePaginationContainer';

const TableContainerGenerator = ({
  tableTitles,
  tableItems,
  count = 0,
  pagination,
}: {
  tableTitles: string[];
  count?: number;
  pagination?: boolean;
  tableItems?: any;
}) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table size="medium">
          <TableContainerHead titles={tableTitles} />
          <TableBody id="table-body">{tableItems}</TableBody>
        </Table>
      </TableContainer>
      {pagination && <TablePaginator />}
    </>
  );
};

export default TableContainerGenerator;
