import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';
import { theme } from '../../utils/colors';
import { Fonts } from '../../utils/fonts';
import { imagegallery } from '../../utils/images';
import { capitalizeFirstLetter } from '../../helper/helper';
import { useNavigation } from '@react-navigation/native';

const DoctorList = ({ data, tag, isNews = false, goToNewScreen }) => {

    const navigation = useNavigation()

    const goToCategory = (data) => {
        if (isNews) {
            goToNewScreen(data)
            return
        } else {
            navigation.navigate('care-giver-detail', { ...data })
        }
    }

    return (
        <TouchableOpacity style={styles.box}
            activeOpacity={0.8}
            onPress={() => goToCategory(data)}>
            <View style={styles.imgView}>
                <Image source={data?.image ? { uri: data?.image } : imagegallery} style={styles.img} />
            </View>
            <View style={styles.textView}>
                <Text style={styles.title}>
                    Caregiver
                </Text>
                <Text style={styles.title} numberOfLines={3}>
                    {capitalizeFirstLetter(data?.name)}
                </Text>
            </View>
            <View style={styles.overlay} />
        </TouchableOpacity>
    )
}

export default DoctorList

const styles = StyleSheet.create({
    box: {
        flex: 1,
        margin: 1,
        marginRight: 20,
        borderRadius: 16,
        marginBottom: 5,
        height: 220,
        width: 176,
        backgroundColor: theme.bg,
    },
    overlay: {
        flex: 1,
        position: 'absolute',
        left: 0,
        top: 0,
        opacity: 0.2,
        borderRadius: 16,
        backgroundColor: 'rgba(0,0,0,0.9)',
        width: '100%',
        height: 220,
    },
    imgView: {
        height: 220,
        width: 176,
    },
    textView: {
        position: 'absolute',
        flex: 1,
        zIndex: 100,
        top: 20,
        marginHorizontal: 10
    },
    title: {
        fontSize: 16,
        color: theme.textWhite,
        fontFamily: Fonts.bold,
        textAlign: 'left'
    },
    img: {
        height: '100%',
        width: '100%',
        borderRadius: 16,
    },
})