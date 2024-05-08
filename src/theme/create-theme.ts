import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

import { colorSchemes } from './color-schemes';
import { components } from './components';
import type { Theme } from './types';
import { typography } from './typography';

export function createTheme(): Theme {
  const theme = extendTheme({
    colorSchemes,
    shape: { borderRadius: 8 },
    typography,
    components,
  });

  return theme;
}
