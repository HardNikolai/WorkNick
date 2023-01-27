import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '/redux/store';
import { setCategory } from '/redux/sliceCategory';

const BlockFilter = () => {
  const [stateListCategory, setStateListCategory] = useState(false);
  const dispatch = useDispatch();
  const dataListCategory = useSelector((state: RootState) => state.category.dataCategories.userCategories);

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setStateListCategory(!stateListCategory)}>
          <View style={styles.blockTextFilter}>
            <Text style={styles.textFilter}>Фильтр</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch(setCategory("Выберете категорию"))}>
          <View style={styles.blockResetFilter}>
            <Text style={styles.textResetFilter}>Сброс фильтра</Text>
          </View>
        </TouchableOpacity>
      </View>
      {stateListCategory && (
        <FlatList
          data={dataListCategory}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                setStateListCategory(false);
                dispatch(setCategory(item.name))
              }}>
              {item.name.length > 0 && <Text style={styles.textTask}>{item.name}</Text>}
            </TouchableOpacity>
          )}
          style={styles.blockListTasks}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: "100%", 
    alignItems: "center"
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  blockTextFilter: {
    marginTop: 20,
  },
  textFilter: {
    color: 'white',
  },
  blockResetFilter: {
    marginLeft: 10,
    marginTop: 20,
  },
  textResetFilter: {
    color: 'white',
  },
  blockListTasks: {
    backgroundColor: '#333333',
    width: 200,
    borderRadius: 10,
    height: 100
  },
  textTask: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
  },
});
export default BlockFilter;