import React, { useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AppLogoIcon } from '../../utils/images'
import { theme } from '../../utils/colors';
import { Fonts } from '../../utils/fonts';

const SplashScreen = ({ navigation }) => {

    useEffect(() => {
        setTimeout(() => {
            // navigation.replace('getting')
        }, 1000);
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.imgView}>
                <AppLogoIcon svgStyle={styles.svgStyle} />
            </View>
            <Text style={styles.text}>
                Care Forever
            </Text>
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        height: hp('100%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    imgView: {
        height: 150,
        width: 150,
    },
    svgStyle: {
        height: 150,
        width: 150,

    },
    text: {
        fontSize: 20,
        fontFamily: Fonts.bold,
        color: theme.textBlack,
        textAlign: 'center'
    }
})