import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    FlatList
} from 'react-native';
import { ExclamationWhiteIcon } from '../../utils/images';
import { Fonts } from '../../utils/fonts';
import { theme } from '../../utils/colors';

const VideoError = ({ }) => {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.iconView}>
                    <ExclamationWhiteIcon />
                </View>
                <Text style={styles.text}>
                    Can't play this video. Please try later
                </Text>
            </View>
        </View>
    )
}

export default VideoError

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center'
    },
    text: {
        fontFamily: Fonts.medium,
        color: theme.white,
        fontSize: 16
    }
})