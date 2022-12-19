import { useMemo, useState } from "react";
import { Text, View, Switch, TouchableOpacity, TextInput, Modal } from "react-native";
import AllTasks from "../mobx/AllTasks";
import ModalStore, { ITask } from "../mobx/ModalStore";

export const Task = ({ text, isCheck, id, date, dateTime }: ITask) => {
    const [isEnabled, setIsEnabled] = useState(isCheck);
    const [isCheckChangeFlag, setIsCheckChange] = useState(false);

    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
        setIsCheckChange(!isCheckChangeFlag);
    };

    const task = {
        text: text,
        isCheck: isEnabled,
        _id: id,
        date: date,
        dateTime: dateTime,
        id: ""
    };

    const styles = {
        blockDate: {
            color: "black",
            fontSize: 15,
            paddingTop: 10,
            paddingLeft: 20
        },
        blockText: {
            color: "black",
            fontSize: 25,
            paddingTop: 5,
            paddingLeft: 20,
            width: 250
        }
    };

    useMemo(() => {
        AllTasks.changeTask(task);
    }, [isCheckChangeFlag]);

    return (
        <>
            {
                isCheck ?
                    <>
                        <TouchableOpacity onLongPress={() => {
                            ModalStore.setTask(task);
                            ModalStore.changeFlagDelete();
                        }}>
                            <View style={{
                                backgroundColor: "gray",
                                marginTop: 10,
                                marginLeft: 10,
                                marginRight: 10,
                                borderRadius: 15,
                                paddingTop: 10,
                                paddingBottom: 10,
                                flex: 1,
                                flexDirection: "row",
                                justifyContent: "space-between"
                            }}>
                                <View>
                                    <Text style={styles.blockDate}>{date} {dateTime}</Text>
                                    <Text style={styles.blockText}>{text}</Text>
                                </View>
                                <View style={{ display: "flex", justifyContent: "center", paddingRight: 20 }}>
                                    <Switch
                                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                                        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={toggleSwitch}
                                        value={isEnabled}
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                    </>
                    :
                    <TouchableOpacity onPress={() => {
                        ModalStore.changeModalFlag()
                        ModalStore.setTask(task)
                    }} onLongPress={() => {
                        ModalStore.setTask(task);
                        ModalStore.changeFlagDelete();
                    }}>
                        <View style={{
                            backgroundColor: "white",
                            marginTop: 10,
                            marginLeft: 10,
                            marginRight: 10,
                            borderRadius: 15,
                            paddingTop: 10,
                            paddingBottom: 10,
                            flex: 1,
                            flexDirection: "row",
                            justifyContent: "space-between"
                        }}>
                            <View>
                                <Text style={styles.blockDate}>{date} {dateTime}</Text>
                                <Text style={styles.blockText}>{text}</Text>
                            </View>
                            <View style={{ display: "flex", justifyContent: "center", paddingRight: 20 }}>
                                <Switch
                                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={toggleSwitch}
                                    value={isEnabled}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
            }
        </>
    );
};