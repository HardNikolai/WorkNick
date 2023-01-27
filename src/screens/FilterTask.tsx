import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BlockButtonsHomeOn from './components/BlockButtonsHomeOn';
import OneTaskFilter from './components/OneTaskFilter';
import svg from '/assets/index_svg';
import { HEIGHT } from '/constants/index';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from 'src/navigation/RootStackParamList';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '/redux/store';
import { clearTask } from '/redux/sliceTask';

const FilterTask = () => {
  const {ArrowLeft} = svg;
  const navigation =
  useNavigation<
    NavigationProp<RootStackParamList, keyof RootStackParamList>
  >();
  const dispatch = useDispatch();
  const dataMonth = useSelector((state: RootState) => state.table.dataTable.allDataMonth);
  const storeTask = useSelector((state: RootState) => state.dataTask.dataTask.task);

  const goToBack = () => {
    navigation.navigate('HomeScreen');
    dispatch(clearTask());
  }

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.blockHeader}>
          <TouchableOpacity
            onPress={() => {
              goToBack()
            }}>
            <View style={styles.blockButtonHeader}>
              <ArrowLeft />
              <Text style={styles.textButtonBack}>Назад</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: 'white'}}>
            Категория "{storeTask.nameCategories}"
          </Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <FlatList
            data={dataMonth}
            keyExtractor={item => item.id.toString()}
            getItemLayout={(data, index) => ({
              length: HEIGHT,
              offset: HEIGHT * index,
              index,
            })}
            initialScrollIndex={0}
            snapToAlignment={'start'}
            snapToInterval={30}
            decelerationRate={'fast'}
            maxToRenderPerBatch={15}
            ListHeaderComponent={<View style={{height: HEIGHT}} />}
            ListFooterComponent={<View style={{height: HEIGHT}} />}
            viewabilityConfig={{
              minimumViewTime: 10,
              itemVisiblePercentThreshold: 100,
              waitForInteraction: false,
            }}
            style={styles.blockListFilterTask}
            renderItem={({item}) => <OneTaskFilter task={item} />}
          />
        </View>
      </View>
      <BlockButtonsHomeOn />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2A3C44',
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },
  blockHeader: {
    marginTop: 10,
  },
  blockButtonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
  },
  textButtonBack: {
    color: 'white',
    fontStyle: 'italic',
    marginLeft: 10,
  },
  blockListFilterTask: {
    width: '90%',
  },
});

export default FilterTask;