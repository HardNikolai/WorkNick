import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ForecastBalance from './ForecastBalance';
import Month from './Month';
import TotalBalance from './TotalBalance';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '/redux/store';
import svg from '/assets/index_svg';
import {CALENDAR} from '/constants/index';
import {setStateTouchDate} from '/redux/stateConfig';
import {changeMonth, changeYear} from '/redux/storeData';
import { addYear, subYear } from '/utils/utilCalendar';

const Calendar = () => {
  const {ArrowLeft, ArrowRight} = svg;
  const dispatch = useDispatch();
  const year = useSelector((state: RootState) => state.data.data.year);
  const month = useSelector((state: RootState) => state.data.data.month);
  const isCalculation = useSelector((state: RootState) => state.config.config.isStateCalculation);
  const stateTouchDate = useSelector((state: RootState) => state.state.stateTouchDate);

  const subtract = () => {
    const res = month - 1;
    if (res === -1) {
      dispatch(changeMonth(11));
      dispatch(changeYear(year - 1));
    } else {
      dispatch(changeMonth(res));
    }
  };

  const addition = () => {
    const res = month + 1;
    if (res === 12) {
      dispatch(changeMonth(0));
      dispatch(changeYear(year + 1));
    } else {
      dispatch(changeMonth(res));
    }
  };

  return (
    <View style={styles.container}>
      {stateTouchDate ? (
        <View style={styles.containerOpen}>
          <View style={styles.blockMain}>
            <TouchableOpacity onPress={() => dispatch(changeYear(subYear(year)))}>
              <ArrowLeft />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => dispatch(setStateTouchDate(!stateTouchDate))}>
              <Text style={styles.textCalendar}>{year}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => dispatch(changeYear(addYear(year)))}>
              <ArrowRight />
            </TouchableOpacity>
          </View>
          <FlatList
            data={CALENDAR}
            numColumns={3}
            renderItem={({item, index}) => (
              <Month item={item} index={index}></Month>
            )}
            keyExtractor={item => item}
            style={styles.blockListCalendar}
          />
        </View>
      ) : (
        <View>
          <View style={styles.containerClose}>
            <TouchableOpacity onPress={subtract}>
              <ArrowLeft />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => dispatch(setStateTouchDate(!stateTouchDate))}>
              <Text style={styles.textCalendar}>{CALENDAR[month]}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={addition}>
              <ArrowRight />
            </TouchableOpacity>
          </View>
          <View style={styles.blockTotal}>
            <TotalBalance />
            {isCalculation && <ForecastBalance />}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  containerOpen: {
    height: 200,
    alignItems: 'center',
  },
  containerClose: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 25,
  },
  blockMain: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: 350,
    paddingVertical: 25,
  },
  textCalendar: {
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  blockListCalendar: {
    backgroundColor: '#465E69',
  },
  blockTotal: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Calendar;