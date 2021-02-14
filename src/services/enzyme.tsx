import React from 'react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';

import mockStore from 'modules/__test__/store';

export const shallowWithStore = (Element: JSX.Element, initialState?: unknown) =>
  shallow(<Provider store={mockStore(initialState)}>{Element}</Provider>);
