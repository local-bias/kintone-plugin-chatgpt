export const getBase64EncodedImage = async (file: File): Promise<string> => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  return new Promise((resolve) => {
    reader.onload = () => {
      const base64EncodedImage = reader.result as string;
      process.env.NODE_ENV === 'development' &&
        console.log('base64EncodedImage', base64EncodedImage);
      resolve(base64EncodedImage);
    };
  });
};
