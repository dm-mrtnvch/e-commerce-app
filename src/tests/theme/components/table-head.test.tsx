import { describe, expect, it } from 'vitest';
import { tableCellClasses } from '@mui/material/TableCell';
import { MuiTableHead } from '../../../theme/components/table-head';

describe('MuiTableHead styles configuration', () => {
  it('should have correct root style overrides', () => {
    const rootStyles = MuiTableHead.styleOverrides.root;
    expect(rootStyles).toEqual({
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
    });
  });
});
