import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { FlagIcon } from '../../utils/images';
import { Fonts } from '../../utils/fonts';
import { theme } from '../../utils/colors';

const PhoneInput = ({ onChangeText, state }) => {
    return (
        <KeyboardAvoidingView
            keyboardVerticalOffset={100}>
            <View style={styles.container}>
                <View style={styles.left}>
                    <View style={styles.icon}>
                        <FlagIcon />
                    </View>
                    <View style={styles.code}>
                        <Text style={styles.code}>
                            +971
                        </Text>
                    </View>
                    <View style={styles.seperator} />
                    <TextInput
                        style={styles.inputStyle}
                        placeholder='12345678'
                        keyboardType='phone-pad'
                        value={state['phone'] || ''}
                        onChangeText={text => onChangeText(text, 'phone')}
                        onFocus={() => console.log("========")}
                    />
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default PhoneInput

const styles = StyleSheet.create({
    container: {
        height: 44,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 16,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: theme.borderColor
    },
    left: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    icon: {
        height: 24,
        width: 24
    },
    code: {
        height: 44,
        marginHorizontal: 6,
        textAlignVertical: 'center',
        fontSize: 13,
        fontFamily: Fonts.medium,
        color: theme.textBlue,
        ...Platform.select({
            ios: {
                lineHeight: 44 // as same as height
            },
            android: {}
        })
    },
    seperator: {
        height: 24,
        width: 1,
        backgroundColor: theme.borderColor
    },
    inputStyle: {
        flex: 1,
        height: 44,
        paddingLeft: 7,
        fontSize: 16,
        fontFamily: Fonts.medium,
        color: theme.gray,
    }
})