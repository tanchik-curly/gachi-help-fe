import { createTheme } from '@mui/material';
import { paletteGenerator } from './palette';

export const theme = () => {
  const palette = paletteGenerator();

  return createTheme({
    palette,
  });
};
