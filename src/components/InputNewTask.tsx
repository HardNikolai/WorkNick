import { observer } from "mobx-react";
import { FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import StoreState from "../mobx/StoreState";
import ArrowUpOff from "../../assets/ArrowUpOff.svg";
import ArrowDownOff from "../../assets/ArrowDownOff.svg";
import ArrowUp from "../../assets/ArrowUp.svg";
import ArrowDown from "../../assets/ArrowDown.svg";
import Categories from "../mobx/Categories";
import { useState } from "react";
import DataTable, { IDataUser } from "../mobx/DataTable";
import User from "../mobx/User";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import axios from "axios";
import UserOff from "../../assets/UserOff.svg";
import HomeOn from "../../assets/HomeOn.svg";
import Off from "../../assets/Off.svg";
import StoreDate from "../mobx/StoreDate";
import { forecastingBalance, recalc } from "../screens/components/HomeScreen";

const urlTransaction = "https://sheets.googleapis.com/v4/spreadsheets/1p3L7CgVUwJxE9gePiJ0xDSXIkw5y6bRyCEOpTqUNHc8/values/Transactions?access_token=";
const urlPostTransaction = "https://sheets.googleapis.com/v4/spreadsheets/1p3L7CgVUwJxE9gePiJ0xDSXIkw5y6bRyCEOpTqUNHc8/values/Transactions:append?access_token=";

const InputNewTask = observer(() => {
  const dateToday = new Date();
  const dayToday = dateToday.getDate();
  const monthToday = dateToday.getMonth();
  const yearToday = dateToday.getFullYear();

  const [textAmount, setTextAmount] = useState("");
  const [textAbout, setTextAbout] = useState("");

  const requestPost = async (id: number, user: string, nameCategory: string, category: boolean, count: string, textAbout: string, day: number, month: number, year: number) => {
    const tokens = await GoogleSignin.getTokens();
    const date = new Date();
    const hour = date.getHours();
    const minutes = date.getMinutes();

    let monthTask = month + 1;
    let newMonthTask = "";

    if (monthTask < 10) {
      newMonthTask = `0${monthTask}`;
    } else {
      newMonthTask = `${monthTask}`;
    };

    let newMinutes = "";
    if (minutes < 10) {
      newMinutes = `0${minutes}`;
    } else {
      newMinutes = `${minutes}`;
    };

    const dateTask = `${day}.${newMonthTask}.${year}`;
    const timeTask = `${hour}:${newMinutes}`;

    await axios.post(`${urlPostTransaction}${tokens.accessToken}&valueInputOption=RAW`, { "values": [[id, user, nameCategory, category, count, textAbout, dateTask, timeTask]] });

    const newUrlTransaction = `${urlTransaction}${tokens.accessToken}`;
    const resultTransaction = await axios.get(newUrlTransaction);

    if (resultTransaction.status === 200) {
      const arrayDataResponse = resultTransaction.data.values;
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
      const resUserData = [];

      for (let i = 0; i < newArrayData.length; i++) {
        if (User.nameUser === newArrayData[i].user) {
          resUserData.push(newArrayData[i]);
        };
      };
      StoreDate.setDateSynchronization(new Date());
      DataTable.setDataUser(resUserData);

      const arrayDataUserMonth = [];

      for (let i = 0; i < resUserData.length; i++) {
        if (Number(resUserData[i].date.slice(resUserData[i].date.indexOf('.') + 1, 4)) === StoreDate.indexToDayMonth) {
          arrayDataUserMonth.push(resUserData[i]);
        };
      };

      DataTable.setDataMonth(arrayDataUserMonth);
      recalc(arrayDataUserMonth);
      forecastingBalance(arrayDataUserMonth);
    };
  };

  const addNewTask = () => {
    if (Categories.textCategory === "Выберете категорию" || textAmount === "" || textAbout === "") {
      StoreState.setStateError();

      setTimeout(() => {
        StoreState.setStateError();
      }, 2000);

      return;
    };

    if (DataTable.AllData.length != 0) {
      const newId: number = Number(DataTable.AllData[DataTable.AllData.length - 1].id) + 1;
      requestPost(newId, User.nameUser, Categories.textCategory, StoreState.stateCategoryImageExpense, textAmount, textAbout, dayToday, monthToday, yearToday);
    } else {
      const newId: number = 1;
      requestPost(newId, User.nameUser, Categories.textCategory, StoreState.stateCategoryImageExpense, textAmount, textAbout, dayToday, monthToday, yearToday);
    };
  };

  return (
    <>
      {
        StoreState.stateAddNewTask ?
          <Modal transparent={true}>
            <View style={{ justifyContent: "flex-end", flex: 1 }}>
              <View style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
                <View style={{ flexDirection: "column", backgroundColor: "#475E69", width: "90%", borderRadius: 20 }}>
                  <View style={{ flexDirection: "row", paddingTop: 20, paddingHorizontal: 20, paddingBottom: 40, justifyContent: "space-between" }}>
                    {
                      StoreState.stateCategoryImageExpense ?
                        <TouchableOpacity onPress={() => {
                          StoreState.setStateCategoryImageExpense();
                          StoreState.setStateCategoryImageAddition();
                        }}>
                          <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <ArrowDown />
                            <Text style={{ color: "white", paddingLeft: 10 }}>Расход</Text>
                          </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={() => {
                          StoreState.setStateCategoryImageExpense();
                          StoreState.setStateCategoryImageAddition();
                        }}>
                          <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <ArrowDownOff />
                            <Text style={{ color: "white", paddingLeft: 10 }}>Расход</Text>
                          </View>
                        </TouchableOpacity>
                    }
                    {
                      StoreState.stateCategoryImageAddition ?
                        <TouchableOpacity onPress={() => {
                          StoreState.setStateCategoryImageExpense();
                          StoreState.setStateCategoryImageAddition();
                        }}>
                          <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <ArrowUp />
                            <Text style={{ color: "white", paddingLeft: 10 }}>Приход</Text>
                          </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={() => {
                          StoreState.setStateCategoryImageExpense();
                          StoreState.setStateCategoryImageAddition();
                        }}>
                          <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <ArrowUpOff />
                            <Text style={{ color: "white", paddingLeft: 10 }}>Приход</Text>
                          </View>
                        </TouchableOpacity>
                    }
                  </View>
                  <TouchableOpacity onPress={() => StoreState.setStateListCategory()}>
                    <View style={{ alignItems: "center" }}>
                      <View style={{ backgroundColor: "#333333", width: "50%" }}>
                        <Text style={{ paddingLeft: 10, fontSize: 18, color: "white" }}>{
                          Categories.textCategory
                        }</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  {
                    StoreState.stateListCategory ?
                      <View style={{ alignItems: "center" }}>
                        <FlatList
                          data={Categories.dataListCategory}
                          renderItem={
                            ({ item }) => (
                              <TouchableOpacity onPress={() => {
                                Categories.setTextCategory(item.name);
                                StoreState.setStateListCategory();
                              }}>
                                <Text style={{ margin: 7, fontSize: 18, backgroundColor: "#333333", color: "white" }}>{item.name}</Text>
                              </TouchableOpacity>
                            )
                          }
                          keyExtractor={item => `${item.id}`}
                          style={{ backgroundColor: "#333333", marginBottom: 10, width: "50%" }}
                        />
                      </View>
                      :
                      <></>
                  }
                  <View style={{ backgroundColor: "#B8C2C0", height: 3 }} />
                  <View style={{ alignItems: "center", paddingTop: 10 }}>
                    <TextInput keyboardType="numeric" onChangeText={(e) => setTextAmount(e)} placeholder="Сумма" placeholderTextColor={"#96A7AF"} style={{ width: "85%", backgroundColor: "#30444E", borderRadius: 10, paddingLeft: 10, color: "white" }} />
                  </View>
                  <View style={{ alignItems: "center", paddingTop: 10, paddingBottom: 40 }}>
                    <TextInput onChangeText={(e) => setTextAbout(e)} placeholder="Описание" placeholderTextColor={"#96A7AF"} style={{ width: "85%", backgroundColor: "#30444E", borderRadius: 10, paddingLeft: 10, color: "white" }} />
                  </View>
                  <TouchableOpacity onPress={() => {
                    addNewTask();
                    StoreState.setStateAddNewTask();
                    setTextAbout("");
                    setTextAmount("");
                    Categories.resetTextCategory();
                  }}>
                    <View style={{ alignItems: "center", marginBottom: 15 }}>
                      <View style={{ backgroundColor: "#3DD598", width: "80%", borderRadius: 10, alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ fontSize: 20, fontStyle: "italic", paddingVertical: 10 }}>Сохранить</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.blockButton}>
                <HomeOn
                  width={19}
                  height={19}
                />
                <TouchableOpacity onPress={() => StoreState.setStateAddNewTask()}>
                  <View style={{ marginLeft: 45, marginRight: 45 }}>
                    <Off />
                  </View>
                </TouchableOpacity>
                <UserOff
                  width={19}
                  height={19}
                />
              </View>
            </View>
          </Modal>
          :
          <></>
      }
    </>
  );
});

const styles = StyleSheet.create({
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

export default InputNewTask;