import React from 'react';
import { useSnackbar } from 'notistack';

import { mapStateToProps, mapDispatchToProps } from './Snackbar.container';

type StateProps = ReturnType<typeof mapStateToProps>;

type DispatchProps = typeof mapDispatchToProps;

export interface OwnProps {
  isMobile: boolean;
}

export interface Props extends StateProps, DispatchProps, React.PropsWithChildren<OwnProps> {}

const Snackbar = ({ resetSnackbar, isMobile, snackbar }: Props) => {
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    const { message, variant, duration } = snackbar;

    if (!!message) {
      enqueueSnackbar(message, {
        variant,
        persist: duration <= 0,
        autoHideDuration: duration,
        anchorOrigin: {
          horizontal: isMobile ? 'center' : 'left',
          vertical: 'bottom',
        },
      });
      resetSnackbar();
    }
  }, [enqueueSnackbar, resetSnackbar, isMobile, snackbar]);

  return <></>;
};

export default Snackbar;
