// This is the main page of my weather app that shows weather for user's location and additional cities. I've worked on it throughout the past few labs so my only new changes are the style sheet, new cities, and some cleanup (removed comments from starter code I didn't want). Finally, I added some comments to the stylesheet to explain what each item/style does.

import * as Location from 'expo-location';
import { router } from 'expo-router';
import * as Speech from 'expo-speech';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Index() {

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [cityWeatherList, setCityWeatherList] = useState<any[]>([]);

  const additionalCities = [ //added some more of my top 10 cities 
    { name: 'New York', latitude: 40.7128, longitude: -74.0060 },
    { name: 'Los Angeles', latitude: 34.0522, longitude: -118.2437 },
    { name: 'Chicago', latitude: 41.8781, longitude: -87.6298 },
    { name: 'Philadelphia', latitude: 39.9525, longitude: -75.1652 },
    { name: 'San Diego', latitude: 32.7157, longitude: -117.1611 },
    { name: 'Boston', latitude: 42.3555, longitude: -71.0565 },
    { name: 'Seattle', latitude: 47.6080, longitude: -122.3351 },
    { name: 'Miami', latitude: 25.7617, longitude: -80.1918 },
    { name: 'Nashville', latitude: 36.1744, longitude: -86.7679 },
    { name: 'Tokyo', latitude: 35.6528, longitude: -139.8394 },
    { name: 'Rochester', latitude: 43.1610, longitude: -77.6109 },
  ];

  const stopSpeaking = () => {
    Speech.stop();
  };

  const fetchWeather = async (latitude: number, longitude: number, cityName: string) => {
    const apiKey = 'd221245ce8c5645c193c540b0d08c729';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod === 200) {
        const cityWeather = {
          name: cityName,
          temp: `${data.main.temp}°F`,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
          humidity: `${data.main.humidity}%`,
          windSpeed: `${data.wind.speed} MPH`,
        };
        
        if (cityName === 'Your Location') {
          setCityWeatherList(prevList => [cityWeather]);
        } else {
          setCityWeatherList(prevList => [...prevList, cityWeather]);
        }
      } else {
        alert('Failed to fetch weather for');
      }
    } catch (error) {
      console.error('Error fetching weather data');
    }
  };

  useEffect(() => {
    const getLocationAndFetchWeather = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = currentLocation.coords;

      await fetchWeather(latitude, longitude, 'Your Location');

      additionalCities.forEach(city => {
        fetchWeather(city.latitude, city.longitude, city.name);
      });
    };

    getLocationAndFetchWeather();
  }, []);

  const speakWeather = (cityWeather: any) => {
    const message = `The weather in ${cityWeather.name} is ${cityWeather.description}, with temperature of ${cityWeather.temp}`;
    Speech.speak(message, {
    rate: 0.9, // Speed of speech 
    pitch: 1.0, // Pitch of voice 
  });
};

  return (
    <View style = { styles.container }>
      <Text style = { styles.headerText}>
        Weather in Your Location and Other Cities:
      </Text>

      {errorMsg ? (
        <Text>{errorMsg}</Text>
      ) : (
        <FlatList
          data={cityWeatherList}
          keyExtractor={(item) => item.name}
          showsVerticalScrollIndicator={false} // I did not like the scrolling bar so I nuked it
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: 'cityDetail' as any, // I had to use as any for some reason here - it may be an issue with expo-router types or my version.
                  params: { cityData: JSON.stringify(item) }, 
                })
              }
            >
              <View style = { styles.cityItem }>
                <Image
                  style={ styles.weatherIcon }
                  source={{ uri: `https://openweathermap.org/img/wn/${item.icon}.png` }}
                />
                <Text style = { styles.cityName }>{item.name}</Text>
                <Text style = { styles.temperature }>Temperature: {item.temp}</Text>
                <Text style = { styles.description }>Conditions: {item.description}</Text>

                <Button
                  title= "Speak Weather"
                  onPress={() => speakWeather(item)}
                />

                <Button title="🔇 Stop" onPress={stopSpeaking} />

              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({ //this is my style sheet for the main page of my app
  container: { // main screen
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
    backgroundColor: '#f5f5f5',
  },
  headerText: { // self explanatory
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2C3E50',
  },
  cityItem: { // box for each city
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    marginVertical: 6,
    borderRadius: 10,
    elevation: 5,
  },
  cityName: { // self explanatory
    fontSize: 22,
    fontWeight: 'bold',
    color: '#32a3e0ff',
  },
  temperature: { // self explanatory
    fontSize: 18,
    color: '#733de6ff',
  },
  description: { // self explanatory
    fontSize: 16,
    fontStyle: 'italic',
    color: '#046459ff',
  },
  weatherIcon: { // self explanatory
    width: 50,
    height: 50,
    marginVertical: 5,
  },
});