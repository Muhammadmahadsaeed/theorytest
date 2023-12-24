import React from 'react';
import {
    Text,
    View,
} from 'react-native';
import { theme, } from '../../utils/colors';
import { Fonts } from '../../utils/fonts';


export const EmptyList = ({ text }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {text}
            </Text>
        </View>
    )
}



const styles = ({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: white
    },
    text: {
        fontSize: 20,
        fontFamily: Fonts.bold,
        color: theme.textBlack,
        textAlign: 'center'
    }
})