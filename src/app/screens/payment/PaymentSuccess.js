import React, { useState, useCallback, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ScrollView,
} from 'react-native';
import { CalendarPurpleIcon, CalenderCircleIcon, CheckIcon } from '../../utils/images';
import { Fonts } from '../../utils/fonts';
import { theme } from '../../utils/colors';
import { TouchableOpacity } from 'react-native';
import Button from '../../components/Buttons/Button';
import CheckBoxComponent from '../../components/CheckBox/CheckBox';
import { checkIsNum } from '../../helper/helper';
import WrapperContainer1 from '../../components/Wrapper/WrapperContainer1';

const PaymentSuccess = ({ navigation, route }) => {

    let { params } = route || {}

    const goToHome = () => {
        navigation.replace('home-screen', { screen: 'Home' })
    }


    return (
        <WrapperContainer1>
            <View style={styles.container}>
                <View style={styles.icon}>
                    <CheckIcon />
                </View>
                <View style={styles.textView}>
                    <Text style={styles.heading}>
                        Payment Successful
                    </Text>
                    <Text style={styles.para}>
                        Your appointment has been requested
                    </Text>
                </View>
                <View style={styles.card}>
                    <View style={styles.left}>
                        <Text style={styles.text0}>
                            Payment code
                        </Text>
                        <View style={styles.cardRow}>
                            <CalendarPurpleIcon svgStyle={styles.svgStyle} />
                            <Text style={styles.text01}>
                                1 schedule
                            </Text>
                        </View>
                        <Text style={styles.text02}>
                            Total:{" "}
                            <Text style={styles.text03}>
                                AED {checkIsNum(params?.price * params?.hours)}
                            </Text>
                        </Text>
                    </View>
                    <View style={styles.right}>
                        <Text style={styles.text02}>
                            {params?.name}
                        </Text>
                        <TouchableOpacity
                            style={styles.btn}
                            activeOpacity={0.8}>
                            <Text style={styles.btnText}>
                                Paid
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.box}>
                    <Text style={styles.boxText}>
                        If you have any problem or any issue and you need to change your booking, Please call 03 123 4567
                    </Text>
                </View>
                <View style={styles.checkBoxView}>
                    <CheckBoxComponent handleOnChange={() => console.log("=======")} />
                    <View style={styles.row}>
                        <Text style={styles.text02}>
                            Add To Calendar
                        </Text>
                    </View>
                </View>
                <View style={styles.bottom}>
                    <Button
                        title={"Back To Home"}
                        onPress={goToHome}
                    />
                </View>
            </View>
        </WrapperContainer1>
    )

}

export default PaymentSuccess

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 15,
        justifyContent: 'center'
    },
    icon: {
        height: 106,
        width: 106,
        alignSelf: 'center'
    },
    textView: {
        alignItems: 'center',
        marginVertical: 20
    },
    heading: {
        fontFamily: Fonts.bold,
        color: theme.textBlack,
        fontSize: 24
    },
    para: {
        fontFamily: Fonts.medium,
        color: theme.textGray1,
        fontSize: 16,
        marginTop: 10
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center',
        borderRadius: 16,
        padding: 15,
        backgroundColor: theme.bg,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    cardRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10
    },
    text0: {
        fontSize: 14,
        fontFamily: Fonts.medium,
        color: theme.textGray
    },
    text01: {
        fontSize: 12,
        fontFamily: Fonts.medium,
        color: theme.gray,
        marginLeft: 10
    },
    svgStyle: {
        height: 14,
        width: 14
    },
    text02: {
        fontSize: 14,
        fontFamily: Fonts.medium,
        color: theme.textBlack,
    },
    text03: {
        fontSize: 16,
        fontFamily: Fonts.bold,
        color: theme.textBlack,
        // fontWeight: '700'
    },
    right: {
        // flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    btn: {
        backgroundColor: 'rgba(29, 164, 158, 0.35)',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 94,
        height: 31
    },
    btnText: {
        fontSize: 12,
        color: theme.textBlack,
        fontFamily: Fonts.bold,
        // fontWeight: '700'
    },
    box: {
        backgroundColor: 'rgba(255, 192, 70, 0.10)',
        borderWidth: 1,
        borderColor: theme.yellow,
        borderRadius: 8,
        padding: 20,
        marginTop: 25,
        marginHorizontal: 20
    },
    boxText: {
        fontFamily: Fonts.medium,
        fontSize: 14,
        color: theme.textBlack,
        textAlign: 'center'
    },
    checkBoxView: {
        flexDirection: 'row',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: theme.silverBorder,
        height: 48,
        alignItems: 'center',
        paddingHorizontal: 15,
        marginTop: 50
    },
    row: {
        flex: 1,
        alignItems: 'center'
    },
    bottom: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingVertical: 20
    }
})