import React from 'react';
import {
    View,
    SafeAreaView,
    StyleSheet
} from 'react-native';
import { theme } from '../../utils/colors';

const WrapperContainer1 = ({ children, style }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                {children}
            </View>
        </SafeAreaView>
    )
}

export default WrapperContainer1

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.bg,
    },
})