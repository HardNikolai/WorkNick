import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import BlockProfile from './components/BlockProfile';
import BlockNatifee from './components/BlockNatifee';
import BlockCalculation from './components/BlockCalculation';
import BlockButtonsHomeOff from './components/BlockButtonsHomeOff';
import BlockInstallTime from './components/BlockInstallTime';
import BlockSynchronization from './components/BlockSynchronization';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from 'src/navigation/RootStackParamList';

const ProfileScreen = () => {
  const navigation =
  useNavigation<
    NavigationProp<RootStackParamList, keyof RootStackParamList>
  >();
  return (
    <View style={styles.container}>
      <View style={styles.blockInnerContainer}>
        <View style={styles.blockMain}>
          <BlockProfile />
          <BlockNatifee />
          <BlockCalculation />
          <BlockInstallTime />
          <TouchableOpacity onPress={() => navigation.navigate('AddCatExpense')}>
            <View style={styles.blockButtonAddCategory}>
              <Text style={styles.textButtonAddCategory}>
                Добавить категорию расходов
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <BlockSynchronization />
      </View>
      <BlockButtonsHomeOff />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2A3C44',
  },
  blockInnerContainer: {
    width: '100%',
  },
  blockMain: {
    width: '100%',
    paddingTop: 20,
  },
  blockButtonAddCategory: {
    width: '100%',
    height: 30,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textButtonAddCategory: {
    color: 'white',
    fontSize: 20,
  },
});

export default ProfileScreen;