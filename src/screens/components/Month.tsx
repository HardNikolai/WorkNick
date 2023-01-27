import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '/redux/store';
import { changeMonth } from '/redux/storeData';
import { MonthProps } from '../interfaces/interfaces';

const Month = ({item, index}: MonthProps) => {
  const dispatch = useDispatch();
  const month = useSelector((state: RootState) => state.data.data.month);

  return (
    <View style={styles.container}>
      {month === index ? (
        <Text style={styles.textSelectMonth}>{item}</Text>
      ) : (
        <TouchableOpacity onPress={() => dispatch(changeMonth(index))}>
          <Text style={styles.textMonth}>{item}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 110,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textSelectMonth: {
    padding: 10,
    backgroundColor: 'black',
    color: 'white',
  },
  textMonth: {
    padding: 10,
    color: 'white',
  },
});

export default Month;