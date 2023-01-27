import {StyleSheet, Text, View} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import svg from '/assets/index_svg';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from 'src/navigation/RootStackParamList';
import {useSelector} from 'react-redux';
import {RootState} from 'src/redux/store';
import componentsBlockAddCategory from './components/index/componentsBlockAddCategory';

const AddCategoryExpense = () => {
  const {ArrowLeft} = svg;
  const {Category, BlockAddNewCategory, BlockError, BlockButtonsBlockCategory} =
    componentsBlockAddCategory;
  const dataUserCategories = useSelector(
    (state: RootState) => state.category.dataCategories.userCategories,
  );
  const navigation =
    useNavigation<
      NavigationProp<RootStackParamList, keyof RootStackParamList>
    >();

  return (
    <View style={styles.container}>
      <View style={styles.blockHead}>
        <View style={styles.innerBlockHead}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ProfileScreen')}>
            <View style={styles.innerBlockHead}>
              <ArrowLeft />
              <Text style={styles.textButtonBack}>Назад</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={dataUserCategories}
        renderItem={({item}) => (
          <Category item={item} />
        )}
        style={styles.blockListCategory}
      />
      <BlockError />
      <BlockAddNewCategory />
      <BlockButtonsBlockCategory />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#2A3C44',
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
  blockHead: {
    width: '100%',
    paddingHorizontal: 2,
    paddingVertical: 15,
    justifyContent: 'flex-start',
  },
  innerBlockHead: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
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
  blockListCategory: {
    flex: 1,
    marginTop: 35,
    width: '100%',
  },
});

export default AddCategoryExpense;
