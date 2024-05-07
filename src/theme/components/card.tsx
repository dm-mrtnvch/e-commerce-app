import { paperClasses } from '@mui/material/Paper';
import type { Components } from '@mui/material/styles';

import type { Theme } from '../types';

export const MuiCard = {
  styleOverrides: {
    root: () => {
      return {
        [`&.${paperClasses.elevation1}`]: {
          boxShadow: '0 5px 22px 0 rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.06)',
        },
      };
    },
  },
} satisfies Components<Theme>['MuiCard'];
