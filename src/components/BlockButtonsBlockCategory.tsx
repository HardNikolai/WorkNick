import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../navigation/RootStackParamList";
import HomeOff from "../../assets/HomeOff.svg";
import UserOn from "../../assets/UserOn.svg";
import StoreState from "../mobx/StoreState";
import Off from "../../assets/Off.svg";
import On from "../../assets/On.svg";

const BlockButtonsBlockCategory = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList, keyof RootStackParamList>>();
  return (
    <>
      <View style={styles.blockButton}>
        <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
          <HomeOff width={19} height={19} />
        </TouchableOpacity>
        {
          StoreState.stateAddNewCategory ?
            <TouchableOpacity onPress={() => StoreState.setStateAddCategory()}>
              <View style={{ marginLeft: 45, marginRight: 45 }}>
                <Off />
              </View>
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={() => StoreState.setStateAddCategory()}>
              <View style={{ marginLeft: 45, marginRight: 45 }}>
                <On />
              </View>
            </TouchableOpacity>
        }
        <UserOn width={19} height={19} />
      </View>
    </>
  );
};

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

export default BlockButtonsBlockCategory;