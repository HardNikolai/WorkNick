import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import Categories from "../../mobx/Categories";
import axios from "axios";
import { urlCategory } from "./HomeScreen";
import { observer } from "mobx-react";
import User from "../../mobx/User";
import ArrowLeft from "../../../assets/ArrowLeft.svg";
import StoreState from "../../mobx/StoreState";
import Category from "../../components/Category";
import BlockErrorInput from "../../components/BlockErrorInput";
import BlockAddNewCategory from "../../components/BlockAddNewCategory";
import BlockButtonsBlockCategory from "../../components/BlockButtonsBlockCategory";

export const upDateListCategory = async () => {
  const newUrlCat = `${urlCategory}${User.token}`;
  const resultCatExpense = await axios.get(newUrlCat);
  const arrExpense = [];

  if (resultCatExpense.data.values != undefined) {
    for (let i = 1; i < resultCatExpense.data.values.length; i++) {
      if (resultCatExpense.data.values[i][1] === User.nameUser) {
        const obj = {
          id: 0,
          name: ""
        };
        obj.id = i;
        obj.name = resultCatExpense.data.values[i][0];
        arrExpense.push(obj);
      };
    };
    Categories.setCategory(arrExpense);
    StoreState.setStateListCategory();
  } else {
    Categories.setCategory([]);
    StoreState.setStateListCategory();
  }
};


const AddCategoryExpense = observer(({ navigation }: any) => {
  const loadProfile = () => {
    navigation.navigate("ProfileScreen");
  };

  useMemo(() => {
    upDateListCategory();
  }, [StoreState.stateAddNewCategory, StoreState.stateDeleteCategory]);

  return (
    <View style={styles.container}>
      <View style={{ width: "100%", paddingHorizontal: 2, paddingVertical: 15, justifyContent: "flex-start" }}>
        <View style={{ width: "30%" }}>
          <TouchableOpacity onPress={() => { loadProfile() }}>
            <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 5 }}>
              <ArrowLeft />
              <Text style={{ color: "white", fontStyle: "italic", marginLeft: 10 }}>Назад</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <BlockErrorInput />
      <FlatList
        data={Categories.dataListCategory}
        renderItem={
          ({ item }) =>
            <Category item={item} />
        }
        style={{ flex: 1, marginTop: 35, width: "100%" }}
      />
      <BlockAddNewCategory />
      <BlockButtonsBlockCategory />
    </View>
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

export default AddCategoryExpense;