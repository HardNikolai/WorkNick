import { observer } from "mobx-react";
import { useMemo } from "react";
import { View, Text } from "react-native";
import GreenStatus from "../../assets/GreenStatus.svg";
import RedStatus from "../../assets/RedStatus.svg";
import Balance from "../mobx/Balance";


const TotalBalance = observer(() => {

  useMemo(() => {

  }, [Balance.total]);
  return (
    <>
      {
        Balance.total >= 0 ?
          <View style={{ backgroundColor: "#333333", justifyContent: "space-around", width: "90%", flexDirection: "row", borderRadius: 20, paddingVertical: 10 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <GreenStatus width={9} height={9} />
              <Text style={{ color: "white", paddingLeft: 5 }}>Текущий баланс</Text>
            </View>
            <View>
              <Text style={{ color: "white" }}>{Balance.total.toFixed(2)} Р</Text>
            </View>
          </View>
          :
          <View style={{ backgroundColor: "#333333", justifyContent: "space-around", width: "90%", flexDirection: "row", borderRadius: 20, paddingVertical: 10 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <RedStatus width={9} height={9} />
              <Text style={{ color: "white", paddingLeft: 5 }}>Текущий баланс</Text>
            </View>
            <View>
              <Text style={{ color: "white" }}>{Balance.total.toFixed(2)} Р</Text>
            </View>
          </View>
      }
    </>

  );
});

export default TotalBalance;