import {useEffect, useState} from 'react';

export const useCheckImage = (url, image) => {
  const [img, setImg] = useState('');

  const checkUrl = async (url) => {
    try {
      const img = new Image(url);
      img.src = url;
      img.onload = () => {
        setImg(url);
      };
      img.onerror = () => {
        setImg(image);
      };
    } catch (error) {
      console.error({error});
      setImg(image);
    }
  };

  useEffect(() => {
    checkUrl(url);
  }, [url]);

  return img;
};
