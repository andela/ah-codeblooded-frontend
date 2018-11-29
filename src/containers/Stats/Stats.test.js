import React from "react";
import { mount, shallow } from "enzyme";
import { Stats } from "./index";
import { loginUser } from "../../utils/testHelpers";

describe('The Stats container', () => {
  const props = {
    error: null,
    stats: [],
    isFetching: false,
    fetchStats: jest.fn(),
    refreshStats: jest.fn(),
  };

  const stats = [
    {
      slug: "aventador-24b8q0pypck4",
      title: "Aventador",
      view_count: 17,
      comment_count: 22,
      like_count: 28,
      dislike_count: 28,
      average_rating: 34,
    },
    {
      slug: "huracan-99lbcr9akkjc",
      title: "Huracan",
      view_count: 55,
      comment_count: 91,
      like_count: 47,
      dislike_count: 25,
      average_rating: 73,
    },
  ];

  loginUser();

  let wrapper;

  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = mount(<Stats {...props} />);
  });

  it('should render without crashing', () => {
    expect(() => shallow(<Stats {...props} />)).not.toThrow();
  });

  it('should call fetchStats when mounted', () => {
    expect(props.fetchStats).toHaveBeenCalledTimes(1);
  });

  it('should display loading message when fetching', () => {
    wrapper.setProps({ isFetching: true });
    expect(wrapper.text()).toContain("Loading your stats ... Please wait.");
  });

  it('should display stats when they are available', () => {
    wrapper.setProps({ stats });
    const table = wrapper.find('table tbody tr');
    table.forEach((row, i) => {
      expect(row.text()).toContain(stats[i].title);
      expect(row.text()).toContain(stats[i].view_count);
      expect(row.text()).toContain(stats[i].average_rating);
      expect(row.text()).toContain(stats[i].comment_count);
      expect(row.text()).toContain(stats[i].like_count);
      expect(row.text()).toContain(stats[i].dislike_count);
    });
  });

  it('should display an informative message when user has no articles', () => {
    wrapper.setProps({ stats: [] });
    expect(wrapper.text()).toContain(
      "You have no articles at the moment. Write articles to gain reputation on Authors Haven.",
    );
  });

  it('should display any error message if there are no stats', () => {
    wrapper.setProps({ stats: [], error: 'Whoops!' });
    expect(wrapper.text()).toContain("Whoops!");
  });

  it('should refresh stats when refresh btn is clicked', () => {
    jest.clearAllMocks();
    wrapper.find('button').simulate('click');
    expect(props.refreshStats).toHaveBeenCalledTimes(1);
  });
});
