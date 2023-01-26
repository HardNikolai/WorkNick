import {Modal, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from 'src/redux/store';

const BlockErrorServer = () => {
  const stateErrorServer = useSelector((state: RootState) => state.state.stateErrorServer);
  return (
    <View>
      {stateErrorServer && (
        <Modal transparent={true}>
          <View style={styles.container}>
            <View style={styles.blockMain}>
              <Text style={styles.blockTextError}>Ошибка сервера</Text>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockMain: {
    backgroundColor: 'red',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockTextError: {
    color: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

export default BlockErrorServer;