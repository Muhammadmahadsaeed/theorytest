import React from 'react';
import {
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import { theme } from '../../utils/colors';
import { Fonts } from '../../utils/fonts';

const Button = ({ title, onPress, disable, loading, selected = false }) => {

    return (
        <TouchableOpacity
            disabled={disable}
            style={styles.btn(selected)}
            activeOpacity={0.95}
            onPress={onPress}>
            {loading ?
                <ActivityIndicator color={theme.loadingWhite} size="small" />
                :
                <Text style={styles.btnText}>{title}</Text>
            }
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    btn: (is) => ({
        backgroundColor: theme.skyBlue,
        height: 50,
        width: '100%',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 500,
        opacity: !is ? 1 : 0.7 
    }),
    btnText: {
        fontFamily: Fonts.medium,
        fontSize: 16,
        color: theme.white
    }
})