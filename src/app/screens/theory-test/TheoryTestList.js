import React, { useState, useRef, useCallback, useMemo } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';
import { theme } from '../../utils/colors';
import { Fonts } from '../../utils/fonts';
import {  ForwardEnIcon } from '../../utils/images';


const TheoryTestList = ({data, onClick }) => {

    return (
        <TouchableOpacity
            style={[styles.row, { ...data?.css }]}
            activeOpacity={0.95}
            onPress={() => onClick(data)}>
            <View style={styles.imgView}>
                {data?.icon}
            </View>
            <View style={styles.textView}>
                <Text style={styles.text}>
                    {data?.name}
                </Text>
                <Text style={styles.description}>
                    {data?.description}
                </Text>
            </View>
            <View style={styles.icon}>
                <ForwardEnIcon />
            </View>
        </TouchableOpacity>

    )
}

export default TheoryTestList

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.white,
        marginBottom: 15,
        borderRadius: 8,
        paddingVertical: 15,
        paddingHorizontal: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    textView: {
        flex: 1,
        marginLeft: 20
    },
    imgView: {
        height: 45,
        width: 45,
        backgroundColor: theme.white
    },
    text: {
        fontFamily: Fonts.bold,
        fontSize: 18,
        color: theme.skyBlue
    },
    description: {
        fontFamily: Fonts.medium,
        fontSize: 12,
        color: theme.grayShade1
    },
    icon: {
        height: 35,
        width: 35
    }
})