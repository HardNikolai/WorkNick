import { useMemo } from "react";
import { Text, View } from "react-native";
import Balance from "../mobx/Balance";

const ForecastBalance = () => {

  useMemo(() => {

  }, [Balance.forecast]);
  return (
    <>
      {
        Balance.forecast > 0 ?
          <View style={{ marginTop: 10, backgroundColor: "#333333", justifyContent: "center", alignItems: "center", paddingHorizontal: 10, paddingVertical: 10, borderRadius: 20, width: "90%" }}>
            <Text style={{ color: "white", fontSize: 12 }}>
              Прогноз баланса на конец месяца
            </Text>
            <Text style={{ color: "white", marginTop: 5 }}>
              {Balance.forecast.toFixed(2)} Р
            </Text>
          </View>
          :
          <View style={{ marginTop: 10, backgroundColor: "#333333", justifyContent: "center", alignItems: "center", paddingHorizontal: 10, paddingVertical: 10, borderRadius: 20, width: "90%" }}>
            <Text style={{ color: "white", fontSize: 12 }}>
              Прогноз баланса на конец месяца
            </Text>
            <Text style={{ color: "red", marginTop: 5 }}>
              {Balance.forecast.toFixed(2)} Р
            </Text>
          </View>
      }
    </>
  );
};

export default ForecastBalance;