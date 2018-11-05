import readTime from './readTime';

describe('Article readtime', () => {
  it('should print seconds', () => {
    expect(readTime(40)).toEqual('40 Seconds read');
  });

  it('should print one second', () => {
    expect(readTime(1)).toEqual('1 Second read');
  });

  it('should print one minute', () => {
    expect(readTime(60)).toEqual('1 Minute read');
  });

  it('should print minutes', () => {
    expect(readTime(120)).toEqual('2 Minutes read');
  });
});
