import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import { setStateDeleteCategory, setStateErrorServer } from '../../redux/stateConfig';
import {RootState} from '../../redux/store';
import { IPropsCategory } from '../interfaces/interfaces';
import {requestCategoryDelete} from '/api/requestDataCategory';
import svg from '/assets/index_svg';

const Category = ({item }: IPropsCategory) => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.user.dataUser.token);
  const stateDeleteCategory = useSelector((state: RootState) => state.state.stateDeleteCategory);

  const tosterErrorServer = () => {
    dispatch(setStateErrorServer(true));
    setTimeout(() => {
      dispatch(setStateErrorServer(false));
    }, 2000);
  };

  const deleteCategory = async () => {
    try {
      const res = await requestCategoryDelete(token, String(item.id + 1));
      if (res) {
        if (res.status === 200) {
          dispatch(setStateDeleteCategory(!stateDeleteCategory));
          return res;
        } else {
          dispatch(setStateDeleteCategory(!stateDeleteCategory));
          tosterErrorServer();
        }
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
            <TouchableOpacity
              onPress={deleteCategory}>
              <View style={styles.blockMainImageTrash}>
                <svg.Trash style={styles.imageTrash} />
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