import axios from "axios";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import StoreState from "../mobx/StoreState";
import User from "../mobx/User";
import { upDateListCategory } from "../screens/components/BlockAddCategory";

const urlCategoryPost = "https://sheets.googleapis.com/v4/spreadsheets/1p3L7CgVUwJxE9gePiJ0xDSXIkw5y6bRyCEOpTqUNHc8/values/Categories:append?access_token=";

const BlockAddNewCategory = () => {
  const [isInput, setIsInput] = useState(false);
  const [textInput, setTextInput] = useState("");

  const addCategory = async (str: string) => {
    if (str.length > 0) {
      await axios.post(`${urlCategoryPost}${User.token}&valueInputOption=RAW`, { "values": [[str, User.nameUser]] });
      StoreState.setStateListCategory();
      setTextInput("");
      upDateListCategory();
    } else {
      StoreState.setStateError();
      setTimeout(() => {
        StoreState.setStateError();
      }, 2000);
    };
  };

  return (
    <>
      {
        StoreState.stateAddNewCategory ?
          <View style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", width: "95%", bottom: 93 }}>
            <View style={{ flexDirection: "column", backgroundColor: "#475E69", width: "90%", borderRadius: 20 }}>
              <View style={{ alignItems: "center", paddingTop: 10, paddingBottom: 20 }}>
                <TextInput
                  onChangeText={(e) => setTextInput(e)}
                  placeholder="Название категории"
                  placeholderTextColor={"#96A7AF"}
                  style={{ width: "85%", backgroundColor: "#30444E", borderRadius: 10, paddingLeft: 10, color: "white" }}
                />
              </View>
              <View style={{ alignItems: "center", marginBottom: 15 }}>
                <TouchableOpacity onPress={() => {
                  addCategory(textInput);
                  setIsInput(!isInput);
                  StoreState.setStateAddCategory();
                }}>
                  <View style={{ backgroundColor: "#3DD598", width: "100%", borderRadius: 10, alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ fontSize: 20, fontStyle: "italic", paddingVertical: 10, paddingHorizontal: 20 }}>Добавить</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          :
          <></>
      }
    </>
  );
};

export default BlockAddNewCategory;