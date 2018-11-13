const upload = data => new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://api.cloudinary.com/v1_1/duynigiok/image/upload');

  xhr.onload = () => {
    if (xhr.status === 200) {
      resolve(JSON.parse(xhr.response));
    } else {
      reject(xhr.statusText);
    }
  };

  xhr.onerror = () => reject(xhr.statusText);
  xhr.upload.addEventListener('progress', data.progress);

  const formData = new FormData();
  formData.append('file', data.body);
  formData.append('upload_preset', 'xiypk2vp');

  xhr.send(formData);
});

export default upload;
