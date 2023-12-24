import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ScrollView,
} from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import WrapperContainer1 from '../../components/Wrapper/WrapperContainer1';
import HeaderWithBackButton from '../../components/Headers/HeaderWithBackButton';
import { Fonts } from '../../utils/fonts';
import { theme } from '../../utils/colors';
import { AppointmentTypeIcon, CalenderCircleIcon } from '../../utils/images';
import CareGiverCard from '../../components/Cards/CareGiverCards';
import Button from '../../components/Buttons/Button';
import moment from 'moment';
import { showFlashMessage } from '../../utils/Toast';
import { postBookService, postPaymentMethods, postUpdateProfile } from '../../services/api';
import { arrangeCart, checkIsNum, create_UUID, formatDate, getTimeValue } from '../../helper/helper';
import { useDispatch, useSelector } from 'react-redux';
import PaymentBottomSheetComponent from '../../components/BottomSheet/PaymentBottomSheetComponent';
import ModalLoader from '../../components/Modal/ModalLoader';
import AddressCard from '../../components/Cards/AddressCard';

const AppointmentDetailScreen = ({ navigation, route }) => {

    let { params } = route || {}
    const { cart, userData, currentLocation } = useSelector(state => state.userReducer)
    const dispatch = useDispatch()
    const bottomSheetRef = useRef(null);

    const [btnLoading, setBtnLoading] = useState(false)
    const [isLiked, setIsLiked] = useState([]);
    const [selectedPayment, setSelectedPayment] = useState({})
    const [selectedAddress, setSelectedAddress] = useState({})


    const mapDispatchToProps = (value) => {
        dispatch({ type: 'update_redux', payload: value });
    };

    useEffect(() => {
        getPaymentMethods()
    }, [])

    const getPaymentMethods = async () => {
        try {
            let response = await postPaymentMethods({})
            if (response?.result?.length > 0) {
                let format = response?.result?.map((el) => (
                    {
                        ...el,
                        selected: false
                    }
                ))
                setIsLiked(format)
            }
        } catch (error) {

        } finally {
        }
    }


    const snapPoints = useMemo(() => ['55%'], []);

    // callbacks
    const handleSheetChanges = useCallback((index) => {
        // console.log('handleSheetChanges', index);
    }, []);


    const handleSnapPress = useCallback((index) => {
        bottomSheetRef.current?.snapToIndex(index);
    }, []);

    const handleClosePress = useCallback(() => {
        bottomSheetRef.current?.close();
    }, []);

    const renderBackdrop = useCallback(props => (
        <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            pressBehavior={"close"}
            enableTouchThrough
        />
    ), []);


    const goToPayment = async () => {
        if (userData) {
            handleSnapPress(0)
        } else {
            navigation.replace('auth-stack', {
                screen: 'login-screen',
                params: {
                    ...params, fromRoute: 'appointment-detail'
                }
            })
        }
    }

    const onRadioBtnClick = (item) => {

        setSelectedPayment(item)
        let updatedState = isLiked.map((isLikedItem) =>
            isLikedItem.id === item.id
                ? { ...isLikedItem, selected: true }
                : { ...isLikedItem, selected: false }
        );
        setIsLiked(updatedState);
    }

    const onContinue = async () => {
        try {
            handleClosePress()
            setBtnLoading(true)
            try {
                let address = JSON.parse(userData?.addresses)
                let newAddress = [...address, { uid: create_UUID(), ...currentLocation }]
                let body = {
                    "seller_id": params?.seller?.id,
                    "delivery_location": selectedAddress ? `${selectedAddress?.lat},${selectedAddress?.lat}` : "0,0",
                    "service_type": "seller_service",
                    "appointment_date": formatDate(params?.date),
                    "booking_start_time": getTimeValue(params?.startTime),
                    "booking_end_time": getTimeValue(params?.endTime),
                    "lines": arrangeCart([params], params?.caregiver),
                    "payment_lines": [
                        {
                            "payment_method_id": 0,
                            "amount": params?.price * params?.hours
                        }
                    ]
                }
                let addressBody = { "addresses": JSON.stringify(newAddress) }
                let response = await postBookService(body)
                let updateUser = await postUpdateProfile(addressBody)
                mapDispatchToProps({ userData: { ...userData, ...updateUser?.result?.data } })
                showFlashMessage("success", "Your Booking has been done");
                navigation.navigate('payment-success', {
                    ...params,
                    ...response?.result
                })
            } catch (error) {
                console.log(error);

            } finally {
                setBtnLoading(false)
            }
        } catch (error) {

        }
    }

    // const userAddress = useMemo(() => {
    //     let parse = JSON.parse(userData?.addresses)
    //     parse.push({ uid: 1, name: 'new' })
    //     setSelectedAddress(parse[0])
    //     return parse
    // }, [userData?.addresses])

    const userAddress = useMemo(() => {
        if (userData) {
            let parse = JSON.parse(userData?.addresses || "[]")
            parse.push({ uid: 1, name: 'new' })
            if (parse.length > 1) {
                setSelectedAddress(parse[0])
            }
            return parse
        } else return []
    }, [userData?.addresses])

    const onSelectAddress = (item) => {
        if (item?.name == 'new') {
            navigation.navigate('add-new-address')
        } else {
            setSelectedAddress(item)
        }
    }

    return (
        <WrapperContainer1>
            <HeaderWithBackButton text={"Appointment Details"} />
            <View style={styles.innerContainer}>
                <View style={styles.container}>
                    <View style={styles.headingView}>
                        <Text style={styles.title}>
                            Booking Info
                        </Text>
                        <View style={styles.statusView}>
                            <Text style={styles.num}>
                                Pending Payment
                            </Text>
                        </View>
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
                                    {moment(params?.date, 'DD/MM/YYYY').format('dddd, DD MMM YYYY')}
                                </Text>
                                <Text style={styles.text2}>
                                    {params?.startTime} - {params?.endTime}
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
                                    {params?.name}
                                </Text>
                                <Text style={styles.text2}>
                                    Nanny
                                </Text>
                            </View>

                        </View>
                    </View>
                </View>
                <View style={styles.headingView}>
                    <Text style={styles.title0}>
                        Addresses
                    </Text>
                </View>
                <View style={styles.addressView}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}>
                        {userAddress?.map((el, index) => (
                            <AddressCard
                                data={el}
                                key={index}
                                selectedAddress={selectedAddress}
                                onPress={onSelectAddress} />
                        ))}
                    </ScrollView>
                </View>
                <View style={styles.footer}>
                    <View style={styles.priceView}>
                        <View style={styles.row1}>
                            <Text style={styles.hour}>
                                Price Per Hour
                            </Text>
                            <Text style={styles.hourPrice}>
                                {params?.currency || "AED"} {checkIsNum(params?.price)}
                            </Text>
                        </View>
                        <View style={styles.row1}>
                            <Text style={styles.title}>
                                Total Price
                            </Text>
                            <Text style={styles.price}>
                                {params?.currency || "AED"} {checkIsNum(params?.price * params?.hours)}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.bottom}>
                        <Button
                            title={"Pay Now"}
                            onPress={goToPayment}
                        />
                    </View>
                </View>
            </View>
            <ModalLoader loading={btnLoading} />
            <BottomSheet
                ref={bottomSheetRef}
                index={-1}
                backdropComponent={renderBackdrop}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}>
                <PaymentBottomSheetComponent
                    modalData={isLiked}
                    selectedPayment={selectedPayment}
                    onNext={onContinue}
                    onRadioBtnClick={onRadioBtnClick}
                    onCancel={handleClosePress} />
            </BottomSheet>
        </WrapperContainer1>
    )
}

export default AppointmentDetailScreen


const styles = StyleSheet.create({
    innerContainer: {
        flex: 1
    },
    container: {
        // flex: 1,
        paddingVertical: 15,
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
        alignItems: 'center',
        paddingHorizontal: 15
    },
    addressView: {
        paddingHorizontal: 10
    },
    priceView: {
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'center',
        marginBottom: 20,
        backgroundColor: theme.bg,
        paddingHorizontal: 15,
        borderRadius: 10,
        paddingVertical: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    price: {
        fontSize: 22,
        fontFamily: Fonts.bold,
        color: theme.dark,
    },
    title: {
        fontSize: 16,
        fontFamily: Fonts.medium,
        color: theme.dark
    },
    statusView: {
        backgroundColor: theme.textGray1,
        padding: 10,
        borderRadius: 4,
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    num: {
        fontSize: 12,
        fontFamily: Fonts.medium,
        color: theme.textWhite
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
    row1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 2
    },
    hour: {
        fontSize: 14,
        fontFamily: Fonts.medium,
        color: theme.dark
    },
    hourPrice: {
        fontSize: 14,
        fontFamily: Fonts.medium,
        color: theme.dark
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
        fontSize: 16,
        fontFamily: Fonts.bold,
        color: theme.dark,
        marginVertical: 10
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingVertical: 20
    },
    bottom: {
        marginHorizontal: 15
    }
})