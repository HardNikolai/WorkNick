import { observer } from "mobx-react-lite"
import { Modal, Text, View } from "react-native";
import StoreState from "../mobx/StoreState";


const BlockErrorInput = observer(() => {
  return (
    <>
      {
        StoreState.stateError ?
          <Modal transparent={true}>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <View style={{ backgroundColor: "red", borderRadius: 10, alignItems: "center", justifyContent: "center" }}>
                <Text style={{ color: "white", paddingVertical: 10, paddingHorizontal: 20 }}>Некорректный ввод данных</Text>
              </View>
            </View>
          </Modal>
          :
          <></>
      }
    </>
  );
});

export default BlockErrorInput;