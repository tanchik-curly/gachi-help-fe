import React from 'react';
import { Paper, Table, TableBody, TableContainer } from '@mui/material';
import { TableContainerHead } from '../TableHeadContainer/TableHeadContainer';
import { TablePaginator } from '../TablePaginationContainer/TablePaginationContainer';

const TableContainerGenerator = ({
  tableTitles,
  tableItems,
  headerName,
  count = 0,
  pagination,
}: {
  tableTitles: string[];
  headerName: string;
  count?: number;
  pagination?: boolean;
  tableItems?: any;
}) => {
  return (
    <>
      <TableContainer sx={{ background: 'none' }} component={Paper}>
        <Table size="medium">
          <TableContainerHead headerName={headerName} titles={tableTitles} />
          <TableBody sx={{ background: '#242424' }} id="table-body">
            {tableItems}
          </TableBody>
        </Table>
      </TableContainer>
      {pagination && <TablePaginator />}
    </>
  );
};

export default TableContainerGenerator;
