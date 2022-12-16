import {useState} from 'react';
import {useDropzone} from 'react-dropzone';

export default function useUploadImg() {
  const [files, setFileData] = useState([]);
  const [avatarBase64, setAvatarBase64] = useState(null);

  function setBase64File(base64) {
    setAvatarBase64(base64);
  }

  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      let file = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      let reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = () => {
        setBase64File(reader.result);
      };
      setFileData(file);
    },
  });

  const image_fa = () => {
    let image = null;
    try {
      files.map((file, index) => {
        return (image = file.preview);
      });
    } catch (error) {
      console.error({error});
    }
    return image;
  };

  const imagePreview = image_fa();

  return {getRootProps, getInputProps, imagePreview, avatarBase64};
}
