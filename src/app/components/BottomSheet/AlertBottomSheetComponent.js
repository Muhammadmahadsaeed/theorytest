import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { Fonts } from '../../utils/fonts';
import { ExclamationIcon } from '../../utils/images';
import { theme } from '../../utils/colors';

const AlertBottomSheetComponent = ({ onCancel, onConfirm }) => {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.imgView}>
                    <ExclamationIcon />
                </View>
                <View style={styles.textView}>
                    <Text style={styles.text}>
                        Are you sure?
                    </Text>
                    <Text style={styles.para}>
                        Once deleted, you will not be able to recover this imaginary file!
                    </Text>
                </View>
            </View>
            <View style={styles.btnView}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.btn1}
                    onPress={() => onCancel()}>
                    <Text style={styles.btnText1}>
                        Cancel
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.btn2}
                    onPress={() => onConfirm()}>
                    <Text style={styles.btnText2}>
                        Yes, Confirm
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


export default AlertBottomSheetComponent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgView: {
        height: 80,
        width: 80,
        alignSelf: 'center'
    },
    textView: {
        marginVertical: 15
    },
    text: {
        color: theme.black,
        fontSize: 18,
        fontFamily: Fonts.medium,
        textAlign: 'center'
    },
    para: {
        marginVertical: 20,
        color: theme.grayShade1,
        fontSize: 14,
        fontFamily: Fonts.medium,
        textAlign: 'center'
    },
    btnView: {
        marginBottom: 20,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    btn1: {
        flex: 1,
        backgroundColor: theme.borderGray,
        borderRadius: 8,
        paddingVertical: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    btnText1: {
        color: theme.black,
        fontSize: 16,
        fontFamily: Fonts.medium
    },
    btn2: {
        flex: 1,
        backgroundColor: theme.red,
        borderRadius: 8,
        paddingVertical: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText2: {
        color: theme.white,
        fontSize: 16,
        fontFamily: Fonts.medium
    }
})