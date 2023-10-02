export const performTimeConsumingTask = async () =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve('result');
    }, 2000),
  );

export const getHeaderWithAccessToken = (accessToken: string) => ({
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});
