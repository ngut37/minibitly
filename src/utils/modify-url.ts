export const modifyUrl = (url: string): string => {
  if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
  } else {
      return 'http://' + url;
  }
};