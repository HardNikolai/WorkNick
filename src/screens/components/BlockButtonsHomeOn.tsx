import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '/navigation/RootStackParamList';
import svg from '/assets/index_svg';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '/redux/store';
import {setStateAddNewTask} from '/redux/stateConfig';
import {clearTask} from '/redux/sliceTask';

const BlockButtonsHomeOn = () => {
  const {HomeOn, Off, On, UserOff} = svg;
  const navigation =
    useNavigation<
      NavigationProp<RootStackParamList, keyof RootStackParamList>
    >();
    
  const dispatch = useDispatch();
  const stateAddNewTask = useSelector((state: RootState) => state.state.stateAddNewTask);

  const goToProfile = () => {
    navigation.navigate('ProfileScreen');
    dispatch(clearTask());
  };

  return (
    <View style={styles.container}>
      <View style={styles.blockButton}>
        <HomeOn width={19} height={19} />
          <TouchableOpacity
            onPress={() => {
              dispatch(setStateAddNewTask(!stateAddNewTask));
            }}>
            <View style={styles.blockButtonAdd}>
              {stateAddNewTask ? <Off /> : <On />}
            </View>
          </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            goToProfile();
          }}>
          <UserOff width={19} height={19} />
        </TouchableOpacity>
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
  blockButtonAdd: {
    marginLeft: 45,
    marginRight: 45,
  },
});

export default BlockButtonsHomeOn;