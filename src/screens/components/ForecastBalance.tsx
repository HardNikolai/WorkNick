import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '/redux/store';

const ForecastBalance = () => {
  const forecast = useSelector(
    (state: RootState) => state.balance.dataBalance.forecast,
  );
  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Text style={styles.textLabelChart}>
          Прогноз баланса на конец месяца
        </Text>
        <Text
          style={[
            forecast > 0 ? styles.textBalanceWhite : styles.textBalanceRed,
          ]}>
          {forecast.toFixed(2)} Р
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: '100%',
    alignItems: 'center',
  },
  container: {
    marginTop: 10,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 20,
    width: '90%',
  },
  textLabelChart: {
    color: 'white',
    fontSize: 12,
  },
  textBalanceWhite: {
    color: 'white',
    marginTop: 5,
  },
  textBalanceRed: {
    color: 'red',
    marginTop: 5,
  },
});

export default ForecastBalance;
