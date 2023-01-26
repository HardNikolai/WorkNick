import {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  setStateAddCategory,
  setStateErrorInput,
  setStateErrorServer,
  setStateSaveCategory,
} from '../../redux/stateConfig';
import {RootState} from '../../redux/store';
import {requestCategoryPost} from '/api/requestDataCategory';

const BlockAddNewCategory = () => {
  const dispatch = useDispatch();
  const [textInput, setTextInput] = useState('');

  const stateAddNewCategory = useSelector((state: RootState) => state.state.stateAddNewCategory);
  const stateSaveCategory = useSelector((state: RootState) => state.state.stateSaveCategory);
  const user = useSelector((state: RootState) => state.user.dataUser.user);
  const token = useSelector((state: RootState) => state.user.dataUser.token);

  const tosterErrorInput = () => {
    dispatch(setStateErrorInput(true));
    setTimeout(() => {
      dispatch(setStateErrorInput(false));
    }, 2000);
  };
  const tosterErrorServer = () => {
    dispatch(setStateErrorServer(true));
    setTimeout(() => {
      dispatch(setStateErrorServer(false));
    }, 2000);
  };

  const addCategory = async (nameCategory: string) => {
    try {
      if (nameCategory.length > 0) {
        const resPostRequest = await requestCategoryPost(
          token,
          nameCategory,
          user.profile.email,
        );
        if (!resPostRequest) {
          return;
        }
        if (resPostRequest.status === 200) {
          dispatch(setStateSaveCategory(!stateSaveCategory));
          return 200;
        } else {
          tosterErrorServer();
        }
      } else {
        tosterErrorInput();
      }
    } catch {
      dispatch(setStateSaveCategory(!stateSaveCategory));
      tosterErrorServer();
    }
  };

  const pushButton = (text: string) => {
    addCategory(text);
    setTextInput('');
    dispatch(setStateAddCategory(!stateAddNewCategory));
  };

  return (
    <View style={styles.container}>
      {stateAddNewCategory && (
        <View style={styles.blockAddNewCategory}>
          <View style={styles.blockMainNewCategory}>
            <View style={styles.blockInputNewCategory}>
              <TextInput
                onChangeText={setTextInput}
                placeholder="Название категории"
                placeholderTextColor={'#96A7AF'}
                style={styles.blockTextInputNameCategory}
              />
            </View>
            <View style={styles.blockButtonAddNewCategory}>
              <TouchableOpacity
                onPress={() => {
                  pushButton(textInput);
                }}>
                <View style={styles.mainButtonAddNewCategory}>
                  <Text style={styles.textButtonAddNewCategory}>Добавить</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  blockAddNewCategory: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '95%',
    bottom: 93,
  },
  blockInputNewCategory: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 20,
  },
  blockMainNewCategory: {
    flexDirection: 'column',
    backgroundColor: '#475E69',
    width: '90%',
    borderRadius: 20,
  },
  blockTextInputNameCategory: {
    width: '85%',
    backgroundColor: '#30444E',
    borderRadius: 10,
    paddingLeft: 10,
    color: 'white',
  },
  blockButtonAddNewCategory: {
    alignItems: 'center',
    marginBottom: 15,
  },
  mainButtonAddNewCategory: {
    backgroundColor: '#3DD598',
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButtonAddNewCategory: {
    fontSize: 20,
    fontStyle: 'italic',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

export default BlockAddNewCategory;