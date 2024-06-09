import { describe, expect, it } from 'vitest';
import { alpha } from '@mui/material';
import { base } from "../../theme/colors.ts";

describe('colors configuration', () => {
  it('should have correct grey colors', () => {
    expect(base.grey).toEqual({
      0: '#FFFFFF',
      100: '#F9FAFB',
      200: '#F4F6F8',
      300: '#DFE3E8',
      400: '#C4CDD5',
      500: '#919EAB',
      600: '#637381',
      700: '#454F5B',
      800: '#212B36',
      900: '#161C24',
    });
  });

  it('should have correct primary colors', () => {
    expect(base.primary).toEqual({
      lighter: '#D0ECFE',
      light: '#73BAFB',
      main: '#1877F2',
      dark: '#0C44AE',
      darker: '#042174',
      contrastText: '#FFFFFF',
    });
  });

  it('should have correct secondary colors', () => {
    expect(base.secondary).toEqual({
      lighter: '#EFD6FF',
      light: '#C684FF',
      main: '#8E33FF',
      dark: '#5119B7',
      darker: '#27097A',
      contrastText: '#FFFFFF',
    });
  });

  it('should have correct info colors', () => {
    expect(base.info).toEqual({
      lighter: '#CAFDF5',
      light: '#61F3F3',
      main: '#00B8D9',
      dark: '#006C9C',
      darker: '#003768',
      contrastText: '#FFFFFF',
    });
  });

  it('should have correct success colors', () => {
    expect(base.success).toEqual({
      lighter: '#C8FAD6',
      light: '#5BE49B',
      main: '#00A76F',
      dark: '#007867',
      darker: '#004B50',
      contrastText: '#FFFFFF',
    });
  });

  it('should have correct warning colors', () => {
    expect(base.warning).toEqual({
      lighter: '#FFF5CC',
      light: '#FFD666',
      main: '#FFAB00',
      dark: '#B76E00',
      darker: '#7A4100',
      contrastText: base.grey[800],
    });
  });

  it('should have correct error colors', () => {
    expect(base.error).toEqual({
      lighter: '#FFE9D5',
      light: '#FFAC82',
      main: '#FF5630',
      dark: '#B71D18',
      darker: '#7A0916',
      contrastText: '#FFFFFF',
    });
  });

  it('should have correct common colors', () => {
    expect(base.common).toEqual({
      black: '#000000',
      white: '#FFFFFF',
    });
  });

  it('should have correct action colors', () => {
    expect(base.action).toEqual({
      hover: alpha(base.grey[500], 0.08),
      selected: alpha(base.grey[500], 0.16),
      disabled: alpha(base.grey[500], 0.8),
      disabledBackground: alpha(base.grey[500], 0.24),
      focus: alpha(base.grey[500], 0.24),
      hoverOpacity: 0.08,
      disabledOpacity: 0.48,
    });
  });

  it('should have correct divider color', () => {
    expect(base.divider).toEqual(alpha(base.grey[500], 0.2));
  });
});
