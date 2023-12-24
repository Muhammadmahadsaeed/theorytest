import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { theme } from '../../utils/colors';
import { Fonts } from '../../utils/fonts';

const ShareModalList = ({ data }) => {
    return (
        <View style={styles.reviewCard}>
            <View style={styles.imgView}>
                {data.icon}
            </View>
            <View style={styles.footerText}>
                <Text style={styles.text0}>
                    {data.name}
                </Text>
            </View>
        </View>
    )
}

export default ShareModalList

const styles = StyleSheet.create({
    reviewCard: {
        flex: 1,
        marginHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.bg,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
        borderRadius: 8,
        marginVertical: 15,
        height: 45
    },
    imgView: {
        height: 40,
        width: 40,
        position: 'absolute',
        top: -15,
        left: 10
    },
    footerText: {
        left: 50
    },
    text0: {
        position: 'relative',
        fontFamily: Fonts.medium,
        color: theme.textGray,
        fontSize: 12,

    },
})