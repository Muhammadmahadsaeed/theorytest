import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { Fonts } from '../../utils/fonts';
import { theme } from '../../utils/colors';
import { VideoWhiteIcon } from '../../utils/images';

const ClipList = ({ data, onChangeVideo }) => {
    return (
        <TouchableOpacity
            style={styles.box}
            activeOpacity={0.8}
            onPress={() => onChangeVideo(data)}>
            <View style={styles.icon}>
                <Image source={{uri: data?.thumbnailUrl}} style={styles.img} />
                <View style={styles.svgIcon}>
                    <VideoWhiteIcon svgStyle={styles.svgStyle} />
                </View>
                <View style={styles.overlay}  />
            </View>
            <View style={styles.textView}>
                <Text style={styles.title} numberOfLines={1}>
                    The doctor has ended his consultation
                </Text>
                <Text style={styles.description} numberOfLines={1}>
                    Your consultation is timed and finished, please rate us so we can serve you better!
                </Text>
            </View>
           
        </TouchableOpacity>
    )
}

export default ClipList

const styles = StyleSheet.create({
    box: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.bg,
        marginHorizontal: 15,
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
    icon: {
        backgroundColor: 'green',
        height: 55,
        width: 80,
        borderRadius: 7
    },
    overlay: {
        flex: 1,
        position: 'absolute',
        height: 55,
        width: 80,
        borderRadius: 7,
        backgroundColor: 'rgba(0,0,0,.4)'
    },
    img: {
        height: '100%',
        width: '100%',
        borderRadius: 5
    },
    svgIcon: {
        height: 20,
        width: 20,
        position: 'absolute',
        bottom: 5,
        right: 5,
        zIndex: 100
    },
    svgStyle: {
        height: 20,
        width: 20
    },
    textView: {
        flex: 1,
        marginLeft: 15
    },
    title: {
        fontFamily: Fonts.medium,
        fontSize: 16,
        color: theme.black
    },
    description: {
        fontFamily: Fonts.medium,
        fontSize: 13,
        color: theme.grayShade1,
        marginBottom: 10
    }
})