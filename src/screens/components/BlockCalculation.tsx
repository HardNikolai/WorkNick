import {StyleSheet, Switch, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '/redux/store';
import {toggleIsStateCalculation} from '/redux/userConfigSlice';
import svg from '/assets/index_svg';

const BlockCalculation = () => {
  const {Group} = svg;
  const dispatch = useDispatch();
  const isCalculation = useSelector((state: RootState) => state.config.config.isStateCalculation);

  const toggleSwitchStateCalculation = () => {
    dispatch(toggleIsStateCalculation(!isCalculation));
  };

  return (
    <View style={styles.container}>
      <View style={styles.blockMain}>
        <View style={styles.blockInnerMain}>
          <Group />
          <Text style={styles.blockTextInnerMain}>
            Расчитывать остаток на конец месяца
          </Text>
        </View>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isCalculation ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitchStateCalculation}
          value={isCalculation}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#30444E',
  },
  blockMain: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  blockInnerMain: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  blockTextInnerMain: {
    marginLeft: 15,
    color: 'white',
    fontSize: 13,
    width: '70%',
  },
});

export default BlockCalculation;