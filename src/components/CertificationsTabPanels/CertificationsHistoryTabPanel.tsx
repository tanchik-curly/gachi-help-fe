import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectPagination, setItemsCount } from 'store/slices/tableSlice';
import { getCertificationsByUserId } from 'store/slices/userSlice';
import { Box } from '@mui/material';
import TableContainerGenerator from 'components/Table/TableContainer/TableContainer';
import { TableContainerRow } from 'components/Table/TableContainerRow/TableContainerRow';
import { certificationTiles } from 'utils/tableTitles';

export const CertificationsHistoryTabPanel = () => {
  const dispatch = useAppDispatch();
  const { rowsPerPage, currentPage } = useAppSelector(selectPagination);
  const { certificationList, userId, count } = useAppSelector(state => ({
    userId: state.user.id,
    count: state.user.certifications.list.itemCount,
    certificationList: state.user.certifications.list.items,
  }));

  useEffect(() => {
    dispatch(setItemsCount(count));
    dispatch(
      getCertificationsByUserId({
        userId: +userId,
        limit: rowsPerPage,
        skip: currentPage * rowsPerPage,
      }),
    );
  }, [dispatch, rowsPerPage, currentPage, count]);

  const certificationsParsedList = certificationList.map(certification => (
    <TableContainerRow
      id={certification.id.toString()}
      key={certification.id}
      commentDate={new Date(certification.createdAt).toLocaleDateString(
        'en-US',
      )}
      certificationName={certification.name}
      certificationDescription={certification.description}
    />
  ));

  return (
    <Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        {certificationsParsedList.length ? (
          <TableContainerGenerator
            pagination
            headerName="Історія сертифікацій"
            count={certificationsParsedList.length}
            tableTitles={certificationTiles}
            tableItems={certificationsParsedList}
          />
        ) : (
          <p>No certifications yet</p>
        )}
      </Box>
    </Box>
  );
};
