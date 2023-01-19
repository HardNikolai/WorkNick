import { observer } from "mobx-react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import StoreDate from "../mobx/StoreDate";


const Month = observer(({ item, index }: any) => {
  return (
    <View style={{ width: 110, alignItems: "center", justifyContent: "center" }}>
      {
        StoreDate.indexMonth === index ?
          <Text style={{ padding: 10, backgroundColor: "black", color: "white" }}>
            {item}
          </Text>
          :
          <TouchableOpacity onPress={() => StoreDate.setIndexMonth(index)}>
            <Text style={{ padding: 10, color: "white" }}>
              {item}
            </Text>
          </TouchableOpacity>
      }
    </View>
  );

});

export default Month;