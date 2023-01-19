import { Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ArrowLeft from "../../../assets/ArrowLeft.svg";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import User from "../../mobx/User";
import BlockButtonsHomeOff from "../../components/BlockButtonsHomeOff";


const ProfileInnerScreen = ({ navigation }: any) => {
  const avatar = User.user.profile.picture;
  const name = User.user.profile.name;
  const email = User.user.profile.email;

  const loadProfile = () => {
    navigation.navigate("ProfileScreen");
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      navigation.navigate("EnterApp");
    } catch (error) {
      console.log("message_error", error)
    };
  };

  return (
    <View style={{ backgroundColor: "#30444E", height: "100%", justifyContent: "space-between" }}>
      <View>
        <View style={{ paddingHorizontal: 2, paddingVertical: 15, borderWidth: 1, borderColor: "gray" }}>
          <TouchableOpacity onPress={() => { loadProfile() }}>
            <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 5 }}>
              <ArrowLeft />
              <Text style={{ color: "white", fontStyle: "italic", marginLeft: 10 }}>Назад</Text>
            </View>
          </TouchableOpacity>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image style={{ width: 128, height: 137, borderWidth: 1, borderRadius: 13 }} source={{
              uri: avatar
            }} />
          </View>
        </View>
        <View style={{ paddingVertical: 25 }}>
          <View>
            <Text style={{ color: "white", paddingHorizontal: 15, marginBottom: 10, marginTop: 10 }}>Ваше имя</Text>
            <Text style={{ color: "lightgray", backgroundColor: "#2A3C44", marginHorizontal: 15, paddingHorizontal: 15, paddingVertical: 10, borderRadius: 10 }}>{name}</Text>
          </View>
          <View>
            <Text style={{ color: "white", paddingHorizontal: 15, marginTop: 10, marginBottom: 10 }}>Ваше email</Text>
            <Text style={{ color: "lightgray", backgroundColor: "#475E69", marginHorizontal: 15, paddingHorizontal: 15, paddingVertical: 10, borderRadius: 10 }}>{email}</Text>
          </View>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center", paddingVertical: 35 }}>
          <TouchableOpacity onPress={async () => await signOut()}>
            <View style={{ backgroundColor: "#3ED598", borderRadius: 10, justifyContent: "center", alignItems: "center", paddingVertical: 15, paddingHorizontal: 55, width: "100%" }}>
              <Text style={{ color: "black", fontStyle: "italic" }}>Выйти из гугл аккаунта</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <BlockButtonsHomeOff />
    </View>
  )
};

export default ProfileInnerScreen;