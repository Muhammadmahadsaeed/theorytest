import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../utils/colors';
import { Fonts } from '../../utils/fonts';
import { imagegallery } from '../../utils/images';

const CategoryList = ({ data, tag }) => {

    const navigation = useNavigation()


    const goToCategory = (data) => {
        navigation.navigate('care-giver', { ...data })
    }

    return (
        <TouchableOpacity
            style={styles.box}
            onPress={() => goToCategory(data)}
            activeOpacity={0.95}>
            <View style={styles.imgView}>
                <Image source={data?.image ? { uri: data?.image } : imagegallery} style={styles.img} />
            </View>
            <View style={styles.textView}>
                <Text style={styles.title} numberOfLines={3}>
                    {data?.name}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default CategoryList


const styles = StyleSheet.create({
    box: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 1,
        marginRight: 20,
        borderRadius: 16,
        paddingTop: 15,
        marginBottom: 5,
        height: 150,
        width: 105,
        backgroundColor: theme.bg,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    imgView: {
        height: 70,
        width: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        height: '100%',
        width: '100%'
    },
    textView: {
        flex: 1,
        marginTop: 8,
        alignItems: 'center',
        marginHorizontal: 10
    },
    title: {
        fontSize: 14,
        color: theme.textBlack,
        fontFamily: Fonts.bold,
        textAlign: 'center'
    },
    places: {
        fontSize: 14,
        color: theme.textBlack,
        fontFamily: Fonts.regular,
        textAlign: 'center'
    }
})