import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import svg from '/assets/index_svg';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {
  setStateChangeTask,
  setStateErrorServer,
  setStateTask,
  setStateTextLength,
} from '../../redux/stateConfig';
import {requestTaskDelete} from '/api/requestDataUser';
import {setTask} from '../../redux/sliceTask';
import {IPropsTask} from '../interfaces/interfaces';

const Task = ({task}: IPropsTask) => {
  const dispatch = useDispatch();

  const stateTextLength = useSelector((state: RootState) => state.state.stateTextLength);
  const nameCategory = useSelector((state: RootState) => state.category.dataCategories.textSetCategory);
  const storeTask = useSelector((state: RootState) => state.dataTask.dataTask.task);
  const stateTask = useSelector((state: RootState) => state.state.stateTask);
  const token = useSelector((state: RootState) => state.user.dataUser.token);
  const month = useSelector((state: RootState) => state.data.data.month);
  const year = useSelector((state: RootState) => state.data.data.year);
  const monthOfTask: number = Number(task.date.slice(task.date.indexOf('.') + 1, 5)) - 1;
  const yearOfTask: number = Number(task.date.slice(task.date.indexOf('.') + 4));

  const tosterErrorServer = () => {
    dispatch(setStateErrorServer(true));
    setTimeout(() => {
      dispatch(setStateErrorServer(false));
    }, 2000);
  };

  const deleteTask = async () => {
    try {
      const id = Number(task.id);
      const res = await requestTaskDelete(token, id);

      if (!res) {
        tosterErrorServer();
        return;
      }
      if (res.status === 200) {
        dispatch(setStateTask(!stateTask));
        return res;
      } else {
        dispatch(setStateTask(!stateTask));
        tosterErrorServer();
      }
    } catch {
      tosterErrorServer();
    }
  };

  const checkTask =
    monthOfTask === month &&
    yearOfTask === year &&
    (nameCategory === task.nameCategories ||
      nameCategory === 'Выберете категорию');

  const checkStateTask = !stateTextLength && storeTask.id === task.id;

  return (
    <View>
      {checkTask && (
        <View style={styles.container}>
          <View style={styles.mainContainer}>
            <View style={styles.leftBlockContainer}>
              {task.categories === 'TRUE' ? <svg.ArrowDown /> : <svg.ArrowUp />}
              <View style={styles.blockDataTask}>
                <View style={styles.blockMainDataTask}>
                  {checkStateTask ? (
                    <Text style={styles.textAboutTask}>{task.textAbout}</Text>
                  ) : (
                    <Text numberOfLines={1} style={styles.textAboutTask}>
                      {task.textAbout}
                    </Text>
                  )}
                </View>
                {task.categories === 'TRUE' ? (
                  <Text style={styles.textPriceRed}>{task.count} Р</Text>
                ) : (
                  <Text style={styles.textPriceGreen}>{task.count} Р</Text>
                )}
              </View>
              {task.textAbout.length > 10 && (
                <TouchableOpacity
                  onPress={() => {
                    dispatch(setStateTextLength(!stateTextLength));
                    dispatch(setTask(task));
                  }}>
                  <svg.ArrowRight width={15} height={15} />
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity
              onPress={() => {
                dispatch(setTask(task));
                dispatch(setStateChangeTask(true));
              }}>
              <View style={styles.blockImagePancel}>
                <svg.Pen style={styles.blockImageIcon} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={deleteTask}>
              <View style={styles.blockImageTrash}>
                <svg.Trash style={styles.blockImageIcon} />
              </View>
            </TouchableOpacity>
            <View>
              <Text style={styles.textDate}>{task.date}</Text>
              <Text style={styles.textDate}>{task.dateTime}</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  mainContainer: {
    flexDirection: 'row',
    backgroundColor: '#333333',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    margin: 3,
  },
  leftBlockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  blockDataTask: {
    marginLeft: 10,
    marginRight: 10,
  },
  blockMainDataTask: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textAboutTask: {
    color: 'white',
    fontSize: 10,
    width: 50,
  },
  textPriceRed: {
    color: 'red',
    fontSize: 10,
  },
  textPriceGreen: {
    color: 'green',
    fontSize: 10,
  },
  textDate: {
    color: 'white',
    fontSize: 10,
  },
  blockImagePancel: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 10,
  },
  blockImageTrash: {
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 10,
  },
  blockImageIcon: {
    width: 32,
    height: 32,
  },
});
export default Task;