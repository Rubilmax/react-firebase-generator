import { makeStyles } from '@material-ui/core/styles';

export const colors = {
  primary: '#1a3668',
  darkPrimary: '#0a1529',
  secondary: '#e9ede2',
  darkBlue: '#232232',
};

export const useColors = makeStyles({
  lightGrey: {
    color: '#ddd',
  },
  grey: {
    color: '#aaa',
  },
  darkGrey: {
    color: '#666',
  },
});

export const useStyles = makeStyles({
  nowrap: {
    whiteSpace: 'nowrap',
  },
});
