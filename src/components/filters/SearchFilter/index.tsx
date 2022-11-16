import React, { useEffect, useState } from 'react';
import { Search as SearchIcon } from '@mui/icons-material';
import { IconButton, InputBase, Paper } from '@mui/material';

export const Search = ({
  value,
  handler,
  placeholder,
}: {
  value: string;
  handler: (...args: any) => any;
  placeholder?: string;
}) => {
  const [searchValue, setSearchValue] = useState(value);
  const setSearchLabel = (param?: string) =>
    !param ? 'Search' : `Search ${param}`;
  const handleSetSearchValue = (event: any) => {
    setSearchValue(event.target.value);
  };

  const handleSubmitSearch = (event: any) => {
    if (event.key === 'Enter') {
      handler(searchValue);
    }
  };

  const handleSearch = () => {
    handler(searchValue);
  };

  useEffect(() => {
    setSearchValue(value);
  }, [value]);

  return (
    <Paper>
      <InputBase
        placeholder={setSearchLabel(placeholder)}
        value={searchValue}
        onChange={handleSetSearchValue}
        onKeyPress={handleSubmitSearch}
      />
      <IconButton aria-label="search" onClick={handleSearch}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};
