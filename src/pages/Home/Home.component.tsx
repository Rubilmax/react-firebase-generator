import React from 'react';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { mapStateToProps, mapDispatchToProps } from './Home.container';

type StateProps = ReturnType<typeof mapStateToProps>;

type DispatchProps = typeof mapDispatchToProps;

export interface OwnProps {}

export interface Props extends StateProps, DispatchProps, OwnProps {}

const Home = ({ loggedUserEmail, logoutUser }: Props) => {
  return (
    <>
      <Typography>Bienvenue {loggedUserEmail} !</Typography>
      <Button onClick={logoutUser}>Se déconnecter</Button>
    </>
  );
};

export default Home;
