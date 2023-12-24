import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native'
import { theme } from '../../utils/colors';
import { AddProfileIcon, AvatarIcon, } from '../../utils/images';
import { Fonts } from '../../utils/fonts';
import { useNavigation } from '@react-navigation/native';

const ChatHeader = ({ text }) => {

    const navigation = useNavigation()


    return (
        <View style={styles.headerTop}>
            <TouchableOpacity
                activeOpacity={0.95}
                style={styles.menuBtn}
                onPress={() => navigation.navigate('Profile')}>
                <AvatarIcon svgStyle={styles.menuIcon} />
            </TouchableOpacity>
            <View style={styles.centerView}>
                <Text
                    style={styles.locationDes}
                    numberOfLines={1}
                    ellipsizeMode='tail'>
                    {text}
                </Text>
            </View>
            <View style={styles.right}>
                <TouchableOpacity
                    style={styles.bellIcon}
                    activeOpacity={0.95}
                    onPress={() => navigation.navigate('notification')}>
                    <AddProfileIcon />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ChatHeader

const styles = ({
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60,
        paddingHorizontal: 15,
        backgroundColor: theme.bg
    },
    menuBtn: {
        height: 55,
        width: 55,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    menuIcon: {
        height: 40,
        width: 40
    },
    centerView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        borderRadius: 10
    },
    locationDes: {
        fontSize: 16,
        fontFamily: Fonts.bold,
        color: theme.text,
    },
    right: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bellIcon: {
        height: 40,
        width: 40,
    },
})