import React from 'react';
import { shallow } from 'enzyme';

import Home from '.';
import { StyledLink } from './Home.style';

describe('Home component', () => {
  const props = {};
  let wrapper = shallow(<div />);

  beforeEach(() => {
    wrapper = shallow(<Home {...props} />);
  });

  it('should exist', () => {
    expect(wrapper.exists()).toEqual(true);
  });

  it('should render "Learn React" link', () => {
    const link = wrapper.find(StyledLink);

    expect(link.length).toEqual(1);
    expect(link.text()).toEqual('Learn React');
  });
});
