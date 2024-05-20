import { describe, expect, it } from 'vitest';
import { MuiButton } from '../../../theme/components/button.tsx';

describe('MuiButton styles configuration', () => {
  it('should have correct default properties', () => {
    expect(MuiButton.defaultProps).toEqual({
      size: 'medium',
      variant: 'contained',
    });
  });

  it('should have correct style overrides', () => {
    expect(MuiButton.styleOverrides).toEqual({
      root: { textTransform: 'none', boxShadow: 'none' },
    });
  });
});
