import { createMuiTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { colors } from 'services/style';

export const mobileMediaQuery = '(max-width: 450px)';
export const desktopMediaQuery = '(min-width: 850px)';
export const useIsMobile = () => useMediaQuery(mobileMediaQuery);

const createTheme = () =>
  createMuiTheme({
    palette: {
      primary: {
        main: colors.primary,
      },
      secondary: {
        main: colors.secondary,
      },
    },
    overrides: {},
  });

export default createTheme;
