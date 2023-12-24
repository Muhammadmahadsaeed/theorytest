import React from 'react';
import {
    View,
    Text,
    Linking,
    TouchableOpacity,
    StyleSheet,
    Image
} from 'react-native';
import moment from 'moment';
// import { black, purple, white } from '../../utils/colors';
// import { CallIcon, ChatIcon, ClockBlueIcon, DirectionIcon, profile_placeholder } from '../../utils/images';
import { Fonts } from '../../utils/fonts';
import { theme } from '../../utils/colors';
import { ClockIcon, DirectionIcon, profile_placeholder } from '../../utils/images';


const AppointmentHistoryList = ({ data, navigation }) => {

    const onViewDetails = (item) => {
        navigation.navigate('appointment', { ...item, isRoute: 'history' })
    }

    const openMap = (item) => {
        Linking.openURL(`${item?.user_location_url}`)
    }

    return (
        <View style={styles.card}>
            <View style={styles.upper}>
                <View style={styles.row}>
                    <View style={styles.imageView}>
                        <Image source={profile_placeholder} style={styles.img} />
                    </View>
                    <View style={styles.textView}>
                        <Text style={styles.name} numberOfLines={1}>
                            {data?.seller_name}
                        </Text>
                        <Text style={styles.expertise} numberOfLines={2}>
                            {data?.seller_address}
                        </Text>
                    </View>
                </View>
                <View style={styles.right}>
                    <TouchableOpacity
                        style={styles.btn}
                        activeOpacity={0.8}
                        onPress={() => openMap(data)}>
                        <DirectionIcon svgStyle={styles.svgStyles} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.timeView}>
                <ClockIcon svgStyle={{ height: 20, width: 20 }} />
                <Text style={styles.time}>
                    {moment(data?.appointment_date).format('LL')}, {data?.service_time}
                </Text>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.link}
                    onPress={() => onViewDetails(data)}>
                    <Text style={styles.linkText}>
                        View details
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AppointmentHistoryList



const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: theme.bg,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        height: 200,
        margin: 15,
        borderRadius: 10,
        padding: 15,
    },
    upper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    imageView: {
        height: 50,
        width: 50,
        borderWidth: 1,
        borderColor: theme.black,
        borderRadius: 10

    },
    img: {
        height: '100%',
        width: '100%',
        borderWidth: 1,
        borderColor: theme.black,
        borderRadius: 10
    },
    textView: {
        flex: 1,
        marginLeft: 20,
        alignItems: 'flex-start'
    },
    name: {
        fontSize: 18,
        color: theme.black,
        fontFamily: Fonts.bold
    },
    expertise: {
        fontSize: 16,
        color: theme.black,
        fontFamily: Fonts.medium
    },
    right: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    btn: {
        height: 40,
        width: 40,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    svgStyles: {
        height: 30,
        width: 30
    },
    timeView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: theme.buttonBg,
        borderRadius: 7
    },
    time: {
        fontSize: 14,
        color: theme.textWhite,
        fontFamily: Fonts.regular,
        marginHorizontal: 10,
    },
    footer: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    link: {
        flex: 1,
        paddingVertical: 5,
        alignItems: 'center'
    },
    linkText: {
        fontSize: 14,
        color: theme.black,
        fontFamily: Fonts.regular,
    }
})