import axios from 'axios';

export const requestCategoryGet = async (token: string) => {
  try {
    const url =
      'https://sheets.googleapis.com/v4/spreadsheets/1p3L7CgVUwJxE9gePiJ0xDSXIkw5y6bRyCEOpTqUNHc8/values/Categories?access_token=' +
      token;
    const res = await axios.get(url);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const requestCategoryPost = async (
  token: string,
  nameCategory: string,
  userEmail: string,
) => {
  try {
    const url =
      'https://sheets.googleapis.com/v4/spreadsheets/1p3L7CgVUwJxE9gePiJ0xDSXIkw5y6bRyCEOpTqUNHc8/values/Categories:append?access_token=' +
      token +
      '&valueInputOption=RAW';

    const res = await axios.post(url, {
      values: [[nameCategory, userEmail]],
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const requestCategoryDelete = async (token: string, id: string) => {
  try {
    const url =
      'https://sheets.googleapis.com/v4/spreadsheets/1p3L7CgVUwJxE9gePiJ0xDSXIkw5y6bRyCEOpTqUNHc8/values/Categories!A' +
      id +
      ':B' +
      id +
      ':clear?access_token=' +
      token;
    const res = await axios.post(url);
    return res;
  } catch (error) {
    console.log(error);
  }
};
