import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useState} from 'react';
import svg from '/assets/index_svg';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '/redux/store';
import {
  setStateAddNewTask,
  setStateError,
  setStateErrorInput,
  setStateListCategory,
} from '/redux/stateConfig';
import {makeApiTask} from '/api/requestDataUser';
import {setTextListCategory} from '/redux/sliceCategory';
import {formingTask} from '/utils/utilInputNewTask';
import {URL_TRANSATION_POST} from '/constants/index';

const InputNewTask = () => {
  const {ArrowDown, ArrowDownOff, ArrowUp, ArrowUpOff, HomeOn, Off, UserOff} = svg;
  const [textAmount, setTextAmount] = useState('');
  const [textAbout, setTextAbout] = useState('');
  const [stateIconExpense, setStateIconExpense] = useState(true);
  const [stateIconAddition, setStateIconAddition] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.dataUser.user);
  const dataCategories = useSelector(
    (state: RootState) => state.category.dataCategories.userCategories,
  );
  const textCategory = useSelector(
    (state: RootState) => state.category.dataCategories.textCategory,
  );
  const stateAddNewTask = useSelector(
    (state: RootState) => state.state.stateAddNewTask,
  );
  const stateListCategory = useSelector(
    (state: RootState) => state.state.stateListCategory,
  );
  const allData = useSelector(
    (state: RootState) => state.table.dataTable.allData,
  );
  const token = useSelector((state: RootState) => state.user.dataUser.token);

  const tosterErrorInput = () => {
    dispatch(setStateError(true));
    dispatch(setStateErrorInput(true));
    setTimeout(() => {
      dispatch(setStateError(false));
      dispatch(setStateErrorInput(false));
    }, 2000);
  };
  const tosterErrorServer = () => {
    dispatch(setStateError(true));
    dispatch(setStateErrorInput(false));
    setTimeout(() => {
      dispatch(setStateError(false));
    }, 2000);
  };

  const addFunction = async (
    id: number,
    user: string,
    nameCategory: string,
    category: boolean,
    count: string,
    textAbout: string,
  ) => {
    const task = formingTask(
      id,
      user,
      nameCategory,
      category,
      count,
      textAbout,
    );
    try {
      const url = URL_TRANSATION_POST + `${token}` + '&valueInputOption=RAW';
      await makeApiTask('POST', url, task);
      dispatch(setTextListCategory('Выберете категорию'));
      setTextAbout('');
      setTextAmount('');
    } catch {
      tosterErrorServer();
    }
  };

  const addNewTask = () => {
    if (
      textCategory === 'Выберете категорию' ||
      textAmount === '' ||
      textAbout === ''
    ) {
      tosterErrorInput();
      return;
    }

    if (allData.length != 0) {
      addFunction(
        Number(allData.length + 1),
        user.profile.email,
        textCategory,
        stateIconExpense,
        textAmount,
        textAbout,
      );
    } else {
      const newId: number = 1;
      addFunction(
        newId,
        user.profile.email,
        textCategory,
        stateIconExpense,
        textAmount,
        textAbout,
      );
    }
  };

  const changeStateIcon = () => {
    setStateIconExpense(!stateIconExpense);
    setStateIconAddition(!stateIconAddition);
  };

  return (
    <View>
      {stateAddNewTask && (
        <Modal transparent={true}>
          <View style={styles.container}>
            <View style={styles.blockAddNewTask}>
              <View style={styles.blockMainAddNewTask}>
                <View style={styles.blockImageCategoryTransaction}>
                  <TouchableOpacity onPress={() => changeStateIcon()}>
                    <View style={styles.blockMainImageCategory}>
                      {stateIconExpense ? (
                        <ArrowDown />
                      ) : (
                        <ArrowDownOff />
                      )}
                      <Text style={styles.textImageCategory}>Расход</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => changeStateIcon()}>
                    <View style={styles.blockMainImageCategory}>
                      {stateIconAddition ? <ArrowUp /> : <ArrowUpOff />}
                      <Text style={styles.textImageCategory}>Приход</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    dispatch(setStateListCategory(!stateListCategory))
                  }>
                  <View style={styles.blockSelectCategory}>
                    <View style={styles.blockMainSelectCategory}>
                      <Text style={styles.textSelectCategory}>
                        {textCategory}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
                {stateListCategory && (
                  <View style={styles.blockListCategories}>
                    <FlatList
                      data={dataCategories}
                      renderItem={({item}) => (
                        <TouchableOpacity
                          onPress={() => {
                            dispatch(setTextListCategory(item.name));
                            dispatch(setStateListCategory(!stateListCategory));
                          }}>
                          <Text style={styles.textListCategories}>
                            {item.name}
                          </Text>
                        </TouchableOpacity>
                      )}
                      keyExtractor={item => `${item.id}`}
                      style={styles.blockMainListCategories}
                    />
                  </View>
                )}
                <View style={styles.blockHorizontalLine} />
                <View style={styles.blockInputPrice}>
                  <TextInput
                    keyboardType="numeric"
                    onChangeText={e => setTextAmount(e)}
                    placeholder="Сумма"
                    placeholderTextColor={'#96A7AF'}
                    style={styles.textInput}
                  />
                </View>
                <View style={styles.blockInputTextAbout}>
                  <TextInput
                    onChangeText={e => setTextAbout(e)}
                    placeholder="Описание"
                    placeholderTextColor={'#96A7AF'}
                    style={styles.textInput}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => {
                    addNewTask();
                    dispatch(setStateAddNewTask(!stateAddNewTask));
                  }}>
                  <View style={styles.blockButtonSave}>
                    <View style={styles.blockMainButtonSave}>
                      <Text style={styles.textButtonSave}>Сохранить</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.blockButton}>
              <HomeOn width={19} height={19} />
              <TouchableOpacity
                onPress={() => dispatch(setStateAddNewTask(!stateAddNewTask))}>
                <View style={styles.blockCancelButton}>
                  <Off />
                </View>
              </TouchableOpacity>
              <UserOff width={19} height={19} />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    flex: 1,
  },
  blockAddNewTask: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  blockMainAddNewTask: {
    flexDirection: 'column',
    backgroundColor: '#475E69',
    width: '90%',
    borderRadius: 20,
  },
  blockImageCategoryTransaction: {
    flexDirection: 'row',
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 40,
    justifyContent: 'space-between',
  },
  blockMainImageCategory: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textImageCategory: {
    color: 'white',
    paddingLeft: 10,
  },
  blockSelectCategory: {
    alignItems: 'center',
  },
  blockMainSelectCategory: {
    backgroundColor: '#333333',
    width: '50%',
  },
  textSelectCategory: {
    paddingLeft: 10,
    fontSize: 18,
    color: 'white',
  },
  blockListCategories: {
    alignItems: 'center',
  },
  blockMainListCategories: {
    backgroundColor: '#333333',
    marginBottom: 10,
    width: '50%',
  },
  textListCategories: {
    margin: 7,
    fontSize: 18,
    color: 'white',
    paddingLeft: 3,
  },
  blockHorizontalLine: {
    backgroundColor: '#B8C2C0',
    height: 3,
  },
  blockButton: {
    borderWidth: 1,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    flexDirection: 'row',
    backgroundColor: '#30444E',
    paddingHorizontal: 15,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockInputPrice: {
    alignItems: 'center',
    paddingTop: 10,
  },
  textInput: {
    width: '85%',
    backgroundColor: '#30444E',
    borderRadius: 10,
    paddingLeft: 10,
    color: 'white',
  },
  blockInputTextAbout: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 40,
  },
  blockButtonSave: {
    alignItems: 'center',
    marginBottom: 15,
  },
  blockMainButtonSave: {
    backgroundColor: '#3DD598',
    width: '80%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButtonSave: {
    fontSize: 20,
    fontStyle: 'italic',
    paddingVertical: 10,
  },
  blockCancelButton: {
    marginLeft: 45,
    marginRight: 45,
  },
});
export default InputNewTask;
