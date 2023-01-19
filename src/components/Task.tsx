import { Image, Text, TouchableOpacity, View } from "react-native";
import ArrowDown from "../../assets/ArrowDown.svg";
import ArrowUp from "../../assets/ArrowUp.svg";
import ArrowRight from "../../assets/ArrowRight.svg";
import axios from "axios";
import User from "../mobx/User";
import StoreTask from "../mobx/StoreTask";
import StoreDate from "../mobx/StoreDate";
import StoreState from "../mobx/StoreState";
import { observer } from "mobx-react-lite";
import Categories from "../mobx/Categories";

const urlDelete = "https://sheets.googleapis.com/v4/spreadsheets/1p3L7CgVUwJxE9gePiJ0xDSXIkw5y6bRyCEOpTqUNHc8/values/Transactions!A";

const Task = observer(({ task }: any) => {
  const monthOfTask: number = Number(Number(task.date.slice(task.date.indexOf('.') + 1, 5))) - 1;
  const yearOfTask: number = Number(task.date.slice(task.date.indexOf('.') + 4));

  const deleteTask = async () => {
    await axios.post(`${urlDelete}${Number(task.id) + 1}:H${Number(task.id) + 1}:clear?access_token=${User.token}`);
    StoreState.setStateListCategory();
  };

  return (
    <>
      {
        monthOfTask === StoreDate.indexMonth && yearOfTask === StoreDate.numYear && (Categories.nameCategoryFilter === task.nameCategories || Categories.nameCategoryFilter.length === 0) ?
          <View style={{ justifyContent: "space-between", alignItems: "center", width: "100%" }}>
            <View style={{ flexDirection: "row", backgroundColor: "#333333", width: "100%", alignItems: "center", justifyContent: "space-between", borderRadius: 20, paddingHorizontal: 15, paddingVertical: 10, margin: 3 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {
                  task.categories === "TRUE" ?
                    <ArrowDown />
                    :
                    <ArrowUp />
                }
                <View style={{ marginLeft: 10, marginRight: 10 }}>
                  {
                    StoreState.stateTextLength && StoreTask.Task.id === task.id ?
                      <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={{ color: "white", fontSize: 10, width: 50 }}>{task.textAbout}</Text>
                        <TouchableOpacity onPress={() => {
                          StoreState.setStateTextLength();
                          StoreTask.clearTask();
                        }}>
                          <ArrowRight width={15} height={15} />
                        </TouchableOpacity>
                      </View>
                      :
                      <Text numberOfLines={1} style={{ color: "white", fontSize: 10, width: 50 }}>{task.textAbout}</Text>
                  }
                  {
                    task.categories === "TRUE" ?
                      <Text style={{ color: "red", fontSize: 10 }}>{task.count} Р</Text>
                      :
                      <Text style={{ color: "green", fontSize: 10 }}>{task.count} Р</Text>
                  }
                </View>
                {
                  task.textAbout.length > 10 && !StoreState.stateTextLength ?
                    <TouchableOpacity onPress={() => {
                      StoreState.setStateTextLength();
                      StoreTask.setTask(task);
                    }}>
                      <ArrowRight width={15} height={15} />
                    </TouchableOpacity>
                    :
                    <></>
                }
              </View>
              <TouchableOpacity onPress={() => {
                StoreState.setStateChangeTask();
                StoreTask.setTask(task);
              }}>
                <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: "white", paddingVertical: 2, paddingHorizontal: 4, borderRadius: 10 }}>
                  <Image source={require("../../assets/pancel.png")} style={{ width: 20, height: 20, backgroundColor: "white" }} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteTask()}>
                <View style={{ justifyContent: "center", backgroundColor: "white", paddingVertical: 2, paddingHorizontal: 4, borderRadius: 10 }}>
                  <Image source={require("../../assets/trash.png")} style={{ width: 20, height: 20 }} />
                </View>
              </TouchableOpacity>
              <View>
                <Text style={{ color: "white", fontSize: 10 }}>{task.date}</Text>
                <Text style={{ color: "white", fontSize: 10 }}>{task.dateTime}</Text>
              </View>
            </View>
          </View>
          :
          <></>
      }
    </>
  )
});

export default Task; 