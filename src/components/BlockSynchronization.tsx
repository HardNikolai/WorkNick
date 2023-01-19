import { observer } from "mobx-react";
import { Text, TouchableOpacity, View } from "react-native";
import Bitmap from "../../assets/Bitmap.svg";
import Play from "../../assets/Play.svg";
import StoreDate from "../mobx/StoreDate";

const BlockSynchronization = observer(() => {
  return (
    <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <View style={{ backgroundColor: "#286053", width: "90%", borderRadius: 10, flexDirection: "row", height: 100, justifyContent: "center", alignItems: "center" }}>
        <View style={{ width: 59, height: 57, backgroundColor: "#3DD598", justifyContent: "center", alignItems: "center", borderRadius: 10 }}>
          <Bitmap />
        </View>
        <View style={{ marginHorizontal: 10 }}>
          <Text style={{ color: "#3DD598" }}>Синхронизация</Text>
          <Text style={{ color: "#3DD598", fontSize: 10 }}>{`Последняя синхронизация ${StoreDate.dateSynchronization}`}</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => StoreDate.setDateSynchronization(new Date())}>
            <Play />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
});

export default BlockSynchronization