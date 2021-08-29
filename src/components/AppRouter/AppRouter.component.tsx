import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import LoadingScreen from 'components/LoadingScreen';

import routes from 'App.routes';
import { auth } from 'modules/firebase/auth';
import { useQueryParams } from 'services/hooks';

import { mapStateToProps, mapDispatchToProps } from './AppRouter.container';

const Home = React.lazy(
  () => import(/* webpackChunkName: "Home", webpackPrefetch: true */ 'pages/Home'),
);

type StateProps = ReturnType<typeof mapStateToProps>;

type DispatchProps = typeof mapDispatchToProps;

export interface OwnProps {}

export interface Props extends StateProps, DispatchProps, React.PropsWithChildren<OwnProps> {}

const AppRouter = ({ loggedUser, setLoggedUserClaims, isLoggedUserAdmin }: Props) => {
  React.useEffect(
    () =>
      auth.onIdTokenChanged(async (user) => {
        const result = await user?.getIdTokenResult();
        if (!result) return;

        setLoggedUserClaims(result.claims);
      }),
    [setLoggedUserClaims],
  );

  const queryParams = useQueryParams();
  const redirectUrl = decodeURIComponent(queryParams.get('redirectUrl') ?? routes.home());

  const isLoading = !loggedUser?.id;
  if (isLoading) return <LoadingScreen />;

  return (
    <Switch>
      {/* <Route
        path={routes.route()}
        render={(props) => (
          <React.Suspense fallback={<LoadingScreen />}>
            <Component />
          </React.Suspense>
        )}
      /> */}
      <Route
        exact
        path={routes.home()}
        render={(props) => (
          <React.Suspense fallback={<LoadingScreen />}>
            <Home {...props} />
          </React.Suspense>
        )}
      />
      <Redirect to={redirectUrl} />
    </Switch>
  );
};

export default AppRouter;
