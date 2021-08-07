const axios = require('axios');

const getData = async (url) => {
  let res = await axios.get(url);
  return res;
};

module.exports = getData;