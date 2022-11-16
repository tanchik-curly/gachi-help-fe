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
    dispatch(
      setFilterValue({
        dateFrom: date ? date[0] : '',
        dateTo: date ? date[1] : '',
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
