import notifee, { TimestampTrigger, TriggerType } from "@notifee/react-native";
import { observer } from "mobx-react";
import { useState } from "react";
import DatePicker from "react-native-date-picker";
import { useDispatch, useSelector } from "react-redux";
import StoreDate from "../mobx/StoreDate";
import StoreState from "../mobx/StoreState";
import { RootState } from "../redux/store";
import { changeDateTextNotifee, changeDateNotifee } from "../redux/userConfigSlice";

const BlockInstallTime = observer(() => {
  const [date, setDate] = useState(new Date());
  const isNotification = useSelector((state: RootState) => state.config.config.isNotification);

  let dateNotifeeStore = useSelector((state: RootState) => state.config.config.dateNotifee);
  if (typeof (dateNotifeeStore) === "string") {
    dateNotifeeStore = new Date(dateNotifeeStore);
  };

  async function cancel() {
    await notifee.cancelAllNotifications();
  };

  async function onCreateTriggerNotification() {
    const dateToday = new Date(Date.now());
    const date = new Date(Date.now());
    const dateNotifee = StoreDate.dateNotifee;
    const hourNotifee = Number(dateNotifee.slice(0, 2));
    const minutesNotifee = Number(dateNotifee.slice(3));

    date.setHours(hourNotifee);
    date.setMinutes(minutesNotifee);

    if (dateToday > date) {
      const newDayNotify = dateToday.getDate() + 1;
      date.setDate(newDayNotify);
    };

    // Create a time-based trigger
    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(), // fire at 11:10am (10 minutes before meeting)
    };

    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Create a trigger notification
    await notifee.createTriggerNotification(
      {
        title: 'Напоминание',
        body: 'Не забываем записывать расходы!',
        android: {
          channelId: channelId,
        },
      },
      trigger,
    );
  };

  const dateTextNotifee = useSelector((state: RootState) => state.config.config.dateTextNotifee);

  const dispatch = useDispatch();

  const setStoreDateTextNotifee = (date: string) => {
    dispatch(changeDateTextNotifee(date))
  };

  return (
    <>
      {
        dateTextNotifee != undefined ?
          <DatePicker
            modal
            open={StoreState.stateActiveViewTime}
            mode={"time"}
            date={dateNotifeeStore}
            onConfirm={(date) => {
              setDate(date);

              StoreState.setStateActiveViewTime();
              const hourNotifee = date.getHours();
              const minutesNotifee = date.getMinutes();

              let newHour = `${hourNotifee}`;
              if (hourNotifee < 10) {
                newHour = `0${hourNotifee}`;
              };

              let textMinutes = `${minutesNotifee}`;
              if (minutesNotifee < 10) {
                textMinutes = `0${minutesNotifee}`;
              };

              const timeNotifee = `${newHour}:${textMinutes}`;
              StoreDate.setDateNotifee(timeNotifee);

              setStoreDateTextNotifee(timeNotifee);
              dispatch(changeDateNotifee(date));

              if (isNotification) {
                cancel();
                onCreateTriggerNotification();
              };
            }}
            onCancel={() => {
              StoreState.setStateActiveViewTime();
            }}
          />
          :
          <DatePicker
            modal
            open={StoreState.stateActiveViewTime}
            mode={"time"}
            date={date}
            onConfirm={(date) => {
              setDate(date);
              StoreState.setStateActiveViewTime();
              const hourNotifee = date.getHours();
              const minutesNotifee = date.getMinutes();

              let newHour = `${hourNotifee}`;
              if (hourNotifee < 10) {
                newHour = `0${hourNotifee}`;
              };

              let textMinutes = `${minutesNotifee}`;
              if (minutesNotifee < 10) {
                textMinutes = `0${minutesNotifee}`;
              };

              const timeNotifee = `${newHour}:${textMinutes}`;
              setStoreDateTextNotifee(timeNotifee);
            }}
            onCancel={() => {
              StoreState.setStateActiveViewTime();
            }}
          />
      }
    </>
  );
});

export default BlockInstallTime;