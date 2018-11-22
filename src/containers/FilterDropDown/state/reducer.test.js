import articleFilterReducer, { initialState } from './reducer';
import { FETCH_AUTHORS, FETCH_TAGS } from './types';

const filterAuthors = {
  type: FETCH_AUTHORS,
  payload: {
    data: [{
      username: 'bevkololi',
      bio: 'My bio',
      image: 'My image',
    }],
  },
};

const filterTags = {
  type: FETCH_TAGS,
  payload: {
    data: {
      tags: [{
        tag: 'tag',
      }],
    },
  },
};

let authors;
let tagSlugs;

describe('The filter articles reducer', () => {
  beforeEach(() => {
    const { payload: { data } } = filterAuthors;
    authors = {};
    data.forEach((author) => {
      authors[author.username] = author.image;
    });

    const { payload: { data: { tags } } } = filterTags;
    tagSlugs = {};
    tags.forEach((tag) => {
      tagSlugs[tag.slug] = null;
    });
  });

  it('should return the initial state', () => {
    expect(articleFilterReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_AUTHORS', () => {
    expect(articleFilterReducer(initialState, filterAuthors)).toEqual({
      ...initialState,
      authors,
    });
  });

  it('should handle FETCH_TAGS', () => {
    expect(articleFilterReducer(initialState, filterTags)).toEqual({
      ...initialState,
      tags: tagSlugs,
    });
  });
});
