import React from 'react'
import { View, StyleSheet, I18nManager, TouchableOpacity } from 'react-native'
import { BackIcon, BackIconArIcon } from '../../utils/images'
import { useNavigation } from '@react-navigation/native';
import { isNullRetNull } from '../../helper/helper';

const BackButton = ({ path }) => {
    const navigation = useNavigation();

    const goToBack = () => {
        if (path) {
            navigation.replace(`${path}`)
        } else {
            navigation.goBack()
        }
    }

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.back}
            onPress={() => goToBack()}>
            <View style={styles.backBtn}>
                {I18nManager.isRTL ? <BackIconArIcon /> : <BackIcon />}
            </View>
        </TouchableOpacity>
    )
}

export default BackButton



const styles = StyleSheet.create({
    back: {
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 10,
    },
    backBtn: {
        height: 25,
        width: 24,
    },
    img: {
        height: '100%',
        width: '100%'
    }
})