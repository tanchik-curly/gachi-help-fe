import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

type OptionPickerProps = {
  value: any;
  label: string;
  onChange: (...agrs: any) => any;
  options: { id: number; name: string }[];
};

const OptionPicker: React.FC<OptionPickerProps> = ({
  value,
  onChange,
  label,
  options,
}: OptionPickerProps) => {
  const optionElems = options.map(option => (
    <MenuItem key={option.name} value={option.id}>
      {option.name}
    </MenuItem>
  ));

  return (
    <FormControl variant="filled" sx={{ width: 290 }}>
      <InputLabel sx={{ color: '#828282' }}>{label}</InputLabel>
      <Select
        displayEmpty
        sx={{ color: 'white', textAlign: 'left' }}
        value={value?.id}
        onChange={onChange}
      >
        {optionElems}
      </Select>
    </FormControl>
  );
};

export default OptionPicker;
