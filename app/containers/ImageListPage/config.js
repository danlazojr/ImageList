export const  CONFIG = {
  name: 'userData',
  requests: {
    getBooks: () => fetch('get', 'https://bitbucket.org/adrenalingit/fed-coding-challenge-react/raw/7a58dc67359000cfad5541b726b84f73fd0b392e/feed/data.json'),
  },
};
