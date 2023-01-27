import {Text, View, Image, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import BlockButtonsHomeOff from './components/BlockButtonsHomeOff';
import svg from '/assets/index_svg';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from 'src/navigation/RootStackParamList';

const ProfileInnerScreen = () => {
  const {ArrowLeft} = svg;
  const navigation =
  useNavigation<
    NavigationProp<RootStackParamList, keyof RootStackParamList>
  >();

  const user = useSelector((state: RootState) => state.user.dataUser.user);
  const {picture, name, email} = user.profile;

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      navigation.navigate('EnterApp');
    } catch (error) {
      console.log('message_error', error);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.blockHead}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ProfileScreen')}>
            <View style={styles.blockButtonBack}>
              <ArrowLeft />
              <Text style={styles.textButtonBack}>Назад</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.blockImage}>
            <Image
              style={styles.blockAvatar}
              source={{
                uri: picture,
              }}
            />
          </View>
        </View>
        <View style={styles.blockDataUser}>
          <View>
            <Text style={styles.textLabelName}>Ваше имя</Text>
            <Text style={styles.textUserName}>{name}</Text>
          </View>
          <View>
            <Text style={styles.textLabelName}>Ваше email</Text>
            <Text style={styles.textUserEmail}>{email}</Text>
          </View>
        </View>
        <View style={styles.blockButtonExit}>
          <TouchableOpacity onPress={async () => await signOut()}>
            <View style={styles.blockButtonExitMain}>
              <Text style={styles.textButtonExite}>Выйти из гугл аккаунта</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <BlockButtonsHomeOff />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#30444E',
    height: '100%',
    justifyContent: 'space-between',
  },
  blockHead: {
    paddingHorizontal: 2,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: 'gray',
  },
  blockButtonBack: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
  },
  textButtonBack: {
    color: 'white',
    fontStyle: 'italic',
    marginLeft: 10,
  },
  blockImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  blockAvatar: {
    width: 128,
    height: 137,
    borderWidth: 1,
    borderRadius: 13,
  },
  blockDataUser: {
    paddingVertical: 25,
  },
  textLabelName: {
    color: 'white',
    paddingHorizontal: 15,
    marginBottom: 10,
    marginTop: 10,
  },
  textUserName: {
    color: 'lightgray',
    backgroundColor: '#2A3C44',
    marginHorizontal: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },
  textUserEmail: {
    color: 'lightgray',
    backgroundColor: '#475E69',
    marginHorizontal: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },
  blockButtonExit: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 35,
  },
  blockButtonExitMain: {
    backgroundColor: '#3ED598',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 55,
    width: '100%',
  },
  textButtonExite: {
    color: 'black',
    fontStyle: 'italic',
  },
});

export default ProfileInnerScreen;