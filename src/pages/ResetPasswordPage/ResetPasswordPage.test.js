import React from 'react';
import { shallow } from 'enzyme';
import { ResetPasswordPage } from '.';

describe('The ResetPasswordPage', () => {
  it('should render without crashing', () => {
    expect(() => shallow(<ResetPasswordPage />)).not.toThrow();
  });
});
