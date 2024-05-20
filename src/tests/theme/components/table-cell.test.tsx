import { describe, expect, it } from 'vitest';
import { MuiTableCell } from '../../../theme/components/table-cell';

describe('MuiTableCell styles configuration', () => {
  it('should have correct root style overrides', () => {
    const rootStyles = MuiTableCell.styleOverrides.root;
    expect(rootStyles).toEqual({
      padding: '12px 16px',
      borderBottom: 'var(--TableCell-borderWidth, 1px) solid var(--mui-palette-TableCell-border)',
    });
  });

  it('should have correct head style overrides', () => {
    const headStyles = MuiTableCell.styleOverrides.head;
    expect(headStyles).toEqual({
      color: 'var(--mui-palette-grey-700)',
      padding: '16px',
    });
  });

  it('should have correct paddingCheckbox style overrides', () => {
    const paddingCheckboxStyles = MuiTableCell.styleOverrides.paddingCheckbox;
    expect(paddingCheckboxStyles).toEqual({
      padding: '0 0 0 24px',
    });
  });
});
