import { paperClasses } from '@mui/material/Paper';
import { MuiCard } from '../../../theme/components/card.tsx';
import { describe, expect, it } from 'vitest';


describe('MuiCard styles configuration', () => {
  it('should have correct style overrides', () => {
    const styles = MuiCard.styleOverrides.root();
    expect(styles).toEqual({
      [`&.${paperClasses.elevation1}`]: {
        boxShadow: '0 5px 22px 0 rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.06)',
      },
    });
  });
});
