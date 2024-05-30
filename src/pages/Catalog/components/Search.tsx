import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
}

const Search = ({ searchText, setSearchText }: Props) => {
  return (
    <TextField
      size='small'
      placeholder='Search...'
      value={searchText}
      onChange={(e) => {
        setSearchText(e.target.value);
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default Search;
