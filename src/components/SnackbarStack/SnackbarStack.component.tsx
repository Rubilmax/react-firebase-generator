import React from 'react';
import { SnackbarProvider } from 'notistack';
import { makeStyles } from '@material-ui/core/styles';

import Snackbar from './components/Snackbar';

import { mapStateToProps, mapDispatchToProps } from './SnackbarStack.container';

import { useIsMobile } from 'services/theme';
import { colors } from 'services/style';

type StateProps = ReturnType<typeof mapStateToProps>;

type DispatchProps = typeof mapDispatchToProps;

export interface OwnProps {}

export interface Props extends StateProps, DispatchProps, React.PropsWithChildren<OwnProps> {}

const useStyles = makeStyles({
  containerRoot: {
    '& > *': {
      margin: '1px 0',
    },
  },
  contentRoot: {
    fontSize: '0.835rem',
    lineHeight: 1.25,
  },
  message: {
    flex: 1,
    '&& > svg': {
      marginInlineEnd: '12px !important',
    },
  },
  action: {
    paddingLeft: 4,
  },
  variantSuccess: {
    backgroundColor: colors.success,
  },
  variantError: {
    backgroundColor: colors.error,
  },
  variantWarning: {
    backgroundColor: colors.warning,
  },
  variantInfo: {
    backgroundColor: colors.tertiary,
  },
  lessPadding: {
    paddingLeft: 12,
    paddingRight: 16,
  },
});

const SnackbarStack = ({ children }: Props) => {
  const notistackRef = React.createRef<SnackbarProvider>();
  const isMobile = useIsMobile();

  const classes = useStyles();

  return (
    <SnackbarProvider
      classes={classes}
      style={{ ...(!isMobile && { maxWidth: '450px' }) }}
      maxSnack={(Number(isMobile) + 1) * 2}
      ref={notistackRef}
      dense={isMobile}
    >
      {children}
      <Snackbar isMobile={isMobile} />
    </SnackbarProvider>
  );
};

export default SnackbarStack;
