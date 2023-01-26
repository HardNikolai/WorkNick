import axios from 'axios';
import { ITask } from 'src/screens/interfaces/interfaces';

export const requestTaskGet = async (token: string | Promise<string> ) => {
  try {
    const url =
      'https://sheets.googleapis.com/v4/spreadsheets/1p3L7CgVUwJxE9gePiJ0xDSXIkw5y6bRyCEOpTqUNHc8/values/Transactions?access_token=' +
      token;
    const res = await axios.get(url);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const requestTaskPut = async (token:string, task:ITask) => {
  try {
    const {
      id,
      user,
      nameCategories,
      categories,
      count,
      textAbout,
      date,
      dateTime,
    } = task;

    const url =
      'https://sheets.googleapis.com/v4/spreadsheets/1p3L7CgVUwJxE9gePiJ0xDSXIkw5y6bRyCEOpTqUNHc8/values/Transactions!A' +
      (Number(id)) +
      ':H' +
      (Number(id)) +
      '?access_token=' +
      token +
      '&valueInputOption=RAW';
    const res = await axios.put(url, {
      values: [
        [
          id,
          user,
          nameCategories,
          categories,
          count,
          textAbout,
          date,
          dateTime,
        ],
      ],
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const requestTaskPost = async (
  token: string,
  task: Array<string | number | boolean>,
) => {
  try {
    const url =
      'https://sheets.googleapis.com/v4/spreadsheets/1p3L7CgVUwJxE9gePiJ0xDSXIkw5y6bRyCEOpTqUNHc8/values/Transactions:append?access_token=' +
      token +
      '&valueInputOption=RAW';
    const res = await axios.post(url, {
      values: [task],
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const requestTaskDelete = async (token: string, id: number) => {
  try {
    const url =
      'https://sheets.googleapis.com/v4/spreadsheets/1p3L7CgVUwJxE9gePiJ0xDSXIkw5y6bRyCEOpTqUNHc8/values/Transactions!A' +
      id +
      ':H' +
      id +
      ':clear?access_token=' +
      token;
    const res = await axios.post(url);
    return res;
  } catch (error) {
    console.log(error);
  }
};
