import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import StoreDate from "../mobx/StoreDate";
import ArrowDown from "../../assets/ArrowDown.svg";
import ArrowUp from "../../assets/ArrowUp.svg";
import ArrowRight from "../../assets/ArrowRight.svg";
import StoreState from "../mobx/StoreState";
import StoreTask from "../mobx/StoreTask";
import { observer } from "mobx-react-lite";

const OneTaskFilter = observer(({task}: any) => {
  const monthOfTask: number = Number(Number(task.date.slice(task.date.indexOf('.') + 1, 5))) - 1;
  const yearOfTask: number = Number(task.date.slice(task.date.indexOf('.') + 4));
  const HEIGHT = (Dimensions.get("window").height - 200) / 3;
  return (
    <>
      {
        monthOfTask === StoreDate.indexMonth && yearOfTask === StoreDate.numYear && StoreTask.Task.nameCategories === task.nameCategories ?
          <View style={{ justifyContent: "space-between", alignItems: "center", width: "100%", height: HEIGHT }}>
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
  );
});

export default OneTaskFilter;