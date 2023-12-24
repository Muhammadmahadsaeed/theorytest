import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';
import { Fonts } from '../../utils/fonts';
import { theme } from '../../utils/colors';
import { PinBlueIcon, StarIcon, profile } from '../../utils/images';
import { TouchableOpacity } from 'react-native';

const UserCards = ({ data, onPress }) => {
    return (
        <TouchableOpacity
            style={[styles.row0]}
            activeOpacity={0.95}
            onPress={onPress}>
            <View style={styles.imageView}>
                <Image source={profile} style={styles.img} />
            </View>
            <View style={styles.content}>
                <View style={styles.row01}>
                    <View style={styles.left}>
                        <Text style={styles.text00}>
                            Linda B. Johnson
                        </Text>
                    </View>
                    <View style={styles.right}>
                        <Text style={styles.distance}>
                            28 May 2023
                        </Text>
                    </View>
                </View>
                <View style={styles.ratingView}>
                    <View style={styles.icon}>
                        <StarIcon />
                    </View>
                    <Text style={styles.ratingText}>
                        4.5 (834)
                    </Text>
                </View>
                <Text style={styles.text1} numberOfLines={2}>
                    Linda is really good and Caring. 
                </Text>
            </View>
        </TouchableOpacity>
    )

}

export default UserCards

const styles = StyleSheet.create({
    row0: {
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.bg,
        borderRadius: 16,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    imageView: {
        height: 92,
        width: 92,
        backgroundColor: 'pink',
        borderRadius: 16,
    },
    img: {
        height: '100%',
        width: '100%',
        borderRadius: 16,
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginLeft: 10,
    },
    text00: {
        fontSize: 16,
        fontFamily: Fonts.bold,
        color: theme.text
    },
    text1: {
        fontSize: 14,
        fontFamily: Fonts.medium,
        color: theme.gray,
    },
    row01: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    left: {
        flex: 1,
    },
    icon: {
        height: 13,
        width: 13
    },
    ratingView: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 5
    },
    ratingText: {
        fontSize: 12,
        fontFamily: Fonts.medium,
        color: theme.textGray,
        marginLeft: 5
    },
    right: {
        backgroundColor: theme.bgBlue,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 6
    },
    distance: {
        fontSize: 12,
        fontFamily: Fonts.medium,
        color: theme.textBlue,
    }
})