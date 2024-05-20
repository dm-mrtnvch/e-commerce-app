import { describe, expect, it } from 'vitest';
import { components } from '../../../theme/components';
import { MuiButton } from '../../../theme/components/button';
import { MuiCard } from '../../../theme/components/card';
import { MuiCardContent } from '../../../theme/components/card-content';
import { MuiCardHeader } from '../../../theme/components/card-header';
import { MuiLink } from '../../../theme/components/link';
import { MuiTableBody } from '../../../theme/components/table-body';
import { MuiTableCell } from '../../../theme/components/table-cell';
import { MuiTableHead } from '../../../theme/components/table-head';

describe('components configuration', () => {
  it('should include correct component overrides', () => {
    expect(components.MuiButton).toEqual(MuiButton);
    expect(components.MuiCard).toEqual(MuiCard);
    expect(components.MuiCardContent).toEqual(MuiCardContent);
    expect(components.MuiCardHeader).toEqual(MuiCardHeader);
    expect(components.MuiLink).toEqual(MuiLink);
    expect(components.MuiTableBody).toEqual(MuiTableBody);
    expect(components.MuiTableCell).toEqual(MuiTableCell);
    expect(components.MuiTableHead).toEqual(MuiTableHead);
  });
});
