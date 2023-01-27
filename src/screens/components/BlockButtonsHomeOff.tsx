import {NavigationProp, useNavigation} from '@react-navigation/native';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {RootStackParamList} from '/navigation/RootStackParamList';
import svg from '/assets/index_svg';

const BlockButtonsHomeOff = () => {
  const {HomeOff, UserOn} = svg;
  const navigation =
    useNavigation<
      NavigationProp<RootStackParamList, keyof RootStackParamList>
    >();

  return (
    <View style={styles.container}>
      <View style={styles.blockButton}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <HomeOff width={19} height={19} />
        </TouchableOpacity>
        <View style={styles.blockMidle} />
        <UserOn width={19} height={19} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  blockButton: {
    borderWidth: 1,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    flexDirection: 'row',
    backgroundColor: '#30444E',
    paddingHorizontal: 15,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockMidle: {
    marginLeft: 45,
    marginRight: 45,
    marginBottom: 50,
  },
});

export default BlockButtonsHomeOff;