import axios from 'axios';

const getData = async (url) => {
  let res = await axios.get(url);
  return res;
};

export default getData;