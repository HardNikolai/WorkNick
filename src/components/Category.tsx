import axios from "axios";
import { observer } from "mobx-react";
import { View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import StoreState from "../mobx/StoreState";
import User from "../mobx/User";

const urlCategory = "https://sheets.googleapis.com/v4/spreadsheets/1p3L7CgVUwJxE9gePiJ0xDSXIkw5y6bRyCEOpTqUNHc8/values/Categories!A";

const Category = observer(({ item }: any) => {
  const deleteCategory = async () => {
    await axios.post(`${urlCategory}${item.id + 1}:B${item.id + 1}:clear?access_token=${User.token}`);
  };

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      {
        item.name ?
          <View style={{ width: "80%", marginBottom: 20, alignItems: "center", justifyContent: "space-between", flexDirection: "row" }}>
            <Text style={{ color: "white", fontSize: 20, width: "65%" }}>{item.name}</Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={() => {
                deleteCategory();
                StoreState.setStateDeleteCategory();
              }}>
                <View style={{ backgroundColor: "white", paddingVertical: 5, paddingHorizontal: 5, borderRadius: 10 }}>
                  <Image source={require("../../assets/trash.png")} style={{ width: 20, height: 20 }} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          :
          <></>
      }
    </View>
  );
});

export default Category;