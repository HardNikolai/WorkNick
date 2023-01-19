import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../navigation/RootStackParamList";
import ArrowRight from "../../assets/ArrowRight.svg";
import User from "../mobx/User";

const BlockProfile = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList, keyof RootStackParamList>>();
  const avatar = User.user.profile.picture;
  const name = User.user.profile.name;
  const email = User.user.profile.email;

  return (
    <View style={{ backgroundColor: "#30444E" }}>
      <TouchableOpacity onPress={() => navigation.navigate("ProfileInnerScreen")}>
        <View style={{ paddingHorizontal: 25, paddingVertical: 15, flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
          <View style={{ flexDirection: "row", paddingLeft: 5 }}>
            <Image style={{ width: 60, height: 60, borderWidth: 1, borderRadius: 50 }} source={{
              uri: avatar
            }} />
            <View style={{ marginLeft: 15, justifyContent: "center" }}>
              <Text style={{ fontStyle: "italic", fontSize: 14, color: "white", fontWeight: "400" }}>{name}</Text>
              <Text style={{ fontStyle: "italic", fontSize: 10, color: "white", fontWeight: "400" }}>{email}</Text>
            </View>
          </View>
          <View style={{ justifyContent: "center" }}>
            <ArrowRight />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BlockProfile;