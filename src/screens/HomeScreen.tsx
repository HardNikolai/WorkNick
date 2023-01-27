import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useEffect} from 'react';
import {RootState} from 'src/redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {makeApiTask} from '/api/requestDataUser';
import {
  changeAllData,
  changeAllDataMonth,
  changeAllDataUsers,
  changeDataExpenseNumbersInMonth,
  changeDataNumberInMonth,
  changeDateSynch,
} from '/redux/sliceData';
import {changeForecast, changeTotal} from '/redux/sliceBalance';
import {
  changeAllCategories,
  changeUserCategories,
} from '/redux/sliceCategory';
import {setTask} from '../redux/sliceTask';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {setToken} from '/redux/sliceUser';
import {makeApiCategory} from '/api/requestDataCategory';
import {
  forecastingBalance,
  getAllData,
  getDataAllCategory,
  getDataExpense,
  getDataNumberInMonth,
  getDataUser,
  getDataUserCategory,
  getDataUserInMonth,
  recalc,
} from '/utils/utilHomeScreen';
import {setStateError, setStateErrorInput} from '/redux/stateConfig';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from 'src/navigation/RootStackParamList';
import {IDataUser} from './interfaces/interfaces';
import componentsHomeScreen from './components/index/componentsHomeScreen';
import {
  URL_CATEGORY_GET,
  URL_TRANSATION_GET,
} from '/constants/index';

const HomeScreen = () => {
  const {
    Calendar,
    Chart,
    InputNewTask,
    ChangeTask,
    BlockError,
    BlockFilter,
    Task,
    BlockButtonsHomeOn,
  } = componentsHomeScreen;

  const navigation =
    useNavigation<
      NavigationProp<RootStackParamList, keyof RootStackParamList>
    >();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.dataUser.user);
  const allDataUsers = useSelector(
    (state: RootState) => state.table.dataTable.allDataUsers,
  );
  const stateTask = useSelector((state: RootState) => state.state.stateTask);
  const stateAddNewTask = useSelector(
    (state: RootState) => state.state.stateAddNewTask,
  );
  const dateSynch = useSelector(
    (state: RootState) => state.table.dataTable.dateSynch,
  );
  const stateDeleteCategory = useSelector(
    (state: RootState) => state.state.stateDeleteCategory,
  );
  const stateSaveCategory = useSelector(
    (state: RootState) => state.state.stateSaveCategory,
  );

  const tosterErrorServer = () => {
    dispatch(setStateError(true));
    dispatch(setStateErrorInput(false));
    setTimeout(() => {
      dispatch(setStateError(false));
    }, 2000);
  };

  const upDateAllData = async () => {
    try {
      const tokens = await GoogleSignin.getTokens();
      dispatch(setToken(tokens.accessToken));

      const urlTrans = URL_TRANSATION_GET + `${tokens.accessToken}`;
      const urlCategory = URL_CATEGORY_GET + `${tokens.accessToken}`;
      const resultRequestTransaction = await makeApiTask('GET', urlTrans);
      const resultRequestCategory = await makeApiCategory('GET', urlCategory);

      if (resultRequestTransaction && resultRequestTransaction.status === 200) {
        const dataAllTable = await getAllData(
          resultRequestTransaction.data.values,
        );
        dispatch(changeAllData(dataAllTable));

        const dataUser = await getDataUser(
          resultRequestTransaction.data.values,
          user.profile.email,
        );
        dispatch(changeAllDataUsers(dataUser));

        const dataUserMonth = getDataUserInMonth(dataUser);
        dispatch(changeAllDataMonth(dataUserMonth));
        dispatch(changeTotal(recalc(dataUserMonth)));
        dispatch(
          changeForecast(
            forecastingBalance(dataUserMonth, recalc(dataUserMonth)),
          ),
        );

        const arrayNumbersInMonth = getDataNumberInMonth();
        dispatch(changeDataNumberInMonth(arrayNumbersInMonth));
        const arrayExpenseInMonth = getDataExpense(dataUserMonth);
        dispatch(changeDataExpenseNumbersInMonth(arrayExpenseInMonth));
      } else {
        throw new Error();
      }

      if (resultRequestCategory && resultRequestCategory.status === 200) {
        const dataAllCategory = await getDataAllCategory(
          resultRequestCategory.data.values,
        );
        dispatch(changeDateSynch(new Date()));
        dispatch(changeAllCategories(dataAllCategory));

        const dataUserCategory = await getDataUserCategory(
          resultRequestCategory.data.values,
          user.profile.email,
        );
        dispatch(changeUserCategories(dataUserCategory));
      } else {
        throw new Error();
      }
    } catch {
      tosterErrorServer();
    }
  };

  const goToFilterTask = (item: IDataUser) => {
    navigation.navigate('FilterTask');
    dispatch(setTask(item));
  };

  useEffect(() => {
    upDateAllData();
  }, [
    stateAddNewTask,
    stateTask,
    dateSynch,
    stateDeleteCategory,
    stateSaveCategory,
  ]);

  return (
    <View style={styles.container}>
      <Calendar />
      <Chart />
      <InputNewTask />
      <ChangeTask />
      <BlockError />
      <BlockFilter />
      <FlatList
        data={allDataUsers}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => goToFilterTask(item)}>
            <Task task={item} />
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        style={styles.blockListTasks}
      />
      <BlockButtonsHomeOn />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#2A3C44',
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
  blockListTasks: {
    marginTop: 35,
    width: '90%',
  },
});

export default HomeScreen;