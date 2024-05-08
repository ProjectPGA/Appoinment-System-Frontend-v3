export const getJsonHeaders: (throwGlobalErrors: boolean) => object = (
  throwGlobalErrors = false
) => {
  return {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    withCredentials: true,
    throwGlobalErrors: throwGlobalErrors,
  };
};
