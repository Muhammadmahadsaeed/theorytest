import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';
import { Fonts } from '../../utils/fonts';
import { theme } from '../../utils/colors';
import { AppointmentTypeIcon, CalenderCircleIcon, profile } from '../../utils/images';
import moment from 'moment';
import { checkIsNum, floatToTime } from '../../helper/helper';

const AppointmentList = ({ data }) => {

    return (
        <View style={styles.container}>
            <View style={styles.headingView}>
                <Text style={styles.title}>
                    Booking Ref.
                </Text>
                <Text style={styles.num}>
                    {data?.name}
                </Text>
            </View>
            <View style={styles.box}>
                <View style={styles.row}>
                    <View style={styles.iconView}>
                        <CalenderCircleIcon />
                    </View>
                    <View style={styles.textView}>
                        <Text style={styles.text0}>
                            Date & Time
                        </Text>
                        <Text style={styles.text1}>
                            {moment(data?.appointment_date, 'YYYY-MM-DD').format('dddd, DD MMM YYYY')}
                        </Text>
                        <Text style={styles.text2}>
                            {floatToTime(data?.booking_start_time)} - {floatToTime(data?.booking_end_time)}
                        </Text>
                    </View>

                </View>
                <View style={styles.seperator} />
                <View style={styles.row}>
                    <View style={styles.iconView}>
                        <AppointmentTypeIcon />
                    </View>
                    <View style={styles.textView}>
                        <Text style={styles.text0}>
                            Appointment Type
                        </Text>
                        <Text style={styles.text1}>
                            Mother & Baby Services
                        </Text>
                        <Text style={styles.text2}>
                            Nanny
                        </Text>
                    </View>

                </View>
            </View>
            <View style={styles.headingView}>
                <Text style={styles.title0}>
                    Caregiver Info
                </Text>
            </View>
            <View style={[styles.row0]}>
                <View style={styles.imageView}>
                    <Image source={profile} style={styles.img} />
                </View>
                <View style={styles.textView}>
                    <Text style={styles.text00}>
                        Linda B. Johnson
                    </Text>
                    <Text style={styles.text1}>
                        Feeding | Baby Massage
                    </Text>
                </View>

            </View>
            <View style={styles.priceView}>
                <Text style={styles.title}>
                    Total: <Text style={styles.price}>
                        AED {checkIsNum(data?.payment_lines[0]?.amount)}
                    </Text>
                </Text>
                <View style={styles.btn}>
                    <Text style={styles.btnText}>
                        paid
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default AppointmentList

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        padding: 15,
        marginTop: 15,
        width: '90%',
        alignSelf: 'center',
        borderRadius: 16,
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
    headingView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    priceView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 30
    },
    btn: {
        height: 32,
        borderRadius: 10,
        paddingHorizontal: 15,
        backgroundColor: theme.buttonBgBlue,
        justifyContent: 'center',
        alignItems: 'center',
    },
    price: {
        fontSize: 16,
        fontFamily: Fonts.bold,
        color: theme.buttonBgDark,
    },
    btnText: {
        fontSize: 12,
        fontFamily: Fonts.bold,
        color: theme.textBlack,
        textTransform: 'uppercase'
    },
    title: {
        fontSize: 16,
        fontFamily: Fonts.medium,
        color: theme.textGray
    },
    num: {
        fontSize: 16,
        fontFamily: Fonts.medium,
        color: theme.text
    },
    box: {
        backgroundColor: theme.softGray,
        borderRadius: 12,
        paddingHorizontal: 15,
        marginTop: 15
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 20
    },
    row0: {
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
        height: 63,
        width: 63,
        borderRadius: 16,
    },
    img: {
        height: '100%',
        width: '100%',
        borderRadius: 16,
    },
    iconView: {
        height: 42,
        width: 42
    },
    textView: {
        flex: 1,
        marginLeft: 20
    },
    text0: {
        fontSize: 14,
        fontFamily: Fonts.bold,
        color: theme.dark
    },
    text00: {
        fontSize: 18,
        fontFamily: Fonts.bold,
        color: theme.dark
    },
    text1: {
        fontSize: 14,
        fontFamily: Fonts.medium,
        color: theme.textGray1
    },
    text2: {
        fontSize: 14,
        fontFamily: Fonts.medium,
        color: theme.textGray1
    },
    seperator: {
        height: 1,
        backgroundColor: theme.silverBorder,
        marginVertical: 5
    },
    title0: {
        fontSize: 13,
        fontFamily: Fonts.bold,
        color: theme.dark,
        marginVertical: 10
    }
})