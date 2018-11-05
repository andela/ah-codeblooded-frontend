import upload from './upload';

describe('Image uploader', () => {
  it('should upload images to cloudinary', () => {
    upload({ data: { body: null } }).catch((error) => {
      expect(error).toMatchSnapshot();
    }).then((data) => {
      expect(data).toMatchSnapshot();
    });
  });
});
