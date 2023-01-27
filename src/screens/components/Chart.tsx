import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {useDispatch, useSelector} from 'react-redux';
import {setStateActiveChart} from '/redux/stateConfig';
import {RootState} from '/redux/store';

const Chart = () => {
  const screenWidth = Dimensions.get('window').width;

  const dispatch = useDispatch();
  const DataNumberInMonth = useSelector((state: RootState) => state.table.dataTable.DataNumberInMonth);
  const DataExpenseNumbersInMonth = useSelector((state: RootState) => state.table.dataTable.DataExpenseNumbersInMonth);

  const data = {
    labels: DataNumberInMonth,
    datasets: [
      {
        data: DataExpenseNumbersInMonth,
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  const stateActiveChart = useSelector((state: RootState) => state.state.stateActiveChart);

  return (
    <View>
      <View style={styles.main}>
        {stateActiveChart && (
          <View style={styles.container}>
            <Text style={styles.textChart}>График за текущий месяц</Text>
            <LineChart
              data={data}
              width={screenWidth}
              height={220}
              chartConfig={chartConfig}
              style={styles.blockChart}
            />
          </View>
        )}
        <TouchableOpacity onPress={() => dispatch(setStateActiveChart(!stateActiveChart))}>
          <Text style={styles.textChart}>
            {stateActiveChart ? 'Закрыть график' : 'Открыть график расходов'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  main: {
    width: '100%',
    alignItems: 'center',
  },
  textChart: {
    color: 'white',
    marginTop: 5,
  },
  blockChart: {
    marginTop: 10,
  },
});

export default Chart;
