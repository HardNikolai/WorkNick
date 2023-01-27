import axios from 'axios';

export const makeApiCategory = async (
  method: string,
  url: string,
  task?: Array<string>,
) => {
  if (method === 'GET') {
    const res = await axios.get(url);
    return res;
  } else if (method === 'POST') {
    const res = await axios.post(url, {
      values: [task],
    });
    return res;
  } else if (method === 'DELETE') {
    const res = await axios.post(url);
    return res;
  }
};
