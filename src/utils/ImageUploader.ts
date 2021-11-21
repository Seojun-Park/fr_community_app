import {storage} from '../firebase/firebase';

export const imageUploader = (
  type: string,
  file: any,
  category: string,
  filename: string
) => {
  const upload = storage.ref(`/${type}/${category}/${filename}`).put(file);
  upload.on(
    'state_changed',
    snapshot => {},
    err => console.log(err),
    () => {
      storage
        .ref(`/${type}/${category}/${filename}`)
        .getDownloadURL()
        .then(async url => {});
    }
  );
};
