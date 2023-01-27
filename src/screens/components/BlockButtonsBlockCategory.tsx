import {NavigationProp, useNavigation} from '@react-navigation/native';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setStateAddCategory} from '/redux/stateConfig';
import {RootState} from '/redux/store';
import {RootStackParamList} from '/navigation/RootStackParamList';
import svg from '/assets/index_svg';

const BlockButtonsBlockCategory = () => {
  const {HomeOff, Off, On, UserOn} = svg;
  const dispatch = useDispatch();
  const navigation =
    useNavigation<
      NavigationProp<RootStackParamList, keyof RootStackParamList>
    >();
  const stateAddNewCategory = useSelector(
    (state: RootState) => state.state.stateAddNewCategory,
  );

  return (
    <View style={styles.blockButton}>
      <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
        <HomeOff width={19} height={19} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => dispatch(setStateAddCategory(!stateAddNewCategory))}>
        <View style={styles.blockButtonAdd}>
          {stateAddNewCategory ? <Off /> : <On />}
        </View>
      </TouchableOpacity>
      <UserOn />
    </View>
  );
};

const styles = StyleSheet.create({
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

export default BlockButtonsBlockCategory;