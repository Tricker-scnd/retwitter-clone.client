import React from 'react';
import { InputAdornment, TextField } from '@material-ui/core';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

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
  }),
);

export const SearchInput = () => {
  const classes = useStyles();

  return (
    <TextField
      className={classes.searchTextInput}
      id="input-with-icon-textfield"
      placeholder="Поиск"
      variant="outlined"
      type="search"
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchRoundedIcon color="primary" />
          </InputAdornment>
        ),
      }}
    />
  );
};
