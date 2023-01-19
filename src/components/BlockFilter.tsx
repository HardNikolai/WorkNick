import { observer } from "mobx-react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import Categories from "../mobx/Categories";
import StoreState from "../mobx/StoreState";

const BlockFilter = observer(() => {
  return (

    <>
      <View style={{ flexDirection: "row", justifyContent: "space-between", width: "90%" }}>
        <TouchableOpacity onPress={() => StoreState.setStateActiveViewFilter()}>
          <View style={{ marginTop: 20 }}>
            <Text style={{ color: "white" }}>Фильтр</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Categories.clearNameCategoryFilter()}>
          <View style={{ marginLeft: 10, marginTop: 20 }}>
            <Text style={{ color: "white" }}>Сброс фильтра</Text>
          </View>
        </TouchableOpacity>
      </View>
      {
        StoreState.stateActiveViewFilter ?
          <FlatList
            data={Categories.dataListCategory}
            renderItem={
              ({ item }) => (
                <TouchableOpacity onPress={() => {
                  StoreState.setStateActiveViewFilter();
                  Categories.setNameCategoryFilter(item.name);
                }}>
                  {
                    item.name.length > 0 ?
                      <Text style={{ color: "white", fontSize: 30, textAlign: "center" }}>{item.name}</Text>
                      :
                      <></>
                  }
                </TouchableOpacity>
              )
            }
            style={{ marginTop: 35, backgroundColor: "#333333", width: 200, borderRadius: 10, height: "100%" }}
          />
          :
          <></>
      }
    </>
  );
});

export default BlockFilter;