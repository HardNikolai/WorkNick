import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {changeDateSynch} from '/redux/sliceData';
import svg from '/assets/index_svg';
import {RootState} from 'src/redux/store';

const BlockSynchronization = () => {
  const dispatch = useDispatch();
  const date = useSelector((state: RootState) => state.table.dataTable.dateSynch);
  const {Play, Bitmap} = svg;
  return (
    <View style={styles.container}>
      <View style={styles.blockMainContainer}>
        <View style={styles.blockImageLogo}>
          <Bitmap />
        </View>
        <View style={styles.blockTextSynchronization}>
          <Text style={styles.textLogoSynchronization}>Синхронизация</Text>
          <Text
            style={
              styles.textLastSynchronization
            }>{`Последняя синхронизация ${date}`}</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => dispatch(changeDateSynch(new Date))}>
            <Play />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  blockMainContainer: {
    backgroundColor: '#286053',
    width: '90%',
    borderRadius: 10,
    flexDirection: 'row',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blockImageLogo: {
    width: 59,
    height: 57,
    backgroundColor: '#3DD598',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  blockTextSynchronization: {
    marginHorizontal: 10,
  },
  textLogoSynchronization: {
    color: '#3DD598',
  },
  textLastSynchronization: {
    color: '#3DD598',
    fontSize: 10,
  },
});

export default BlockSynchronization;