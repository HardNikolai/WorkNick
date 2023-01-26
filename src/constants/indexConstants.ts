import {Dimensions} from 'react-native';

export const urlTransaction =
  'https://sheets.googleapis.com/v4/spreadsheets/1p3L7CgVUwJxE9gePiJ0xDSXIkw5y6bRyCEOpTqUNHc8/values/Transactions?access_token=';
export const urlCategory =
  'https://sheets.googleapis.com/v4/spreadsheets/1p3L7CgVUwJxE9gePiJ0xDSXIkw5y6bRyCEOpTqUNHc8/values/Categories?access_token=';

export const HEIGHT = (Dimensions.get('window').height - 200) / 3;

export const calendar = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];