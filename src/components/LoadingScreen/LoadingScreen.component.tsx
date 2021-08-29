import React from 'react';

import { StyledLoadingContainer } from './LoadingScreen.style';

export interface OwnProps {}

export interface Props extends React.PropsWithChildren<OwnProps> {}

const LoadingScreen = (props: Props) => {
  return <StyledLoadingContainer>Loading...</StyledLoadingContainer>;
};

export default LoadingScreen;
