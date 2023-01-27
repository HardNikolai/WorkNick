import notifee, { RepeatFrequency, TimestampTrigger, TriggerType } from '@notifee/react-native';
import DatePicker from 'react-native-date-picker';
import {useDispatch, useSelector} from 'react-redux';
import { formingDateNotifee, formingTime } from '/utils/utilNatifee';
import { setStateActiveViewTime, setStateError, setStateErrorInput } from '/redux/stateConfig';
import {RootState} from '/redux/store';
import {
  changeDateTextNotifee,
  changeDateNotifee,
} from '/redux/userConfigSlice';

const BlockInstallTime = () => {
  const dispatch = useDispatch();
  const isNotification = useSelector((state: RootState) => state.config.config.isNotification);
  const dateTextNotifee = useSelector((state: RootState) => state.config.config.dateTextNotifee);
  const stateActiveViewTime = useSelector((state: RootState) => state.state.stateActiveViewTime);

  let dateNotifeeStore = useSelector((state: RootState) => state.config.config.dateNotifee);

  if (typeof dateNotifeeStore === 'string') {
    dateNotifeeStore = new Date(dateNotifeeStore);
  }

  if (dateTextNotifee.length === 0) {
    const timeNotifee = formingTime();
    dispatch(changeDateTextNotifee(timeNotifee));
  }

  const tosterErrorServer = () => {
    dispatch(setStateError(true));
    dispatch(setStateErrorInput(false));
    setTimeout(() => {
      dispatch(setStateError(false));
    }, 2000);
  };

  async function cancel() {
    try {
      await notifee.cancelAllNotifications();
    } catch {
      tosterErrorServer();
    }
  }

  async function onCreateTriggerNotification(dateStore: string) {
    const date = formingDateNotifee(dateStore);
    // Create a time-based trigger
    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(), // fire at 11:10am (10 minutes before meeting)
      repeatFrequency: RepeatFrequency.DAILY,
    };

    try {
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
    } catch {
      tosterErrorServer();
    }
  }

  const confirm = (date:Date) => {
    const timeNotifee = formingTime(date);
    dispatch(setStateActiveViewTime(!stateActiveViewTime));
    dispatch(changeDateTextNotifee(timeNotifee));
    dispatch(changeDateNotifee(date));

    if (isNotification) {
      onCreateTriggerNotification(timeNotifee);
    }
  };

  return (
    <DatePicker
      modal
      open={stateActiveViewTime}
      mode={'time'}
      date={dateNotifeeStore}
      onConfirm={confirm}
      onCancel={() => {
        cancel();
        dispatch(setStateActiveViewTime(!stateActiveViewTime));
      }}
    />
  );
};

export default BlockInstallTime;