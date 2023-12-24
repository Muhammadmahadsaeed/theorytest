import React from 'react';
import {
    View,
    SafeAreaView,
    StyleSheet
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { theme } from '../../utils/colors';

const WrapperContainer = ({ children, style }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                {children}
            </View>
        </SafeAreaView>
    )
}

export default WrapperContainer

const styles = StyleSheet.create({
    container: {
        height: hp('100%'),
        backgroundColor: theme.bg,
    },
})