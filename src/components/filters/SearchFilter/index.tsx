/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Search as SearchIcon } from '@mui/icons-material';
import { IconButton, Paper, TextField } from '@mui/material';

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
      <TextField
        placeholder={setSearchLabel(placeholder)}
        value={searchValue}
        onChange={handleSetSearchValue}
        onKeyPress={handleSubmitSearch}
        InputProps={{
          endAdornment: (
            <IconButton aria-label="search" onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
          ),
        }}
      />
    </Paper>
  );
};
