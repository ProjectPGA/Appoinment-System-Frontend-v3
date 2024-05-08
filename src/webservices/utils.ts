export const getJsonHeaders: (raw: boolean) => object = (raw = false) => {
  return {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    withCredentials: true,
    raw: raw,
  };
};
