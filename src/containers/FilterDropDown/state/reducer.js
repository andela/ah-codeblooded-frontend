import { FETCH_AUTHORS, FETCH_TAGS } from './types';

export const initialState = {
  tags: {},
  authors: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
  case FETCH_AUTHORS: {
    const { payload: { data } } = action;
    const authors = {};
    data.forEach((author) => {
      authors[author.username] = author.image;
    });

    return { ...state, authors };
  }
  case FETCH_TAGS: {
    const { payload: { data: { tags } } } = action;
    const tagSlugs = {};
    tags.forEach((tag) => {
      tagSlugs[tag.slug] = null;
    });
    return { ...state, tags: tagSlugs };
  }
  default:
    return state;
  }
};
