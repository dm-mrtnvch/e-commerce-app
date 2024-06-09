import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Button, Menu, MenuItem } from '@mui/material';
import { Dispatch, MouseEvent, SetStateAction, useState } from 'react';
import { Option } from '../../../types/common';

interface Props {
  options: Option[];
  activeSortType: Option;
  setActiveSortType: Dispatch<SetStateAction<Option>>;
}

const Sort = ({ options, activeSortType, setActiveSortType }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        variant='text'
        color='inherit'
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >{`Sort by: ${activeSortType.label}`}</Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {options.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === activeSortType.value}
            onClick={() => {
              setActiveSortType(option);
              handleClose();
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default Sort;
