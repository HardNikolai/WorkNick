import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {URL_CATEGORY_DELETE} from '/constants/index';
import {
  setStateDeleteCategory,
  setStateError,
  setStateErrorInput,
} from '/redux/stateConfig';
import {RootState} from '../../redux/store';
import {IPropsCategory} from '../interfaces/interfaces';
import {makeApiCategory} from '/api/requestDataCategory';
import svg from '/assets/index_svg';

const Category = ({item}: IPropsCategory) => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.user.dataUser.token);
  const stateDeleteCategory = useSelector(
    (state: RootState) => state.state.stateDeleteCategory,
  );
  const {Trash} = svg;

  const tosterErrorServer = () => {
    dispatch(setStateError(true));
    dispatch(setStateErrorInput(false));
    setTimeout(() => {
      dispatch(setStateError(true));
    }, 2000);
  };

  const deleteCategory = async () => {
    try {
      const url =
        URL_CATEGORY_DELETE +
        `${String(item.id + 1)}` +
        ':B' +
        `${String(item.id + 1)}` +
        ':clear?access_token=' +
        `${token}`;
      const res = await makeApiCategory('DELETE', url);
      if (res && res.status === 200) {
        dispatch(setStateDeleteCategory(!stateDeleteCategory));
        return res;
      } else {
        dispatch(setStateDeleteCategory(!stateDeleteCategory));
        tosterErrorServer();
      }
    } catch {
      tosterErrorServer();
    }
  };

  return (
    <View style={styles.container}>
      {item.name && (
        <View style={styles.blockMainCategory}>
          <Text style={styles.textCategory}>{item.name}</Text>
          <View style={styles.blockImageTrash}>
            <TouchableOpacity onPress={deleteCategory}>
              <View style={styles.blockMainImageTrash}>
                <Trash style={styles.imageTrash} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockMainCategory: {
    width: '80%',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  textCategory: {
    color: 'white',
    fontSize: 20,
    width: '65%',
  },
  blockImageTrash: {
    flexDirection: 'row',
  },
  blockMainImageTrash: {
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 10,
  },
  imageTrash: {
    width: 20,
    height: 20,
  },
});

export default Category;
