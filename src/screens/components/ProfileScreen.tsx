import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BlockProfile from "../../components/BlockProfile";
import BlockNatifee from "../../components/BlockNatifee";
import BlockCalculation from "../../components/BlockCalculation";
import BlockButtonsHomeOff from "../../components/BlockButtonsHomeOff";
import BlockInstallTime from "../../components/BlockInstallTime";
import { observer } from "mobx-react";
import BlockSynchronization from "../../components/BlockSynchronization";

const ProfileScreen = observer(({ navigation }: any) => {
  const loadAddCatExpense = () => {
    navigation.navigate("AddCatExpense");
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "space-between",
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

  return (
    <View style={styles.container}>
      <View style={{ width: "100%" }}>
        <View style={{ width: "100%", paddingTop: 20 }}>
          <BlockProfile />
          <BlockNatifee />
          <BlockCalculation />
          <BlockInstallTime />
          <TouchableOpacity onPress={() => loadAddCatExpense()}>
            <View style={{ width: "100%", height: 30, marginVertical: 10, justifyContent: "center", alignItems: "center", borderRadius: 10 }}>
              <Text style={{ color: "white", fontSize: 20 }}>Добавить категорию расходов</Text>
            </View>
          </TouchableOpacity>
        </View>
        <BlockSynchronization />
      </View>
      <BlockButtonsHomeOff />
    </View>
  );
});

export default ProfileScreen;