import { Pressable, StyleSheet, Text, View } from "react-native"
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import User from "../../mobx/User";

const EnterApp = ({ navigation }: any) => {
  GoogleSignin.configure({
    webClientId: '859937948700-ugqpdosi4fi1h4lc4a98abl24o3am0ok.apps.googleusercontent.com',
    scopes: ["https://www.googleapis.com/auth/spreadsheets", "https://www.googleapis.com/auth/drive.readonly"]
  });

  const loadHome = () => {
    navigation.navigate("HomeScreen");
  };

  const loadError = () => {
    navigation.navigate("ErrorEnterScreen");
  };

  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const res = await auth().signInWithCredential(googleCredential);
    // Sign-in the user with the credential
    if (res.additionalUserInfo) {
      User.setUser(res.additionalUserInfo);
      loadHome();
      return res;
    } else {
      loadError();
      return res;
    };
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={{ justifyContent: "flex-start", paddingBottom: 15 }}>
          <Text style={{ color: "white", fontSize: 30, fontWeight: "600" }}>
            Вход
          </Text>
        </View>
        <Pressable onPress={() => onGoogleButtonPress()}>
          <View style={styles.buttonEnter}>
            <Text style={{ fontStyle: "italic", color: "black" }}>Войти с помощью гугл акаунта</Text>
          </View>
        </Pressable>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2A3C44"
  },
  buttonEnter: {
    backgroundColor: "#40DF9F",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15
  }
});

export default EnterApp;
