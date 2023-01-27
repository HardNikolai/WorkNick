import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import svg from '/assets/index_svg';
import {HEIGHT} from '/constants/index';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '/redux/store';
import {setStateTextLength} from '/redux/stateConfig';
import { IPropsTask } from '../interfaces/interfaces';

const OneTaskFilter = (props: IPropsTask) => {
  const {task} = props;
  const {ArrowDown, ArrowUp, ArrowRight} = svg;

  const dispatch = useDispatch();
  const stateTextLength = useSelector((state: RootState) => state.state.stateTextLength);
  const monthOfTask: number = Number(task.date.slice(task.date.indexOf('.') + 1, 5)) - 1;
  const yearOfTask: number = Number(task.date.slice(task.date.indexOf('.') + 4));
  const month = useSelector((state: RootState) => state.data.data.month);
  const year = useSelector((state: RootState) => state.data.data.year);
  const storeTask = useSelector((state: RootState) => state.dataTask.dataTask.task);

  const checkTask =
    monthOfTask === month &&
    yearOfTask === year &&
    storeTask.nameCategories === task.nameCategories;
  const checkArrow = stateTextLength && storeTask.id === task.id;

  return (
    <View>
      {checkTask && (
        <View style={styles.container}>
          <View style={styles.mainContainer}>
            <View style={styles.leftBlockContainer}>
              {task.categories === 'TRUE' ? <ArrowDown /> : <ArrowUp />}
              <View style={styles.blockDataTask}>
                <View style={styles.blockMainDataTask}>
                    <Text numberOfLines={Number(checkArrow)} style={styles.textAboutTask}>{task.textAbout}</Text>
                </View>
                  <Text style={[task.categories === 'TRUE' ? styles.textPriceRed : styles.textPriceGreen]}>{task.count} Р</Text>
              </View>
              {task.textAbout.length > 10 && (
                <TouchableOpacity
                  onPress={() => {
                    dispatch(setStateTextLength(!stateTextLength));
                  }}>
                  <ArrowRight width={15} height={15} />
                </TouchableOpacity>
              )}
            </View>
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
    height: HEIGHT,
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
});

export default OneTaskFilter;