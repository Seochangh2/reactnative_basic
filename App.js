import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, Vibration } from "react-native";

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 3 }}>
        <View style={{ flex: 1, backgroundColor: "tomato" }}></View>
        <View style={{ flex: 2, backgroundColor: "blue" }}></View>
        <View style={{ flex: 1, backgroundColor: "yellow" }}></View>
      </View>
      <View style={{ flex: 2 }}>
        <View style={{ flex: 1, backgroundColor: "tomato" }}></View>
        <View style={{ flex: 2, backgroundColor: "blue" }}></View>
        <View style={{ flex: 1, backgroundColor: "yellow" }}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
    color: "blue",
  },
});
