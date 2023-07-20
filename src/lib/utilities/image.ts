import Resizer from "react-image-file-resizer";

export const resizeFile = (file: Blob) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      150,
      150,
      "WEBP",
      90,
      0,
      (uri) => {
        resolve(uri);
      },
      "blob"
    );
  });