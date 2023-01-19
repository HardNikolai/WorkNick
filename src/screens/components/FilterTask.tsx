import { observer } from "mobx-react";
import { Dimensions, FlatList, Text, TouchableOpacity, View } from "react-native";
import BlockButtonsHomeOn from "../../components/BlockButtonsHomeOn";
import OneTaskFilter from "../../components/OneTaskFilter";
import DataTable from "../../mobx/DataTable";
import ArrowLeft from "../../../assets/ArrowLeft.svg";
import StoreTask from "../../mobx/StoreTask";
import CalendarFilter from "../../components/CalendarFilter";
import StoreState from "../../mobx/StoreState";

const HEIGHT = (Dimensions.get("window").height - 200) / 3;

const FilterTask = observer(({ navigation }: any) => {
  const loadHome = () => {
    navigation.navigate("HomeScreen");
  };

  return (
    <View style={{ backgroundColor: "#2A3C44", width: "100%", height: "100%", justifyContent: "space-between" }}>
      <View>
        <View style={{ marginTop: 10 }}>
          <TouchableOpacity onPress={() => {
            loadHome();
            StoreTask.clearTask();
            if (StoreState.stateTextLength) {
              StoreState.setStateTextLength();
            };
          }}>
            <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 5 }}>
              <ArrowLeft />
              <Text style={{ color: "white", fontStyle: "italic", marginLeft: 10 }}>Назад</Text>
            </View>
          </TouchableOpacity>
        </View>
        <CalendarFilter />
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ color: "white" }}>Категория "{StoreTask.Task.nameCategories}"</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <FlatList
            data={DataTable.DataMonth}
            keyExtractor={(item) => item.id.toString()}
            getItemLayout={(data, index) => (
              { length: HEIGHT, offset: HEIGHT * index, index }
            )}
            initialScrollIndex={Number(StoreTask.Task.id) - 2}
            snapToAlignment={"start"}
            snapToInterval={30}
            decelerationRate={"fast"}
            maxToRenderPerBatch={15}
            ListHeaderComponent={<View style={{ height: HEIGHT }} />}
            ListFooterComponent={<View style={{ height: HEIGHT }} />}
            viewabilityConfig={{
              minimumViewTime: 10,
              itemVisiblePercentThreshold: 100,
              waitForInteraction: false,
            }}
            style={{ marginTop: 35, width: "90%" }}
            renderItem={
              ({ item }) => (
                <OneTaskFilter task={item} />
              )
            }
          />
        </View>
      </View>
      <BlockButtonsHomeOn />
    </View>
  );
});

export default FilterTask;