import React, { useEffect, useState } from 'react';
import { InputAdornment, TextField } from '@material-ui/core';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useHistory } from 'react-router';
import { useQuery } from '../../../../hooks/SearchQuery.hook';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchTextInput: {
      '& > div': {
        borderRadius: '26px',
        border: 'none',
        backgroundColor: '#2f504a12',
      },
      '& >  .Mui-focused': {
        backgroundColor: '#fff',
      },
      '& input': {
        paddingTop: '12px',
        paddingBottom: '12px',
      },
    },
    MainPage: {
      maxWidth: '90%',
      margin: '10px auto',
    },
  }),
);

interface SearchInputProps {
  main?: boolean;
}

export const SearchInput = ({ main }: SearchInputProps) => {
  const classes = useStyles();
  const [searchQuery, setSearchQuery] = useState('');
  const history = useHistory();
  const urlQuery = useQuery();
  const query = urlQuery.get('q');

  useEffect(() => {
    if (query) {
      setSearchQuery(query);
    } else {
      setSearchQuery('');
    }
  }, [query]);

  const inputHandler = (e: any) => {
    setSearchQuery(e.target.value);
  };
  const searchSubmitHandler = (e: any) => {
    e.preventDefault();
    if (searchQuery) history.push(`/home/search?q=${searchQuery.replaceAll('#', '%23')}`);
  };

  return (
    <form onSubmit={searchSubmitHandler} className={main ? classes.MainPage : ''}>
      <TextField
        className={classes.searchTextInput}
        id="input-with-icon-textfield"
        placeholder="Поиск"
        variant="outlined"
        type="search"
        fullWidth
        value={searchQuery}
        onChange={inputHandler}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchRoundedIcon color="primary" />
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
};
