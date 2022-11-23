/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useAppDispatch } from 'store/hooks';
import { setCurrentPage } from 'store/slices/tableSlice';
import { Search } from 'components/filters/SearchFilter';

export const SearchFilter = ({
  setFilterValue,
  value,
  selectorFunc,
}: {
  setFilterValue: (...args: any) => any;
  value: string;
  selectorFunc: (...args: any) => any;
}) => {
  const dispatch = useAppDispatch();
  const setSearchFilter = (search: string) => {
    dispatch(setCurrentPage(0));
    dispatch(setFilterValue(selectorFunc(search)));
  };

  return <Search value={value} handler={setSearchFilter} />;
};
