import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils';

// import { Container } from './styles';

const ReloadIcon = ({load}) => {
    const reloadIcon = Platform.OS === 'ios' ? 'ios-refresh' : 'md-refresh';

    return (
        <View style={styles.reloadIcon} >
            <Ionicons 
                onPress={load}
                name={reloadIcon} 
                size={24} 
                color={colors.PRIMARY_COLOR} 
            />
        </View> 
    )
}

const styles = StyleSheet.create({
    reloadIcon: {
        position: 'absolute',
        ...Platform.select({
            ios: {
                top: -30,
            },
            android: {
                top: 45
            }
        }),
        right: 20
    }
})

export default ReloadIcon;