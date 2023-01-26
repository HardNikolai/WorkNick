import {StyleSheet, Text, View} from 'react-native';

const ErrorEnterScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textLabel}>Упс</Text>
      <Text style={styles.textLabel}>что-то сломалось</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2A3C44',
  },
  textLabel: {
    color: 'white',
    fontSize: 25,
    fontWeight: '600',
  },
});

export default ErrorEnterScreen;