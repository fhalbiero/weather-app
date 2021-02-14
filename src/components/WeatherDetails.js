import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

import { colors } from '../utils';

const { PRIMARY_COLOR, SECONDARY_COLOR, BORDER_COLOR } = colors;


const WeatherDetails = ({currentWeather, unitsSystem}) => {
    const {
        main: { feels_like, pressure, humidity },
        wind: { speed },
    } = currentWeather;
  
    const windSpeed = unitsSystem === 'metric' ? `${Math.round(speed)} m/s` : `${Math.round(speed)} miles/h`;

    return (
        <View style={styles.weatherDetails}>
            <View style={styles.weatherDetailRow}>
                <View style={styles.weatherDetailBox}>
                    <View style={styles.weatherDetailRow}>
                        <FontAwesome5 name="temperature-low" size={25} color={PRIMARY_COLOR} />
                        <View>
                            <Text>Fells like</Text>
                            <Text style={styles.textSecondary}>{feels_like} °</Text>
                        </View> 
                    </View>           
                </View>
                <View style={styles.weatherDetailBox}>
                    <View style={styles.weatherDetailRow}>
                        <MaterialCommunityIcons name="water" size={30} color={PRIMARY_COLOR} />
                        <View>
                            <Text>Humidity</Text>
                            <Text style={styles.textSecondary}>{humidity} %</Text>
                        </View> 
                    </View>           
                </View>
            </View>

            <View style={styles.weatherDetailRow}>
                <View style={styles.weatherDetailBox}>
                    <View style={styles.weatherDetailRow}>
                        <MaterialCommunityIcons name="weather-windy" size={25} color={PRIMARY_COLOR} />
                        <View>
                            <Text>Wind speed</Text>
                            <Text style={styles.textSecondary}>{windSpeed}</Text>
                        </View> 
                    </View>           
                </View>
                <View style={styles.weatherDetailBox}>
                    <View style={styles.weatherDetailRow}>
                        <MaterialCommunityIcons name="speedometer" size={30} color={PRIMARY_COLOR} />
                        <View>
                            <Text>Pressure</Text>
                            <Text style={styles.textSecondary}>{pressure} hPa</Text>
                        </View> 
                    </View>           
                </View>
            </View>
        </View>
  )
}

const styles = StyleSheet.create({
    weatherDetails: {
        marginTop: 'auto',
        margin: 15,
    },
    weatherDetailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    weatherDetailBox: {
        flex: 1,
        padding: 20,
        borderWidth: 1,
        borderColor: BORDER_COLOR,
        borderRadius: 10,
    },
    weatherDetailItems: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    textSecondary: {
        fontSize: 15,
        color: SECONDARY_COLOR,
        fontWeight: '700',
        margin: 7
    }
})

export default WeatherDetails;