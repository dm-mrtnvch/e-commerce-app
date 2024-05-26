import { describe, expect, it } from 'vitest';
import { MuiCardHeader } from '../../../theme/components/card-header.tsx';

describe('MuiCardHeader styles configuration', () => {
  it('should have correct default props', () => {
    const defaultProps = MuiCardHeader.defaultProps;
    expect(defaultProps).toEqual({
      titleTypographyProps: { variant: 'h6' },
      subheaderTypographyProps: { variant: 'body2' },
    });
  });

  it('should have correct style overrides', () => {
    const styles = MuiCardHeader.styleOverrides.root;
    expect(styles).toEqual({ padding: '32px 24px 16px' });
  });
});
