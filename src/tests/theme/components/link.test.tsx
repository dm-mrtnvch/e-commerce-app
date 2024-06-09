import { describe, expect, it } from 'vitest';
import { MuiLink } from '../../../theme/components/link';

describe('MuiLink styles configuration', () => {
  it('should have correct default props', () => {
    const defaultProps = MuiLink.defaultProps;
    expect(defaultProps).toEqual({ underline: 'hover' });
  });

  it('should have correct root style overrides', () => {
    const rootStyles = MuiLink.styleOverrides.root;
    expect(rootStyles).toEqual({ cursor: 'pointer' });
  });
});
