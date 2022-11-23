/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from 'store/slices/tableSlice';
import { DateRangePickerFilter } from 'components/filters/DateFilter';

export const FilterDateRangePicker = ({
  setFilterValue,
  filters,
}: {
  setFilterValue: (...args: any) => any;
  filters: { dateTo: string; dateFrom: string };
}) => {
  const dispatch = useDispatch();

  const setDateRangeFilter = (date: any) => {
    dispatch(setCurrentPage(0));
    console.log(date);
    dispatch(
      setFilterValue({
        dateFrom: date ? new Date(date[0]).toISOString() : '',
        dateTo: date ? new Date(date[1]).toISOString() : '',
      }),
    );
  };

  return (
    <DateRangePickerFilter
      dateFrom={filters.dateFrom}
      dateTo={filters.dateTo}
      handler={setDateRangeFilter}
    />
  );
};
