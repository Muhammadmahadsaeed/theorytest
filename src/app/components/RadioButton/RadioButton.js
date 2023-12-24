import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import { theme } from '../../utils/colors';
import { Fonts } from '../../utils/fonts';
import { VisaIcon, VoucherIcon } from '../../utils/images';

const RadioButton = ({ onPress, selected, name, icon, isLast, isIcon, customStyle }) => {

    const getIcon = (type) => {

        if (type?.toLowerCase() == 'cash') {
            return <VoucherIcon svgStyle={styles.svgStyle} />
        } else {
            return <VisaIcon svgStyle={styles.svgStyle} />
        }
    }

    return (
        <TouchableOpacity
            activeOpacity={1}
            style={[styles.row(isLast), { ...customStyle }]}
            onPress={onPress}>
            <View style={styles.left}>
                {isIcon ?
                    <View style={styles.icon}>
                        {getIcon(icon)}
                    </View>
                    :
                    null
                }
                <View>
                    <Text style={styles.name}>
                        {name}
                    </Text>
                    <Text style={styles.num}>
                        **** **** **** 9812
                    </Text>
                </View>
            </View>
            <View style={styles.radioButton}>
                {selected ? <View style={styles.radioButtonIcon} /> : null}
            </View>
        </TouchableOpacity>
    );
};

export default RadioButton

const styles = ({
    row: (is) => ({
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 10,
        marginVertical: 5,
        marginHorizontal: 5,
        borderRadius: 8,
        backgroundColor: theme.bg,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    }),
    left: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        borderWidth: 1,
        borderColor: theme.silverBorder,
        height: 44,
        width: 69,
        marginRight: 10,
        justifyContent:'center',
        alignItems:'center'
    },
    svgStyle: {
        height: 24,
        width: 24
    },
    img: (color) => ({
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
        tintColor: color && theme.black
    }),
    name: {
        color: theme.black,
        fontFamily: Fonts.medium,
        fontSize: 16,
    },
    num: {
        color: theme.textGray,
        fontFamily: Fonts.medium,
        fontSize: 14,
    },

    radioButton: {
        height: 24,
        width: 24,
        borderRadius: 50,
        borderWidth: 1.5,
        borderColor: theme.buttonBg,
        alignItems: "center",
        justifyContent: "center"
    },
    radioButtonIcon: {
        height: 14,
        width: 14,
        borderRadius: 10,
        backgroundColor: theme.buttonBg
    },
    radioButtonText: {
        fontSize: 16,
        marginLeft: 16
    },
    text: {
        lineHeight: 30,
        fontSize: 20,
        marginVertical: 5
    }
})