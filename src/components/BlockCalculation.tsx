import { Switch, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Group from "../../assets/Group.svg";
import { RootState } from "../redux/store";
import { toggleIsStateCalculation } from "../redux/userConfigSlice";

const BlockCalculation = () => {
  const dispatch = useDispatch();
  const isCalculation = useSelector((state: RootState) => state.config.config.isStateCalculation);

  const toggleSwitchStateCalculation = () => {
    dispatch(toggleIsStateCalculation(!isCalculation));
  };

  return (
    <View style={{ backgroundColor: "#30444E" }}>
      <View style={{ paddingHorizontal: 25, paddingVertical: 15, flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Group />
          <Text style={{ marginLeft: 15, color: "white", fontSize: 13, width: "70%" }}>
            Расчитывать остаток на конец месяца
          </Text>
        </View>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isCalculation ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitchStateCalculation}
          value={isCalculation}
        />
      </View>
    </View>
  );
};

export default BlockCalculation;