import { describe, expect, it } from 'vitest';
import { tableCellClasses } from '@mui/material/TableCell';
import { tableRowClasses } from '@mui/material/TableRow';
import { MuiTableBody } from '../../../theme/components/table-body';

describe('MuiTableBody styles configuration', () => {
  it('should have correct style overrides', () => {
    const styles = MuiTableBody.styleOverrides.root;
    expect(styles).toEqual({
      [`& .${tableRowClasses.root}:last-child`]: {
        [`& .${tableCellClasses.root}`]: { '--TableCell-borderWidth': 0 },
      },
    });
  });
});
