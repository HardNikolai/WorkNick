import { observer } from "mobx-react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import HomeOn from "../../assets/HomeOn.svg";
import StoreState from "../mobx/StoreState";
import Off from "../../assets/Off.svg";
import On from "../../assets/On.svg";
import UserOff from "../../assets/UserOff.svg";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/RootStackParamList";
import StoreTask from "../mobx/StoreTask";

const BlockButtonsHomeOn = observer(() => {
  const navigation = useNavigation<NavigationProp<RootStackParamList, keyof RootStackParamList>>();

  return (
    <>
      <View style={styles.blockButton}>
        <HomeOn width={19} height={19} />
        {
          StoreState.stateAddNewTask ?
            <TouchableOpacity onPress={() => StoreState.setStateAddNewTask()}>
              <View style={{ marginLeft: 45, marginRight: 45 }}>
                <Off />
              </View>
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={() => StoreState.setStateAddNewTask()}>
              <View style={{ marginLeft: 45, marginRight: 45 }}>
                <On />
              </View>
            </TouchableOpacity>
        }
        <TouchableOpacity onPress={() => {
          navigation.navigate("ProfileScreen");
          StoreTask.clearTask();
        }}>
          <UserOff width={19} height={19} />
        </TouchableOpacity>
      </View>
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

export default BlockButtonsHomeOn;