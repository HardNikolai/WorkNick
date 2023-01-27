import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import svg from '/assets/index_svg';
import {makeApiTask} from '/api/requestDataUser';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '/redux/store';
import {
  clearTask,
  setCategories,
  setNameCategory,
  setTextAbout,
  setTextCount,
} from '/redux/sliceTask';
import {
  setStateChangeTask,
  setStateError,
  setStateErrorInput,
  setStateTask,
} from '/redux/stateConfig';
import {formingTask} from '/utils/utilInputNewTask';
import {URL_TRANSATION} from '/constants/index';

const ChangeTask = () => {
  const {ArrowDown, ArrowDownOff, ArrowUp, ArrowUpOff, HomeOn, Off, UserOff} = svg;
  const [stateListCategory, setStateListCategory] = useState(false);

  const dispatch = useDispatch();
  const dataCategories = useSelector(
    (state: RootState) => state.category.dataCategories.userCategories,
  );
  const token = useSelector((state: RootState) => state.user.dataUser.token);
  const storeTask = useSelector(
    (state: RootState) => state.dataTask.dataTask.task,
  );
  const stateTask = useSelector((state: RootState) => state.state.stateTask);
  const stateChangeTask = useSelector(
    (state: RootState) => state.state.stateChangeTask,
  );

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

  const change = async () => {
    try {
      if (
        storeTask.textAbout.trim().length === 0 ||
        storeTask.count.trim().length === 0
      ) {
        tosterErrorInput();
        throw new Error();
      }

      let {id, user, nameCategories, categories, count, textAbout} = storeTask;

      categories === 'TRUE' ? (categories = true) : (categories = false);

      const taskRequest = formingTask(
        Number(id),
        user,
        nameCategories,
        categories,
        count,
        textAbout,
      );
      const url =
        URL_TRANSATION +
        `${Number(id)}` +
        ':H' +
        `${Number(id)}` +
        '?access_token=' +
        `${token}` +
        '&valueInputOption=RAW';

      const res = await makeApiTask('PUT', url, taskRequest);

      if (res && res.status === 200) {
        dispatch(setStateTask(!stateTask));
      } else {
        dispatch(setStateTask(!stateTask));
        tosterErrorServer();
      }
    } catch {
      dispatch(setStateTask(!stateTask));
      tosterErrorServer();
    }
  };

  return (
    <View>
      {stateChangeTask && (
        <Modal transparent={true}>
          <View style={styles.container}>
            <View style={styles.blockChangeTask}>
              <View style={styles.blockMainChangeTask}>
                <View style={styles.blockImageCategoryTransaction}>
                  <View style={styles.blockMainImageCategory}>
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(setCategories('TRUE'));
                      }}>
                      {storeTask.categories === 'TRUE' ? (
                        <ArrowDown />
                      ) : (
                        <ArrowDownOff />
                      )}
                    </TouchableOpacity>
                    <Text style={styles.textImageCategory}>Расход</Text>
                  </View>
                  <View style={styles.blockMainImageCategory}>
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(setCategories('FALSE'));
                      }}>
                      {storeTask.categories === 'FALSE' ? (
                        <ArrowUp />
                      ) : (
                        <ArrowUpOff />
                      )}
                    </TouchableOpacity>
                    <Text style={styles.textImageCategory}>Приход</Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => setStateListCategory(!stateListCategory)}>
                  <View style={styles.blockSelectCategory}>
                    <View style={styles.blockMainSelectCategory}>
                      <Text style={styles.textSelectCategory}>
                        {storeTask.nameCategories}
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
                            dispatch(setNameCategory(item.name));
                            setStateListCategory(!stateListCategory);
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
                    onChangeText={e => dispatch(setTextCount(e))}
                    value={storeTask.count}
                    keyboardType="numeric"
                    placeholderTextColor={'#96A7AF'}
                    style={styles.textInput}
                  />
                </View>
                <View style={styles.blockInputTextAbout}>
                  <TextInput
                    onChangeText={e => dispatch(setTextAbout(e))}
                    value={storeTask.textAbout}
                    placeholderTextColor={'#96A7AF'}
                    style={styles.textInput}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => {
                    change();
                    dispatch(setStateChangeTask(false));
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
                onPress={() => {
                  dispatch(setStateChangeTask(false));
                  dispatch(clearTask());
                }}>
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
  blockChangeTask: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  blockMainChangeTask: {
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
    justifyContent: 'center',
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
export default ChangeTask;
