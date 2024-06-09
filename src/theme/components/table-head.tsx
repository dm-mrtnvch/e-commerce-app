import type { Components } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';

import type { Theme } from '../types';

export const MuiTableHead = {
  styleOverrides: {
    root: {
      [`& .${tableCellClasses.root}`]: {
        backgroundColor: 'var(--mui-palette-grey-200)',
        color: 'var(--mui-palette-grey-600)',
        fontWeight: 'bold',
        lineHeight: '24px',

        '&:first-of-type': {
          borderTopLeftRadius: 'var(--mui-shape-borderRadius)',
        },

        '&:last-of-type': {
          borderTopRightRadius: 'var(--mui-shape-borderRadius)',
        },
      },
    },
  },
} satisfies Components<Theme>['MuiTableHead'];
