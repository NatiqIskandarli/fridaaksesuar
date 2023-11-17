import Resizer from "browser-image-resizer";

export const resizeImage = (file) => new Promise((resolve, reject) => {
  const config = {
    quality: 0.75,
    maxWidth: 800,
    maxHeight: 800,
    autoRotate: true,
    debug: true,
  };

  Resizer.imageFileResizer(
    file,
    config.maxWidth,
    config.maxHeight,
    // file.type,
    config.quality,
    0,
    uri => {
      resolve(uri);
    },
    'file'
  );
});
