import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { theme, } from '../../utils/colors';
import Button from '../Buttons/Button';
import { Fonts } from '../../utils/fonts';
import { isObjEmpty } from '../../helper/helper';

const TheoryTestBottomSheet = ({ selectedItem, onCancel }) => {

    return (
        <View style={styles.container}>
            <View style={styles.headingView}>
                <Text />
                <Text style={styles.heading}>
                    {selectedItem?.name}
                </Text>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={onCancel}>
                    <Text style={styles.para}>
                        Cancel
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.upper}>
                <View style={styles.seperator} />
            </View>
        </View>
    )
}

export default TheoryTestBottomSheet

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: theme.bg,
        borderRadius: 15
    },
    headingView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
    heading: {
        fontFamily: Fonts.bold,
        fontSize: 20,
        color: theme.textBlack
    },
    para: {
        fontFamily: Fonts.medium,
        fontSize: 14,
        color: theme.darkGrey
    },
    upper: {
        flex: 1,
    },
    seperator: {
        height: 10
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText: {
        fontFamily: Fonts.medium,
        fontSize: 14,
        color: theme.textGray,
        marginLeft: 10
    },

    icon: {
        height: 24,
        width: 24
    }
})