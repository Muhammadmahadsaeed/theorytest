import React, { memo, useState } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { theme } from '../../utils/colors';
import { Fonts } from '../../utils/fonts';
import { profile } from '../../utils/images';

const Messages = ({ myId, message }) => {

    const isMyMessage = () => {
        return message.senderId === myId;
    };

    return (
        <View style={styles.container(isMyMessage())}>
            <View style={styles.messageWrapper(isMyMessage())}>
                {!isMyMessage() ?
                    <View style={styles.imgView}>
                        <Image source={profile} style={styles.img} />
                    </View>
                    :
                    null
                }
                <View style={[styles.messageBox(isMyMessage())]}>
                    <Text style={[styles.message(isMyMessage())]}>
                        {message.message}
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default memo(Messages)

const styles = StyleSheet.create({
    container: (is) => ({
        alignItems: is ? 'flex-end' : 'flex-start',
    }),
    messageWrapper: (is) => ({
        flexDirection: 'row',
        justifyContent: is ? 'flex-end' : 'flex-start',
        alignItems: 'center',
        marginTop: 20,
        width: '60%'
    }),
    imgView: {
        height: 24,
        width: 24,
        borderRadius: 100
    },
    img: {
        height: '100%',
        width: '100%',
        borderRadius: 100
    },
    messageBox: (is) => ({
        marginLeft: 15,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: is ? 10 : 0,
        borderBottomRightRadius: is ? 0 : 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: is ? theme.buttonBgDark : theme.searchFieldBg
    }),
    message: (is) => ({
        fontSize: 14,
        fontFamily: Fonts.medium,
        color: is ? theme.textWhite : theme.text
    })
})