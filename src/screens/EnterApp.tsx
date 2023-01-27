import {Pressable, StyleSheet, Text, View} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {setUser} from '/redux/sliceUser';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from 'src/navigation/RootStackParamList';

const EnterApp = () => {
  const dispatch = useDispatch();
  const setDataUser = (data: object) => {
    dispatch(setUser(data));
  };
  GoogleSignin.configure({
    webClientId:
      '859937948700-ugqpdosi4fi1h4lc4a98abl24o3am0ok.apps.googleusercontent.com',
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets',
      'https://www.googleapis.com/auth/drive.readonly',
    ],
  });

  const navigation =
    useNavigation<
      NavigationProp<RootStackParamList, keyof RootStackParamList>
    >();

  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const res = await auth().signInWithCredential(googleCredential);
    // Sign-in the user with the credential
    if (res.additionalUserInfo) {
      setDataUser(res.additionalUserInfo);
      navigation.navigate('HomeScreen');
      return res;
    } else {
      navigation.navigate('ErrorEnterScreen');
      return res;
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.blockButtonEnter}>
          <Text style={styles.labelButtonEnter}>Вход</Text>
        </View>
        <Pressable onPress={onGoogleButtonPress}>
          <View style={styles.buttonEnter}>
            <Text style={styles.textButtonEnter}>
              Войти с помощью гугл акаунта
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2A3C44',
  },
  buttonEnter: {
    backgroundColor: '#40DF9F',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  blockButtonEnter: {
    justifyContent: 'flex-start',
    paddingBottom: 15,
  },
  labelButtonEnter: {
    color: 'white',
    fontSize: 30,
    fontWeight: '600',
  },
  textButtonEnter: {
    fontStyle: 'italic',
    color: 'black',
  },
});

export default EnterApp;