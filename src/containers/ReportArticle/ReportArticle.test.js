import { mount } from 'enzyme';
import React from 'react';
import { ReportArticle } from './index';
import { fetchTypesResponse, user, successResponse } from './state/mock';
import { article } from '../../utils/testHelpers';
import { REPORT_WITHOUT_DATA } from "./state/types";

const props = {
  reports: {
    errors: "",
    hasError: false,
    hasErrors: true,
    isReporting: false,
    message: "",
    reportTypes: fetchTypesResponse.data,
    success: false,
  },
  articleReporting: {
    success: false,
    message: successResponse,
  },
  reportArticle: jest.fn(),
  fetchViolationTypes: jest.fn(),
  article: {
    ...article,
    author: user,
  },
};
const historyMock = {
  push: jest.fn(),
};


const wrapper = mount(<ReportArticle {...props} reports={props.reports} />);
const instance = wrapper.instance();


describe('The ReportArticle container', () => {
  it('should render <ReportArticle />', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('should update state on input', () => {
    wrapper.find('select').simulate('change', {
      target: { name: 'type', value: 'Harassment' },
    });
    expect(instance.state.type).toBe('Harassment');
  });

  it('should update state on input', () => {
    wrapper.find('select').simulate('change', {
      target: { name: 'description', value: 'This article has some harassment in it' },
    });
    expect(instance.state.description).toBe('This article has some harassment in it');
  });

  it('should call fetchViolationsAction', () => {
    instance.componentDidMount();
    expect(props.fetchViolationTypes.mock.calls.length).toEqual(0);
  });

  it('should call reportArticle action after onClick event', () => {
    wrapper.find('button').simulate('click', {
      target: {},
    });
    expect(props.reportArticle).toHaveBeenCalledTimes(1);
  });

  it('redirect to the homepage', () => {
    const { articleReporting } = props;
    wrapper.setProps({ ...articleReporting, success: true });
    instance.serverMessage(historyMock);
    expect(historyMock.push).toHaveBeenCalledTimes(0);
  });

  it('alerts the correct succes message', () => {
    const { articleReporting } = props;
    wrapper.setProps({ ...articleReporting, message: successResponse });
    instance.serverMessage(historyMock);
    expect(articleReporting.message).toBe(successResponse);
  });

  it('should toast when no data provided', () => {
    wrapper.setProps({ hasErrors: true, errors: REPORT_WITHOUT_DATA, success: false });
    instance.serverMessage(historyMock);
    expect(historyMock.push).toHaveBeenCalledTimes(0);
  });

  it('renders errors if any ', () => {
    wrapper.setProps({ hasErrors: true, errors: 'There was an error!', success: false });
    instance.serverMessage(historyMock);
    expect(historyMock.push).toHaveBeenCalledTimes(0);
  });
});
