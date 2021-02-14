import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';

import WeatherInfo from './src/components/WeatherInfo';
import UnitsPicker from './src/components/UnitsPicker';
import ReloadIcon from './src/components/ReloadIcon';
import WeatherDetails from './src/components/WeatherDetails';
import { colors } from './src/utils';
import { WEATHER_API_KEY } from 'react-native-dotenv';

const BASE_WEATHER_URL = 'http://api.openweathermap.org/data/2.5/weather?';

export default function App() {

  const [ errorMessage, setErrorMessage ] = useState(null);
  const [ currentWeather, setCurrentWeather ] = useState(null);
  const [ unitsSystem, setUnitsSystem ] = useState('metric');
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    load();
  }, [unitsSystem]);

  async function load() {
    setCurrentWeather(null);
    setErrorMessage(null);
    setIsLoading(true);
    try {
      const { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMessage('Access to location is needed to run this app!');
        return;
      }

      const location = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = location.coords;

      const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`;
      const response = await fetch( weatherUrl );
      const result = await response.json();    

      if (!response.ok) {
        setErrorMessage(result.message);
        return;
      }

      setCurrentWeather(result);
      setIsLoading(false);

    } catch(error) { 
      setErrorMessage(error.message); 
    }
  }

  if (errorMessage) {
    return (
      <View style={styles.container}>
        <ReloadIcon load={load}/>
        <Text style={{ textAlign: 'center'}}>{errorMessage}</Text>
        <StatusBar style="auto" />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator  size="large" color={colors.PRIMARY_COLOR}/>
        <StatusBar style="auto" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.main}>
        <UnitsPicker unitsSystem={unitsSystem} setUnitsSystem={setUnitsSystem}/>
        <ReloadIcon load={load}/>
        <WeatherInfo currentWeather={currentWeather} />
      </View>
      <WeatherDetails currentWeather={currentWeather} unitsSystem={unitsSystem}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  main: {
    flex: 1,
    justifyContent: 'center',
  }
});
