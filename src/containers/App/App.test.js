import React from 'react';
import { render, mount } from 'enzyme';
import { Provider } from 'react-redux';
import App from '.';
import configureStore from '../../store';

const app = <Provider store={configureStore()}><App /></Provider>;

describe('The Application container', () => {
  it('should render without crashing', () => {
    expect(mount(app).contains(<h1>Authors Haven</h1>)).toBe(true);
  });

  it('should render to static HTML', () => {
    expect(render(app).find('h1').text()).toEqual('Authors Haven');
  });
});
