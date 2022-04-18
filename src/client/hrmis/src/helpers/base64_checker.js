const isImgBase64 = (str) => {
  const encodedRegex = /data:image\/[^;]+;base64[^"]+/;
  return encodedRegex.test(str);
};

export default isImgBase64;
