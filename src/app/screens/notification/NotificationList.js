import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { Fonts } from '../../utils/fonts';
import { theme } from '../../utils/colors';
import { NotificationRedIcon } from '../../utils/images';

const NotificationList = ({ }) => {
    return (
        <TouchableOpacity
            style={styles.box}
            activeOpacity={0.95}>
            <View style={styles.icon}>
                <NotificationRedIcon />
            </View>
            <View style={styles.textView}>
                <Text style={styles.title}>
                    The doctor has ended his consultation
                </Text>
                <Text style={styles.description}>
                    Your consultation is timed and finished, please rate us so we can serve you better!
                </Text>
            </View>

        </TouchableOpacity>
    )
}

export default NotificationList

const styles = StyleSheet.create({
    box: {
        backgroundColor: theme.bg,
        borderRadius: 16,
        marginTop: 40,
        marginHorizontal: 15,
        paddingHorizontal: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        
        elevation: 5,
    },
    icon: {
        position:'absolute',
        left: 15,
        top: -20,
        height: 44,
        width: 44
    },
    textView: {
        flex: 1,
        marginTop: 40
    },
    title: {
        fontFamily: Fonts.bold,
        fontSize: 16,
        color: theme.textBlack
    },
    description: {
        fontFamily: Fonts.medium,
        fontSize: 14,
        color: theme.textGray,
        marginBottom: 10
    }
})