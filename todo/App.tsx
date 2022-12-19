import * as React from 'react';
import { FlatList, TextInput, Text, View, StyleSheet, Image, TouchableOpacity, Modal, StatusBar } from "react-native";
import PostBlockButton from './src/components/PostBlockButton';
import { observer } from "mobx-react-lite";
import ButtonView from "./src/mobx/ButtonView";
import InputText from './src/mobx/InputText';
import AllTasks from "./src/mobx/AllTasks";
import OnScroll from "./src/mobx/OnScroll";
import { Task } from "./src/components/Task";
import ModalStore, { ITask } from './src/mobx/ModalStore';

const styles = StyleSheet.create({
    body: {
        height: "100%",
        backgroundColor: "#444444",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    blockInput: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "70%",
        backgroundColor: "#475E69",
        paddingTop: 15,
        paddingBottom: 15,
        margin: "2%",
        borderRadius: 15,
    },
    blockTextInput: {
        width: "70%",
        marginBottom: 15,
        paddingBottom: 15,
        paddingLeft: 15,
        paddingTop: 15,
        backgroundColor: "#30444E",
        borderRadius: 15,
        color: "white",
    },
    blockButtonSave: {
        width: "85%",
        backgroundColor: "#40DF9F",
        alignItems: "center",
        paddingBottom: 15,
        paddingTop: 15,
        borderRadius: 15,
    },
    blockTextButton: {
        fontStyle: "italic"
    }
});

const App = observer(() => {
    const isButton = ButtonView.isButton;
    const allTasks = AllTasks.Tasks;

    const setTask = () => {
        let dateDay:string|number = new Date().getDate();
        let dateMonth:string|number = new Date().getMonth() + 1;
        let dateHour:string|number = new Date().getHours();
        let dateMinutes:string|number = new Date().getMinutes();

        if (dateDay < 10) {
            dateDay = `0${dateMinutes}`;
        };

        if (dateMonth < 10) {
            dateMonth = `0${dateMonth}`;
        };

        if (dateHour < 10) {
            dateHour = `0${dateHour}`;
        };

        if (dateMinutes < 10) {
            dateMinutes = `0${dateMinutes}`;
        };

        const dateToday = `${dateDay}.${dateMonth}`;
        const dateTime = `${dateHour}:${dateMinutes}`;

        const task = {
            text: InputText.InputText,
            isCheck: false,
            date: dateToday,
            dateTime: dateTime,
            id: "",
            _id: ""
        };

        return task
    };

    let textTask = "";

    const addNewTask = (task:ITask) => {
        for (let i = 0; i < allTasks.length; i++) {
            if (allTasks[i]._id === task._id) {
                allTasks[i].text = InputText.InputText;
                AllTasks.changeTask(allTasks[i]);
                ModalStore.changeFlagViewChangeTask();
                InputText.clearText();
            };
        };
    };

    React.useEffect(() => {
        AllTasks.getAllTask();
    }, []);

    React.useMemo(() => {
        textTask = ModalStore.task.text;
    }, [ModalStore.task])

    return (
        <View>
            <View style={styles.body}>
                <FlatList
                    data={allTasks}
                    renderItem={
                        ({ item }) => (
                            <Task text={item.text} isCheck={item.isCheck} id={item._id} date={item.date} dateTime={item.dateTime} _id={item._id} />
                        )
                    }
                    keyExtractor={item => item.text}
                    style={{ marginTop: 35 }}
                    onScroll={(e) => OnScroll.changePosition(e.nativeEvent.contentOffset.y)}
                />
                <View>
                    {
                        isButton ?
                            Number(OnScroll.position) < 1 ?
                                <PostBlockButton />
                                :
                                <></>
                            :
                            <View style={{ backgroundColor: "none" }}>
                                <View style={styles.blockInput}>
                                    <TextInput
                                        style={styles.blockTextInput}
                                        placeholder="Введите название задачи"
                                        autoFocus={true}
                                        placeholderTextColor={"#475E69"}
                                        onChange={(e) => InputText.changeInputText(e)}
                                        onBlur={() => {
                                            ButtonView.changeIsButton();
                                            InputText.clearText();
                                        }} />
                                    <TouchableOpacity style={styles.blockButtonSave} onPress={() => {
                                        AllTasks.addNewTask(setTask());
                                        ButtonView.changeIsButton();
                                        InputText.clearText();
                                    }}>
                                        <Text style={styles.blockTextButton}>
                                            Сохранить
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <PostBlockButton />
                            </View>
                    }
                </View>
                {
                    ModalStore.isFlagChange ?
                        <Modal transparent={true}>
                            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                                <View style={{ backgroundColor: "lightgray", padding: 20, borderRadius: 10, marginBottom: 70 }}>
                                    <Text style={{ fontStyle: "italic", fontSize: 25 }}>Окно редактирования</Text>
                                    <TextInput
                                        style={{
                                            padding: 10,
                                            backgroundColor: "white",
                                            borderRadius: 10,
                                            marginTop: 10,
                                            marginBottom: 10
                                        }}
                                        autoFocus={true}
                                        onChange={(e) => InputText.changeInputText(e)}
                                    >{textTask}</TextInput>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <TouchableOpacity onPress={() => ModalStore.changeModalFlag()
                                        }>
                                            <View style={{ borderRadius: 10, backgroundColor: "red", padding: 10 }}>
                                                <Text style={{ fontSize: 20, color: "white" }}>Отмена</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={async () => {
                                            if (InputText.InputText.length === 0) {
                                                ModalStore.changeModalFlag();
                                            } else {
                                                ModalStore.changeModalFlag();
                                                addNewTask(ModalStore.task);
                                            };
                                        }}>
                                            <View style={{ borderRadius: 10, backgroundColor: "green", padding: 10 }}>
                                                <Text style={{ fontSize: 20, color: "white" }}>Изменить</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                        :
                        <></>

                }
                {
                    ModalStore.isFlagDelete ?
                        <Modal transparent={true}>
                            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                                <View style={{ backgroundColor: "white", padding: 20, borderRadius: 10, marginBottom: 70 }}>
                                    <Text style={{ fontStyle: "italic", fontSize: 25 }}>Подтвердите удаление задачи {textTask}</Text>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingTop: 10 }}>
                                        <TouchableOpacity onPress={() => {
                                            ModalStore.changeFlagDelete()
                                        }}>
                                            <View style={{ borderRadius: 10, backgroundColor: "red", padding: 10 }}>
                                                <Text style={{ fontSize: 20, color: "white" }}>Отмена</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                            AllTasks.deleteTask(ModalStore.task);
                                            ModalStore.changeFlagDelete();
                                        }}>
                                            <View style={{ borderRadius: 10, backgroundColor: "green", padding: 10, width: 100, alignItems: 'center' }}>
                                                <Text style={{ fontSize: 20, color: "white" }}>Да</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                        :
                        <></>
                }
                {
                    ModalStore.isViewAdd ?
                        <Modal transparent={true}>
                            <View style={{ flex: 1, alignItems: "center", justifyContent: "flex-end", marginBottom: 200, marginLeft: 10, marginRight: 10 }}>
                                <View style={{ backgroundColor: "lightgreen", borderRadius: 10, width: "100%", paddingBottom: 30, paddingTop: 30, alignItems: "center" }}>
                                    <Text style={{ fontSize: 20, fontStyle: "italic" }}>ЗАПИСЬ ДОБАВЛЕНА</Text>
                                </View>
                            </View>
                        </Modal>
                        :
                        <></>
                }
                {
                    ModalStore.isFlagError ?
                        <Modal transparent={true}>
                            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", marginLeft: 10, marginRight: 10 }}>
                                <View style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: "rgb(255, 118, 118)",
                                    borderRadius: 10,
                                    width: "100%",
                                    paddingBottom: 30,
                                    paddingTop: 30,
                                }}>
                                    <View style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}>
                                        <TouchableOpacity>
                                            <Image source={require("./assets/Tag.png")} style={{ width: 50, height: 50 }} />
                                        </TouchableOpacity>
                                        <Text style={{ fontSize: 20, fontStyle: "italic", marginLeft: 50, marginRight: 50, color: "white" }}>Ошибка</Text>
                                        <TouchableOpacity onPress={() => ModalStore.changeFlageError()}>
                                            <Image source={require("./assets/Off.png")} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ paddingTop: 20 }}>
                                        <Text style={{ fontSize: 15, color: "white" }}>В даный момент сервер не доступен</Text>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                        :
                        <></>
                }
                {
                    ModalStore.isFlagViewDeleteTask ?
                        <>
                            <Modal transparent={true}>
                                <View style={{ flex: 1, alignItems: "center", justifyContent: "flex-end", marginBottom: 200, marginLeft: 10, marginRight: 10 }}>
                                    <View style={{ backgroundColor: "lightgreen", borderRadius: 10, width: "100%", paddingBottom: 30, paddingTop: 30, alignItems: "center" }}>
                                        <Text style={{ fontSize: 20, fontStyle: "italic" }}>ЗАПИСЬ УДАЛЕНА</Text>
                                    </View>
                                </View>
                            </Modal>
                        </>
                        :
                        <></>
                }
                                {
                    ModalStore.isFlagViewChangeTask ?
                        <>
                            <Modal transparent={true}>
                                <View style={{ flex: 1, alignItems: "center", justifyContent: "flex-end", marginBottom: 200, marginLeft: 10, marginRight: 10 }}>
                                    <View style={{ backgroundColor: "lightgreen", borderRadius: 10, width: "100%", paddingBottom: 30, paddingTop: 30, alignItems: "center" }}>
                                        <Text style={{ fontSize: 20, fontStyle: "italic" }}>ЗАПИСЬ ИЗМЕНЕНА</Text>
                                    </View>
                                </View>
                            </Modal>
                        </>
                        :
                        <></>
                }
            </View>
            <StatusBar />
        </View>
    );
});

export default App;