import { describe, expect, it } from 'vitest';
import { MuiCardContent } from '../../../theme/components/card-content.tsx';

describe('MuiCardContent styles configuration', () => {
  it('should have correct style overrides', () => {
    const styles = MuiCardContent.styleOverrides.root;
    expect(styles).toEqual({
      padding: '32px',
      '&:last-child': { paddingBottom: '32px' },
    });
  });
});
