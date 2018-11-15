import React from 'react';
import { shallow } from 'enzyme';
import { ForgotPasswordPage } from '.';

describe('The ForgotPasswordPage', () => {
  it('should render without crashing', () => {
    expect(() => shallow(<ForgotPasswordPage />)).not.toThrow();
  });
});
