import React from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router';
import { Helmet } from 'react-helmet';
import { onAuthStateChanged } from 'firebase/auth';

import AppRouter from 'components/AppRouter';
import GoogleOneTap from 'components/GoogleOneTap';
import LoadingScreen from 'components/LoadingScreen';

import routes from 'App.routes';
import { auth } from 'modules/firebase/auth';
import { useTimeout } from 'services/hooks';

import { mapStateToProps, mapDispatchToProps } from './AppLayout.container';

const Login = React.lazy(() => import(/* webpackChunkName: "Login" */ 'pages/Login'));

type StateProps = ReturnType<typeof mapStateToProps>;

type DispatchProps = typeof mapDispatchToProps;

export interface OwnProps {}

export interface Props extends StateProps, DispatchProps, React.PropsWithChildren<OwnProps> {}

const AppLayout = ({ loggedUserId, loginUser, logoutUser }: Props) => {
  React.useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (!!user) loginUser(user);
        else if (loggedUserId) logoutUser();
      }),
    [loggedUserId, loginUser, logoutUser],
  );

  //   React.useEffect(() => {
  //     database.ref('.info/connected').on(
  //       'value',
  //       _debounce((snapshot) => {
  //         const online = snapshot.val();
  //       }, 2000),
  //     );
  //   }, []);

  const { pathname, search, hash } = useLocation();
  const navigateHash = React.useCallback(() => {
    if (!hash) return;

    const element = document.querySelector(hash);
    if (!element) return;

    element.scrollIntoView();
  }, [hash]);
  useTimeout(navigateHash, 100);

  if (!loggedUserId) {
    return (
      <>
        <GoogleOneTap />
        <Switch>
          <Route
            path={routes.login()}
            render={(renderProps) => (
              <React.Suspense fallback={<LoadingScreen />}>
                <Login {...renderProps} />
              </React.Suspense>
            )}
          />
          <Redirect
            to={`${routes.login()}?redirectUrl=${encodeURIComponent(pathname + search + hash)}`}
          />
        </Switch>
      </>
    );
  }

  return (
    <>
      <Helmet titleTemplate="Firebase App - %s" defaultTitle="Firebase App" />
      <AppRouter />
    </>
  );
};

export default AppLayout;
