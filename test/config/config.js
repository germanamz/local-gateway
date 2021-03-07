
module.exports = () => {
  return {
    routes: [
      {
        path: '/a',
        host: 'lambda-a',
        method: 'GET',
      },
      {
        path: '/b',
        host: 'lambda-b',
        method: 'POST',
      },
    ],
  };
};
