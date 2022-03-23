import { StatusBar } from "expo-status-bar";
import * as Location from "expo-location";
import {
  ActivityIndicator,
  Dimensions,
  Button,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";

const SCREEN_WIDTH = Dimensions.get("window").width;
const API_KEY = "8091670c85df003e564d4365ea407b6b";
export default function App() {
  const [city, setCity] = useState("Loading ...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);
  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    setCity(location[0].city);
    const json = await (
      await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alert&appid=${API_KEY}&units=metric`
      )
    ).json();
    setDays(json.daily);
  };
  useEffect(() => {
    getWeather();
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar style="black" />
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator="false"
        contentContainerStyle={styles.weather}
      >
        {days.length === 0 ? (
          <View style={styles.day}>
            <ActivityIndicator
              color={"white"}
              size={"large"}
              style={{ justifyContent: "center", alignItems: "center" }}
            />
          </View>
        ) : (
          days.map((day, index) => (
            <View key={index} style={styles.day}>
              <Text style={styles.temp}>
                {parseFloat(day.temp.day).toFixed(1)}
              </Text>
              <Text style={styles.description}>{day.weather[0].main}</Text>
              <Text style={styles.tinyText}>{day.weather[0].description}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "plum",
  },
  city: {
    flex: 1,
    justifyContent: "center", // 세로
    alignItems: "center", //가로
  },
  cityName: {
    fontSize: 70,
    fontWeight: "500",
  },
  weather: {},
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center", //가로
  },
  temp: {
    marginTop: 50,
    fontSize: 158,
  },
  description: {
    marginTop: -20,
    fontSize: 100,
  },
});
