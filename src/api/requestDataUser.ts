import axios from 'axios';

export const makeApiTask = async (
  method: string,
  url: string,
  arrTask?: Array<string | number | boolean> | undefined,
) => {
  try {
    if (method === 'GET') {
      const res = await axios.get(url);
      return res;
    } else if (method === 'POST') {
      const res = await axios.post(url, {
        values: [arrTask],
      });
      return res;
    } else if (method === 'PUT') {
      const res = await axios.put(url, {
        values: [arrTask],
      });
      return res;
    } else if (method === 'DELETE') {
      const res = await axios.post(url);
      return res;
    } else {
      console.log('error method');
    }
  } catch (error) {
    console.log(error);
  }
};
