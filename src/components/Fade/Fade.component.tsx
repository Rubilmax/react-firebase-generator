import React from 'react';

import MuiFade from '@material-ui/core/Fade';
import MuiSlide from '@material-ui/core/Slide';

import { useTimeout } from 'services/hooks';

export interface OwnProps {
  delay?: number;
  slide?: 'down' | 'left' | 'right' | 'up';
  timeout?: number;
  fluid?: boolean;
  children: React.ReactElement<any, any>;
}

export interface Props extends OwnProps {}

const Fade = ({ delay = 0, slide, timeout = 400, fluid = false, children }: Props) => {
  const [displayed, setDisplayed] = React.useState(false);

  useTimeout(() => setDisplayed(true), delay);

  if (slide) {
    return (
      <MuiSlide in={displayed} direction={slide} timeout={timeout} mountOnEnter>
        <div style={{ width: fluid ? '100%' : 'unset' }}>
          <MuiFade in={displayed} timeout={timeout * 1.8}>
            {children}
          </MuiFade>
        </div>
      </MuiSlide>
    );
  }

  return (
    <MuiFade in={displayed} timeout={timeout}>
      {children}
    </MuiFade>
  );
};

export default Fade;
