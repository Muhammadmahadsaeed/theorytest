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
import { ChatQuestionIcon, TimeIcon } from '../../utils/images';

const ChatHistoryList = ({ goToChat }) => {
    return (
        <TouchableOpacity
            style={styles.box}
            activeOpacity={0.95}
            onPress={() => goToChat()}>
            <View style={styles.imgView}>
                <ChatQuestionIcon />
            </View>
            <View style={styles.textView}>
                <View style={styles.row}>
                    <Text style={styles.title}>
                        Question
                    </Text>
                    <View style={[styles.row, styles.timeView]}>
                        <View style={styles.timeIcon}>
                            <TimeIcon />
                        </View>
                        <Text style={styles.time}>
                            8:05 Am
                        </Text>
                    </View>
                </View>
                <Text style={styles.description}>
                    How would you like us to advise about your health?
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default ChatHistoryList

const styles = StyleSheet.create({
    box: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.bg,
        borderRadius: 16,
        marginTop: 20,
        padding: 10,
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
    imgView: {
        height: 76,
        width: 76,
        borderRadius: 10,
        backgroundColor:'pink'
    },
    textView: {
        flex: 1,
        marginLeft: 10
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontFamily: Fonts.bold,
        fontSize: 16,
        color: theme.text
    },
    timeView: {
        backgroundColor: theme.bgBlue,
        paddingHorizontal: 10,
        borderRadius: 6,
        paddingVertical: 2
    },
    timeIcon: {
        height: 12,
        width: 12
    },
    time: {
        fontFamily: Fonts.medium,
        fontSize: 12,
        color: theme.textBlue,
        marginLeft: 10
    },
    description: {
        fontFamily: Fonts.medium,
        fontSize: 14,
        color: theme.textGray,
        marginTop: 10
    }
})