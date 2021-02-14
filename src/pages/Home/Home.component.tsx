import React from 'react';
import { Helmet } from 'react-helmet';

import { StyledContainer, StyledHeader, StyledLink, StyledLogo } from './Home.style';

const Home = () => (
  <>
    <Helmet title="Homepage" />
    <StyledContainer>
      <StyledHeader>
        <StyledLogo src="./logo.svg" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <StyledLink href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </StyledLink>
      </StyledHeader>
    </StyledContainer>
  </>
);

export default Home;
