import { StyleSheet, Text, View } from "react-native";

const ErrorEnterScreen = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#2A3C44"
    }
  });

  return (
    <View style={styles.container}>
      <Text style={{ color: "white", fontSize: 25, fontWeight: "600" }}>Упс</Text>
      <Text style={{ color: "white", fontSize: 25, fontWeight: "600" }}>что-то сломалось</Text>
    </View>
  );
};

export default ErrorEnterScreen;