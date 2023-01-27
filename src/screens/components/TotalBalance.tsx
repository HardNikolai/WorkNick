import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '/redux/store';
import svg from '/assets/index_svg';

const TotalBalance = () => {
  const {GreenStatus, RedStatus} = svg;
  const total = useSelector((state: RootState) => state.balance.dataBalance.total);

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          {total >= 0 ? (
            <GreenStatus width={9} height={9} />
          ) : (
            <RedStatus width={9} height={9} />
          )}
          <Text style={styles.textLabelBalance}>Текущий баланс</Text>
        </View>
        <View>
            <Text style={[total >= 0 ? styles.textBalanceWhite : styles.textBalanceRed]}>{total.toFixed(2)} Р</Text>
        </View>
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
    backgroundColor: '#333333',
    justifyContent: 'space-around',
    width: '90%',
    flexDirection: 'row',
    borderRadius: 20,
    paddingVertical: 10,
  },
  textLabelBalance: {
    color: 'white',
    paddingLeft: 5,
  },
  textBalanceWhite: {
    color: 'white',
  },
  textBalanceRed: {
    color: 'red',
  },
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default TotalBalance;
