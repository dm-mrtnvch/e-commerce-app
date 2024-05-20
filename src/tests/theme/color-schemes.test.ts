import { describe, expect, it } from 'vitest';
import { colorSchemes } from '../../theme/color-schemes.ts';
import { base, grey } from '../../theme/colors.ts';

describe('colorSchemes configuration', () => {
  it('should have correct light color scheme', () => {
    expect(colorSchemes.light.palette).toEqual({
      ...base,
      text: {
        primary: grey[800],
        secondary: grey[600],
        disabled: grey[500],
      },
      background: {
        paper: '#FFFFFF',
        default: grey[100],
      },
    });
  });
});
