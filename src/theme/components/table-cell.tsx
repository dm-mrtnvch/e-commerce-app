import type { Components } from '@mui/material/styles';

import type { Theme } from '../types';

export const MuiTableCell = {
  styleOverrides: {
    root: {
      padding: '12px 16px',
      borderBottom: 'var(--TableCell-borderWidth, 1px) solid var(--mui-palette-TableCell-border)',
    },
    head: {
      color: 'var(--mui-palette-grey-700)',
      padding: '16px',
    },
    paddingCheckbox: { padding: '0 0 0 24px' },
  },
} satisfies Components<Theme>['MuiTableCell'];
