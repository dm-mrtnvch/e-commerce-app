import type { Components } from '@mui/material/styles';

import type { Theme } from '../types';

export const MuiCardContent = {
  styleOverrides: {
    root: { padding: '32px' },
  },
} satisfies Components<Theme>['MuiCardContent'];
