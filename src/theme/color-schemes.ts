import type { ColorSystemOptions } from '@mui/material';

import type { ColorScheme } from './types';
import { base, grey } from './colors';

export const colorSchemes = {
  light: {
    palette: {
      ...base,
      text: {
        primary: grey[800],
        secondary: grey[600],
        disabled: grey[500],
      },
      background: {
        paper: '#FFFFFF',
        default: grey[100],
      },
    },
  },
} satisfies Partial<Record<ColorScheme, ColorSystemOptions>>;
