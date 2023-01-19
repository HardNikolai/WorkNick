import { observer } from "mobx-react";
import { FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import StoreState from "../mobx/StoreState";
import StoreTask from "../mobx/StoreTask";
import ArrowDown from "../../assets/ArrowDown.svg";
import ArrowDownOff from "../../assets/ArrowDownOff.svg";
import ArrowUp from "../../assets/ArrowUp.svg";
import ArrowUpOff from "../../assets/ArrowUpOff.svg";
import Categories from "../mobx/Categories";
import axios from "axios";
import User from "../mobx/User";
import HomeOn from "../../assets/HomeOn.svg";
import Off from "../../assets/Off.svg";
import UserOff from "../../assets/UserOff.svg";
import { getData } from "../screens/components/HomeScreen";

const urlChangeTransaction = "https://sheets.googleapis.com/v4/spreadsheets/1p3L7CgVUwJxE9gePiJ0xDSXIkw5y6bRyCEOpTqUNHc8/values/Transactions!A";

const ChangeTask = observer(() => {

  const change = async () => {
    const { id, user, nameCategories, categories, count, textAbout, date, dateTime } = StoreTask.Task;
    await axios.put(`${urlChangeTransaction}${Number(StoreTask.Task.id) + 1}:H${Number(StoreTask.Task.id) + 1}?access_token=${User.token}&valueInputOption=RAW`, { "values": [[id, user, nameCategories, categories, count, textAbout, date, dateTime]] });
    getData();
  };

  return (
    <>
      {
        StoreState.stateChangeTask ?
          <Modal transparent={true}>
            <View style={{ justifyContent: "flex-end", flex: 1 }}>
              <View style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
                <View style={{ flexDirection: "column", backgroundColor: "#475E69", width: "90%", borderRadius: 20 }}>
                  <View style={{ flexDirection: "row", paddingTop: 20, paddingHorizontal: 20, paddingBottom: 40, justifyContent: "space-between" }}>
                    {
                      StoreTask.Task.categories === "TRUE" ?
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                          <ArrowDown />
                          <Text style={{ color: "white", paddingLeft: 10 }}>Расход</Text>
                        </View>
                        :
                        <TouchableOpacity onPress={() => {
                          StoreTask.setCategories("TRUE");
                        }}>
                          <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <ArrowDownOff />
                            <Text style={{ color: "white", paddingLeft: 10 }}>Расход</Text>
                          </View>
                        </TouchableOpacity>
                    }
                    {
                      StoreTask.Task.categories === "FALSE" ?
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                          <ArrowUp />
                          <Text style={{ color: "white", paddingLeft: 10 }}>Приход</Text>
                        </View>
                        :
                        <TouchableOpacity onPress={() => {
                          StoreTask.setCategories("FALSE");
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
                      <View style={{ backgroundColor: "gray", width: "50%" }}>
                        <Text style={{ paddingLeft: 10, fontSize: 18, color: "white" }}>{
                          StoreTask.Task.nameCategories
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
                                StoreTask.setNameCategory(item.name);
                                StoreState.setStateListCategory();
                              }}>
                                <Text style={{ margin: 7, fontSize: 18 }}>{item.name}</Text>
                              </TouchableOpacity>
                            )
                          }
                          keyExtractor={item => `${item.id}`}
                          style={{ backgroundColor: "#B8C2C0", marginBottom: 10, width: "50%" }}
                        />
                      </View>
                      :
                      <></>
                  }
                  <View style={{ backgroundColor: "#B8C2C0", height: 3 }} />
                  <View style={{ alignItems: "center", paddingTop: 10 }}>
                    <TextInput
                      onChangeText={(e) => StoreTask.setTextAmount(e)}
                      value={StoreTask.Task.count}
                      keyboardType="numeric"
                      placeholderTextColor={"#96A7AF"}
                      style={{ width: "85%", backgroundColor: "#30444E", borderRadius: 10, paddingLeft: 10, color: "white" }} />
                  </View>
                  <View style={{ alignItems: "center", paddingTop: 10, paddingBottom: 40 }}>
                    <TextInput onChangeText={(e) => {
                      StoreTask.setTextAbout(e);
                    }}
                      value={StoreTask.Task.textAbout} placeholderTextColor={"#96A7AF"} style={{ width: "85%", backgroundColor: "#30444E", borderRadius: 10, paddingLeft: 10, color: "white" }} />
                  </View>
                  <TouchableOpacity onPress={() => {
                    change();
                    StoreState.setStateChangeTask();
                    StoreTask.setTextAbout("");
                    StoreTask.setTextAmount("");
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
                <TouchableOpacity onPress={() => {
                  StoreState.setStateChangeTask();
                  StoreTask.clearTask();
                }}>
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
  )
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

export default ChangeTask;