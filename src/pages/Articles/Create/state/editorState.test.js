import { createFromText } from './editorState';

describe('Editor State ', () => {
  it('should return an editor state with text', () => {
    expect(createFromText('hello world')).toEqual(
      {
        blocks: [{
          key: '8v5h3', text: 'hello world', type: 'unstyled', depth: 0, inlineStyleRanges: [], entityRanges: [], data: {},
        }],
        entityMap: {},
      },
    );
  });
});
