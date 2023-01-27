import {StyleSheet, Switch, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '/redux/store';
import {toggleIsNotification} from '/redux/userConfigSlice';
import svg from '/assets/index_svg';
import {
  setStateActiveViewTime,
  setStateError,
  setStateErrorInput,
} from '/redux/stateConfig';
import notifee, {
  RepeatFrequency,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';
import {formingDateNotifee, formingTime} from '/utils/utilNatifee';
import { useEffect } from 'react';

const BlockNatifee = () => {
  const {Tag} = svg;
  const time = formingTime();
  const dispatch = useDispatch();
  const isNotification = useSelector(
    (state: RootState) => state.config.config.isNotification,
  );
  const dateTextNotifee = useSelector(
    (state: RootState) => state.config.config.dateTextNotifee,
  );
  const stateActiveViewTime = useSelector(
    (state: RootState) => state.state.stateActiveViewTime,
  );

  const tosterErrorServer = () => {
    dispatch(setStateError(true));
    dispatch(setStateErrorInput(false));
    setTimeout(() => {
      dispatch(setStateError(false));
    }, 2000);
  };

  const toggleSwitchNotification = () => {
    dispatch(toggleIsNotification(!isNotification));
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

  useEffect(() => {
    if (isNotification) {
      onCreateTriggerNotification(dateTextNotifee);
    } else {
      cancel();
    }
  }, [isNotification]);

  return (
    <View style={styles.container}>
      <View style={styles.blockMainContainer}>
        <View style={styles.blockLabelNatifee}>
          <Tag style={styles.blockImageSignal} />
          <Text style={styles.textNatifee}>Напоминать ежедневно</Text>
        </View>
        <View>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isNotification ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitchNotification}
            value={isNotification}
          />
        </View>
      </View>
      <View style={styles.blockClock}>
        <View style={styles.blockLabelClock}>
          <Text style={styles.textLabelClock}>Время напоминания</Text>
        </View>
        <View style={styles.blockMainClock}>
          <TouchableOpacity
            onPress={() =>
              dispatch(setStateActiveViewTime(!stateActiveViewTime))
            }>
            <View style={styles.blockTextClock}>
              <Text style={styles.textClock}>
                {dateTextNotifee.length > 0 ? `${dateTextNotifee}` : `${time}`}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 30,
  },
  blockMainContainer: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: '#30444E',
  },
  blockLabelNatifee: {
    flexDirection: 'row',
  },
  blockImageSignal: {
    marginRight: 10,
  },
  textNatifee: {
    color: 'white',
    fontSize: 16,
  },
  blockClock: {
    width: '100%',
    paddingVertical: 10,
    backgroundColor: '#30444E',
  },
  blockLabelClock: {
    paddingHorizontal: 25,
  },
  textLabelClock: {
    color: 'white',
    fontSize: 16,
  },
  blockMainClock: {
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
  },
  blockTextClock: {
    width: '100%',
    backgroundColor: '#333333',
    height: 50,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 110,
    paddingVertical: 10,
  },
  textClock: {
    color: 'white',
    fontSize: 20,
  },
});

export default BlockNatifee;
