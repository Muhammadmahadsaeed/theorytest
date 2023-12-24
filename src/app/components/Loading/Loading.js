import React from 'react';
import {
    View,
    ActivityIndicator
} from 'react-native';

export const Loading = ({ size, color }) => {
    return (
        <View style={styles.container}>
            <ActivityIndicator color={color} size={size} />
        </View>
    )
}

const styles = ({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})