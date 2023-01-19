import { observer } from "mobx-react-lite";
import { useMemo } from "react";
import { Switch, Text, TouchableOpacity, View } from "react-native";
import Tag from "../../assets/Tag.svg";
import StoreDate from "../mobx/StoreDate";
import StoreState from "../mobx/StoreState";
import notifee, { RepeatFrequency, TimestampTrigger, TriggerType } from '@notifee/react-native';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { toggleIsNotification } from "../redux/userConfigSlice";


const BlockNatifee = observer(() => {
    const dispatch = useDispatch();
    const isNotification = useSelector((state: RootState) => state.config.config.isNotification);
    const dateTextNotifee = useSelector((state: RootState) => state.config.config.dateTextNotifee);

    const toggleSwitchNotification = () => {
        dispatch(toggleIsNotification(!isNotification));
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
            repeatFrequency: RepeatFrequency.DAILY
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

    const date = new Date();
    const hour = date.getHours();
    const minutes = date.getMinutes();

    let newHour = "";
    if (hour < 10) {
        newHour = `0${hour}`;
    } else {
        newHour = `${hour}`;
    };

    let newMinutes = "";
    if (minutes < 10) {
        newMinutes = `0${minutes}`;
    } else {
        newMinutes = `${minutes}`;
    };

    async function cancel() {
        await notifee.cancelAllNotifications();
    };

    const timeTask = `${newHour}:${newMinutes}`;

    useMemo(() => {
        if (isNotification) {
            onCreateTriggerNotification();
        } else {
            cancel();
        }
    }, [isNotification])

    return (
        <View style={{ marginVertical: 30 }}>
            <View style={{ paddingHorizontal: 25, paddingVertical: 15, flexDirection: "row", justifyContent: "space-between", width: "100%", backgroundColor: "#30444E" }}>
                <View style={{ flexDirection: "row" }}>
                    <Tag style={{ marginRight: 10 }} />
                    <Text style={{ color: "white", fontSize: 16 }}>
                        Напоминать ежедневно
                    </Text>
                </View>
                <View style={{}}>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isNotification ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => {
                            toggleSwitchNotification();
                        }}
                        value={isNotification}
                    />
                </View>
            </View>
            <View style={{ width: "100%", paddingVertical: 10, backgroundColor: "#30444E" }}>
                <View style={{ paddingHorizontal: 25 }}>
                    <Text style={{ color: "white", fontSize: 16 }}>Время напоминания</Text>
                </View>
                <View style={{ justifyContent: "center", width: "100%", alignItems: "center" }}>
                    {
                        dateTextNotifee.length > 0 ?
                            <TouchableOpacity onPress={() => StoreState.setStateActiveViewTime()}>
                                <View style={{ width: "100%", backgroundColor: "#333333", marginVertical: 10, justifyContent: "center", alignItems: "center", borderRadius: 10 , paddingHorizontal: 110, paddingVertical: 10}}>
                                    <Text style={{ color: "white", fontSize: 20 }}>{dateTextNotifee}</Text>
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => StoreState.setStateActiveViewTime()}>
                                <View style={{ width: "100%", backgroundColor: "#333333", height: 50, marginVertical: 10, justifyContent: "center", alignItems: "center", borderRadius: 10 }}>
                                    <Text style={{ color: "white", fontSize: 30 }}>{timeTask}</Text>
                                </View>
                            </TouchableOpacity>
                    }
                </View>
            </View>
        </View>
    );
});

export default BlockNatifee;