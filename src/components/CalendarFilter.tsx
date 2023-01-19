import { FlatList, Text, TouchableOpacity, View } from "react-native";
import StoreState from "../mobx/StoreState";
import Month from "./Month";
import ArrowRight from "../../assets/ArrowRight.svg";
import ArrowLeft from "../../assets/ArrowLeft.svg";
import { observer } from "mobx-react";
import StoreDate from "../mobx/StoreDate";
import { useMemo } from "react";
import Balance from "../mobx/Balance";

const CalendarFilter = observer(() => {
  const calendar = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

  const subYear = () => {
    const res = StoreDate.numYear - 1;
    StoreDate.setNumYear(res);
    StoreState.setStateChangeCalendar();
  };

  const addYear = () => {
    const res = StoreDate.numYear + 1;
    StoreDate.setNumYear(res);
    StoreState.setStateChangeCalendar();
  };

  const subtract = () => {
    const res = StoreDate.indexMonth - 1;
    if (res === -1) {
      StoreDate.setIndexMonth(11);
      StoreDate.setNumYear(StoreDate.numYear - 1);
      StoreState.setStateChangeCalendar();
    } else {
      StoreDate.setIndexMonth(res);
      StoreState.setStateChangeCalendar();
    };
  };

  const addition = () => {
    const res = StoreDate.indexMonth + 1;
    if (res === 12) {
      StoreDate.setIndexMonth(0);
      StoreDate.setNumYear(StoreDate.numYear + 1);
      StoreState.setStateChangeCalendar();
    } else {
      StoreDate.setIndexMonth(res);
      StoreState.setStateChangeCalendar();
    };
  };

  useMemo(() => {

  }, [Balance.forecast, Balance.forecast]);

  return (
    <>
      {
        StoreState.stateTouchDate ?
          <View style={{ alignItems: "center", height: 200 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", width: "100%", paddingVertical: 25 }}>
              <TouchableOpacity onPress={() => subYear()}>
                <ArrowLeft />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { StoreState.setStateTouchDate() }}>
                <Text style={{ color: "white", justifyContent: "center", alignItems: "center" }}>
                  {StoreDate.numYear}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { addYear() }}>
                <ArrowRight />
              </TouchableOpacity>
            </View>
            <FlatList
              data={calendar}
              numColumns={3}
              renderItem={
                ({ item, index }) => (
                  <Month item={item} index={index} month={StoreDate.indexMonth}></Month>
                )
              }
              keyExtractor={item => item}
              style={{ backgroundColor: "#465E69", height: "100%" }}
            />
          </View>
          :
          <>
            <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", width: "100%", paddingVertical: 25 }}>
              <TouchableOpacity onPress={() => subtract()}>
                <ArrowLeft />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => StoreState.setStateTouchDate()}>
                <Text style={{ color: "white", justifyContent: "center", alignItems: "center" }}>{calendar[StoreDate.indexMonth]}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => addition()}>
                <ArrowRight />
              </TouchableOpacity>
            </View>
          </>
      }
    </>
  );
});

export default CalendarFilter;