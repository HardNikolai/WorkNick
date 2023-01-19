import { observer } from "mobx-react";
import { Dimensions, Text, TouchableOpacity } from "react-native";
import { LineChart } from "react-native-chart-kit";
import DataTable from "../mobx/DataTable";
import StoreState from "../mobx/StoreState";

const Chart = observer(() => {
  const screenWidth = Dimensions.get("window").width;

  const data = {
    labels: DataTable.DataNumberInMonth,
    datasets: [
      {
        data: DataTable.DataExpenseNumbersInMonth,
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ]
  };
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };
  return (
    <>
      {
        StoreState.stateActiveChart ?
          <>
            <Text style={{ color: "white", marginTop: 5 }}>График за текущий месяц</Text>
            <LineChart
              data={data}
              width={screenWidth}
              height={220}
              chartConfig={chartConfig}
              style={{ marginTop: 10 }}
            />
            <TouchableOpacity onPress={() => StoreState.setStateActiveChart()}>
              <Text style={{ color: "white", marginTop: 5 }}>Закрыть график</Text>
            </TouchableOpacity>
          </>
          :
          <TouchableOpacity onPress={() => StoreState.setStateActiveChart()}>
            <Text style={{ color: "white", marginTop: 5 }}>Открыть график расходов</Text>
          </TouchableOpacity>

      }
    </>
  );
});

export default Chart;