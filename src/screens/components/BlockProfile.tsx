import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RootStackParamList} from '/navigation/RootStackParamList';
import svg from '/assets/index_svg';
import { useSelector } from 'react-redux';
import { RootState } from '/redux/store';

const BlockProfile = () => {
  const {ArrowRight} = svg;
  const navigation =
    useNavigation<
      NavigationProp<RootStackParamList, keyof RootStackParamList>
    >();
  const user = useSelector((state: RootState) => state.user.dataUser.user);
  const {picture, name, email} = user.profile;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('ProfileInnerScreen')}>
        <View style={styles.blockHead}>
          <View style={styles.blockAboutUser}>
            <Image
              style={styles.blockImageAvatar}
              source={{
                uri: picture,
              }}
            />
            <View style={styles.blockTextAboutUser}>
              <Text style={styles.textAboutUser}>{name}</Text>
              <Text style={styles.textAboutUser}>{email}</Text>
            </View>
          </View>
          <View style={styles.blockImageArrow}>
            <ArrowRight />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#30444E',
  },
  blockHead: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  blockAboutUser: {
    flexDirection: 'row',
    paddingLeft: 5,
  },
  blockImageAvatar: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderRadius: 50,
  },
  blockTextAboutUser: {
    marginLeft: 15,
    justifyContent: 'center',
  },
  textAboutUser: {
    fontStyle: 'italic',
    fontSize: 14,
    color: 'white',
    fontWeight: '400',
  },
  blockImageArrow: {
    justifyContent: 'center',
  },
});

export default BlockProfile;