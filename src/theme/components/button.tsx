import type { Components } from '@mui/material/styles';

import type { Theme } from '../types';

export const MuiButton = {
  defaultProps: {
    size: 'medium',
    variant: 'contained',
  },
  styleOverrides: {
    root: { textTransform: 'none', boxShadow: 'none' },
  },
} satisfies Components<Theme>['MuiButton'];
