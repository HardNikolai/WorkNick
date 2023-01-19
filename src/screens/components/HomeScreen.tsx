import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useEffect, useMemo } from "react";
import DataTable, { IDataUser } from "../../mobx/DataTable";
import User from "../../mobx/User";
import { observer } from "mobx-react";
import Task from "../../components/Task";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import axios from "axios";
import Categories from "../../mobx/Categories";
import StoreTask from "../../mobx/StoreTask";
import StoreDate from "../../mobx/StoreDate";
import StoreState from "../../mobx/StoreState";
import BlockErrorInput from "../../components/BlockErrorInput";
import InputNewTask from "../../components/InputNewTask";
import ChangeTask from "../../components/ChangeTask";
import Calendar from "../../components/Calendar";
import BlockButtonsHomeOn from "../../components/BlockButtonsHomeOn";
import Balance from "../../mobx/Balance";
import Chart from "../../components/Chart";
import BlockFilter from "../../components/BlockFilter";

export const urlTransaction = "https://sheets.googleapis.com/v4/spreadsheets/1p3L7CgVUwJxE9gePiJ0xDSXIkw5y6bRyCEOpTqUNHc8/values/Transactions?access_token=";
export const urlCategory = "https://sheets.googleapis.com/v4/spreadsheets/1p3L7CgVUwJxE9gePiJ0xDSXIkw5y6bRyCEOpTqUNHc8/values/Categories?access_token=";

export const getToken = async () => {
  const tokens = await GoogleSignin.getTokens();
  User.setToken(tokens.accessToken);
  return tokens;
};


export const getData = async () => {
  const tokens = await getToken();

  if (tokens.accessToken) {
    const newUrlCategory = `${urlCategory}${tokens.accessToken}`;
    const newUrlTransaction = `${urlTransaction}${tokens.accessToken}`;
    const resultRequestTransaction = await axios.get(newUrlTransaction);
    const resultRequestCategory = await axios.get(newUrlCategory);

    if (resultRequestTransaction.status === 200) {
      const arrayDataResponse = resultRequestTransaction.data.values;
      const newArrayData: Array<IDataUser> = [];

      for (let i = 1; i < arrayDataResponse.length; i++) {
        const task = {
          id: "",
          user: "",
          nameCategories: "",
          categories: false,
          count: "",
          textAbout: "",
          date: "",
          dateTime: ""
        };

        task.id = arrayDataResponse[i][0];
        task.user = arrayDataResponse[i][1];
        task.nameCategories = arrayDataResponse[i][2];
        task.categories = arrayDataResponse[i][3];
        task.count = arrayDataResponse[i][4];
        task.textAbout = arrayDataResponse[i][5];
        task.date = arrayDataResponse[i][6];
        task.dateTime = arrayDataResponse[i][7];

        newArrayData.push(task);
      };

      DataTable.setData(newArrayData);

      const arrayDataUser = [];

      for (let i = 0; i < newArrayData.length; i++) {
        if (User.nameUser === newArrayData[i].user) {
          arrayDataUser.push(newArrayData[i]);
        };
      };
      StoreDate.setDateSynchronization(new Date());
      DataTable.setDataUser(arrayDataUser);

      const arrayDataUserMonth = [];

      for (let i = 0; i < arrayDataUser.length; i++) {
        if (Number(arrayDataUser[i].date.slice(arrayDataUser[i].date.indexOf('.') + 1, 4)) === StoreDate.indexToDayMonth) {
          arrayDataUserMonth.push(arrayDataUser[i]);
        };
      };

      DataTable.setDataMonth(arrayDataUserMonth);
      recalc(arrayDataUserMonth);
      forecastingBalance(arrayDataUserMonth);

      const countDayInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
      const arrayDays: Array<string> = [];

      for (let i = 0; i < countDayInMonth; i++) {
        if (i + 1 <= new Date().getDate()) {
          arrayDays.push(String(i + 1));
        };
      };

      DataTable.setDataNumberInMonth(arrayDays);

      const arrayCount: Array<number> = [];

      for (let n = 0; n < countDayInMonth; n++) {
        if (n + 1 <= new Date().getDate()) {
          arrayCount.push(0);
        };
      };

      for (let n = 0; n < arrayDataUser.length; n++) {
        if (arrayDataUser[n].categories === "TRUE") {
          arrayCount[Number(arrayDataUser[n].date.slice(0, arrayDataUser[n].date.indexOf('.'))) - 1] = arrayCount[Number(arrayDataUser[n].date.slice(0, arrayDataUser[n].date.indexOf('.'))) - 1] + Number(arrayDataUser[n].count);
        };
      };

      DataTable.setDataExpenseNumbersInMonth(arrayCount);

      if (resultRequestCategory.status === 200) {
        if (resultRequestCategory.data.values != undefined) {
          const arrayCategories = [];
          for (let i = 1; i < resultRequestCategory.data.values.length; i++) {
            if (resultRequestCategory.data.values[i][1] === User.nameUser) {
              const category = {
                id: 0,
                name: ""
              };
              category.id = i;
              category.name = resultRequestCategory.data.values[i][0];
              arrayCategories.push(category);
            };
          };
          StoreDate.setDateSynchronization(new Date());
          Categories.setCategory(arrayCategories);
        };
      };
    };
  };
};

export const recalc = (data: Array<IDataUser>) => {
  let res: number = 0;

  for (let i = 0; i < data.length; i++) {
    if (data[i].categories === "TRUE") {
      res -= Number(data[i].count);
    } else if (data[i].categories === "FALSE") {
      res += Number(data[i].count);
    };
  };
  Balance.setTotal(res);
};

export const forecastingBalance = (data: Array<IDataUser>) => {
  let sumAllExpenses = 0;
  let firstDay: string | number = "";
  let lastDay: string | number = "";
  let expenseInDay = 0;
  let futureDays = 0;
  let futureExpense = 0;
  let res = 0;

  const countDayInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();

  if (data.length === 0) {
    Balance.setForecast(0);
    return;
  };

  for (let i = 0; i < data.length; i++) {
    if (i === 0) {
      firstDay = Number(data[i].date.slice(0, data[i].date.indexOf('.')));
    };

    if (i + 1 === data.length) {
      lastDay = Number(data[i].date.slice(0, data[i].date.indexOf('.')));
    };

    if (data[i].categories === "TRUE") {
      sumAllExpenses += Number(data[i].count);
    };
  };

  if (typeof (lastDay) === "number" && typeof (firstDay) === "number") {
    expenseInDay = sumAllExpenses / lastDay;
    futureDays = countDayInMonth - lastDay;
    futureExpense = futureDays * expenseInDay;
    res = Balance.total - futureExpense;
    Balance.setForecast(res);
  };

};

const HomeScreen = observer(({ navigation }: any) => {
  const dateToday = new Date();
  const monthToday = dateToday.getMonth();
  const yearToday = dateToday.getFullYear();

  useEffect(() => {
    getData();
    StoreDate.setIndexMonth(monthToday);
    StoreDate.setNumYear(yearToday);
    StoreDate.setToDayMonth(monthToday);
  }, []);

  useMemo(() => {
    getData();
  }, [StoreState.stateListCategory, StoreState.stateChangeCalendar, StoreDate.indexMonth, Balance.forecast, StoreTask.Task]);

  return (
    <View style={styles.container}>
      <Calendar />
      <Chart />
      <BlockErrorInput />
      <InputNewTask />
      <ChangeTask />
      <BlockFilter />
      <FlatList
        data={DataTable.AllDataUser}
        renderItem={
          ({ item }) => (
            <TouchableOpacity onPress={() => {
              navigation.navigate("FilterTask");
              StoreTask.setTask(item);
            }}>
              <Task task={item}></Task>
            </TouchableOpacity>
          )
        }
        keyExtractor={item => item.id}
        style={{ marginTop: 35, width: "90%" }}
      />
      <BlockButtonsHomeOn />
    </View >
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#2A3C44"
  },
  blockButton: {
    borderWidth: 1,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    flexDirection: "row",
    backgroundColor: "#30444E",
    paddingHorizontal: 15,
    paddingVertical: 15,
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default HomeScreen;