// This is my city detail page for more in depth weather information. Kept some original starter code comments because I was confused initially. For the homework, I added the style sheet and enhanced the structure of the detail page to make it look better. I also added comments to the style sheet to explain what each item/style does.

import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function CityDetail() {

  // Use useLocalSearchParams to get the serialized cityData parameter
  const { cityData } = useLocalSearchParams<{ cityData: string }>();

  // If cityData is undefined or null, return a fallback message
  if (!cityData) return <Text>No city data available</Text>;
  
  // Parse cityData since it's passed as a JSON string
  const parsedCityData = JSON.parse(cityData);

  return ( 
    <View style = { styles.detailContent }> 
      <View style = { styles.card }>
        <Text style = { styles.cityName }>{parsedCityData.name}</Text>
        <Image
          style = { styles.weatherIcon }
          source={{
            uri: `https://openweathermap.org/img/wn/${parsedCityData.icon}@4x.png`
          }}
        />
        <Text style = { styles.temperature }>{parsedCityData.temp}</Text>
        <Text style = { styles.description }>{parsedCityData.description}</Text>
        <View style = { styles.detailsContainer }>
          <View style = { styles.smallView }>
            <Text style = { styles.detailLabel }>Humidity:</Text>
            <Text style = { styles.detailValue }>{parsedCityData.humidity}</Text>
          </View>
          <View style = { styles.smallView }>
            <Text style = { styles.detailLabel }>Wind Speed:</Text>
            <Text style = { styles.detailValue }>{parsedCityData.windSpeed}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({ //this is my style sheet for the detail page of my app
  detailContent: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: { // holder of all the detail info
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  cityName: { // self explanatory
    fontSize: 32,
    fontWeight: 'bold',
    color: '#32a3e0ff',
    marginBottom: 10,
  },
    weatherIcon: { // self explanatory
    width: 200,
    height: 200,
    marginVertical: 10,
  },
  temperature: { // self explanatory
    fontSize: 48,
    fontWeight: 'bold',
    color: '#32a3e0ff',
    marginVertical: 5,
  },
  description: { // short description of weather conditions
    fontSize: 24,
    color: '#32a3e0ff',
    marginBottom: 20,
    textTransform: 'capitalize',
  },
  detailsContainer: { // for windspeed and humidity
    width: '100%',
    marginTop: 20,
  },
  detailLabel: { // windspeed and humidity text
    fontSize: 18,
    color: '#32a3e0ff',
  },
  detailValue: { // windspeed and humidity text
    fontSize: 18,
    fontWeight: '500',
    color: '#32a3e0ff',
  },
  smallView: { // smaller boxes for windspeed and humidity
  backgroundColor: '#e8f6ff',
  borderRadius: 12,
  padding: 15,
  marginVertical: 8,
  alignItems: 'center',
  elevation: 4,
},
});