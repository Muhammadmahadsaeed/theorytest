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
import { CalenderIcon, ChatQuestionIcon, TimeIcon, news } from '../../utils/images';
import moment from 'moment';

const NewsCard = ({ data, goToChat }) => {
    return (
        <TouchableOpacity
            style={styles.box}
            activeOpacity={0.95}
            onPress={() => goToChat(data)}>
            <View style={styles.imgView}>
                <Image source={data?.image ? { uri: data?.image } : news} style={styles.bg} />
            </View>
            <View style={styles.textView}>
                <Text style={styles.title} numberOfLines={1}>
                    {data?.title}
                </Text>
                <Text style={styles.description} numberOfLines={1}>
                    Description here...
                </Text>
                <View style={styles.row}>
                    <View style={styles.row}>
                        <View style={styles.icon}>
                            <CalenderIcon />
                        </View>
                        <Text style={styles.dateText}>
                            {moment(data?.date, 'YYYY-MM-DD').format('DD/MM/YYYY')}
                        </Text>
                    </View>
                    <View style={styles.timeView}>
                        <Text style={styles.time}>
                            News
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default NewsCard

const styles = StyleSheet.create({
    box: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.bg,
        borderRadius: 16,
        marginTop: 10,
        marginBottom: 5,
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
    },
    bg: {
        height: '100%',
        width: '100%',
        borderRadius: 10,
    },
    textView: {
        flex: 1,
        marginLeft: 10
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    icon: {
        height: 16,
        width: 16
    },
    dateText: {
        flex: 1,
        marginLeft: 10,
        fontFamily: Fonts.medium,
        fontSize: 12,
        color: theme.gray
    },
    title: {
        flex: 1,
        fontFamily: Fonts.bold,
        fontSize: 16,
        color: theme.text
    },
    timeView: {
        backgroundColor: theme.bgBlue,
        paddingHorizontal: 5,
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
        flex: 1,
        fontFamily: Fonts.medium,
        fontSize: 14,
        color: theme.textGray,
        marginTop: 5,
        marginBottom: 10
    }
})