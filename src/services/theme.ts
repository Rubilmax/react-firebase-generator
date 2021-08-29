import { createTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Overrides as CoreOverrides } from '@material-ui/core/styles/overrides';

import { colors } from 'services/style';

export const mobileMediaQuery = '(max-width: 450px)';
export const desktopMediaQuery = '(min-width: 850px)';
export const useIsMobile = () => useMediaQuery(mobileMediaQuery);

interface Overrides extends CoreOverrides {}

const overrides: Overrides = {};

const createAppTheme = () =>
  createTheme({
    palette: {
      primary: {
        main: colors.primary,
        light: colors.primary,
        dark: colors.primary,
        contrastText: colors.white,
      },
      secondary: {
        main: colors.secondary,
        light: colors.secondary,
        dark: colors.secondary,
        contrastText: colors.white,
      },
      //   background: {
      //     paper: colors.darkerFade,
      //     default: colors.darkBlue,
      //   },
      //   type: 'dark',
    },
    typography: {
      fontFamily: ['Montserrat', 'Roboto'].join(','),
    },
    overrides,
  });

export default createAppTheme;
