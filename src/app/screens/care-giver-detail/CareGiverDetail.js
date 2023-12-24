import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ScrollView,
} from 'react-native';
import * as Sharing from 'expo-sharing';
import HeaderWithBackButton from '../../components/Headers/HeaderWithBackButton';
import { theme } from '../../utils/colors';
import { ChatIcon, HeartCircleIcon, LineIcon, StarCircleIcon, StarIcon, UserDeactiveIcon, imagegallery, oval, profile } from '../../utils/images';
import { Fonts } from '../../utils/fonts';
import { Image } from 'react-native';
import UserCards from '../../components/Cards/UserCards';
import Button from '../../components/Buttons/Button';
import { postSellerById } from '../../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from '../../components/Loading/Loading';
import { EmptyList } from '../../components/Exception/EmptyList';
import { capitalizeFirstLetter, isObjEmpty } from '../../helper/helper';
import WrapperContainer1 from '../../components/Wrapper/WrapperContainer1';
import CareGiverCard from '../../components/Cards/CareGiverCards';
import CareGiverModal from '../../components/Modal/CareGiverModal';


const CareGiverDetail = ({ navigation, route }) => {

    let { params } = route || {}
   
    const dispatch = useDispatch();
    const { userData, userFavourite, currentLocation } = useSelector(state => state.userReducer)

    const mapDispatchToProps = (value) => {
        dispatch({ type: 'update_redux', payload: value });
    };

    const [isFavorite, setIsFavorite] = useState(false)
    const [loading, setLoading] = useState(false)
    const [sellerData, setSellerData] = useState({})
    const [favLoading, setFavLoading] = useState(false)
    const [selectedCareGiver, setSelectedCareGiver] = useState(params?.employees ? params?.employees[0] : {})

    const caregiverModal = useRef()

    useEffect(() => {
        getSellerById(params?.seller?.id)
    }, [params])

    const getSellerById = async (id) => {
        try {
            let response = await postSellerById({
                "seller_id": Number(id),
                "latlng": `${currentLocation?.lat},${currentLocation?.lng}`
            })
          
            if (response?.result) {
                setSellerData(response?.result?.data)
            }
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }

    const goToDateTime = () => {
        navigation.navigate('date-time', { ...params, caregiver: selectedCareGiver, sellerData: sellerData })
    }

    const onShare = async () => {
        const url = 'https://play.google.com/store/apps/details?id=com.instagram.android&hl=en_IN&gl=US'
        try {
            if (!(await Sharing.isAvailableAsync())) {
                alert(`Uh oh, sharing isn't available on your platform`);
                return;
            }

            Sharing.shareAsync(url);
        } catch (error) {
            alert(error.message);
        }
    };

    const getCaregiver = (item) => {
        setSelectedCareGiver(item)
    }

    const onEyePress = (item) => {
        caregiverModal.current.isOpen(item)
    }

   

    return (
        <WrapperContainer1>
            <HeaderWithBackButton
                text={"Caregiver Information"}
                rightIcon={'share'}
                onPress={onShare} />
            {isObjEmpty(params) && loading && <Loading color={theme.black} size={40} />}
            {!isObjEmpty(params) && !loading &&
                <>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.innerContainer}>
                            <View style={styles.card}>
                                <View style={styles.cardUpper}>
                                    <View style={styles.profileView}>
                                        <Image source={(params?.image || params?.profile_banner) ? { uri: (params?.image || params?.profile_banner) } : imagegallery} style={styles.img} />
                                    </View>
                                    <View style={styles.textView}>
                                        <Text style={styles.name}>
                                            {capitalizeFirstLetter(params?.name)}
                                        </Text>
                                        <View style={[styles.ratingView, { marginVertical: 8 }]}>
                                            <View style={styles.icon}>
                                                <StarIcon />
                                            </View>
                                            <Text style={styles.ratingText}>
                                                4.5 (834)
                                            </Text>
                                        </View>
                                        <View style={styles.ratingView}>
                                            <View style={styles.icon}>
                                                <UserDeactiveIcon />
                                            </View>
                                            <Text style={[styles.ratingText, { fontSize: 14 }]}>
                                                {params?.description || "I prioritize your child's safety and well-being, while also making sure they have fun and engage in age-appropriate activities."}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.chatIcon}>
                                        <ChatIcon />
                                    </View>
                                </View>
                                <View style={styles.cardCenter}>
                                    <View style={styles.overlay0}>
                                        <Image source={oval} style={[styles.img, { borderRadius: 100 }]} />
                                    </View>
                                    <View style={styles.line}>
                                        <LineIcon />
                                    </View>
                                    <View style={styles.overlay1}>
                                        <Image source={oval} style={[styles.img, { borderRadius: 100 }]} />
                                    </View>
                                </View>
                                <View style={styles.cardFooter}>
                                    <View style={styles.reviewCard}>
                                        <View style={styles.imgView}>
                                            <StarCircleIcon />
                                        </View>
                                        <View style={styles.footerText}>
                                            <Text style={styles.text0}>
                                                Reviews
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.reviewCard}>
                                        <View style={styles.imgView}>
                                            <HeartCircleIcon />
                                        </View>
                                        <View style={styles.footerText}>
                                            <Text style={styles.text0}>
                                                Thanks
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            {params?.employees?.length > 0 &&
                                <View style={styles.card0}>
                                    <View style={styles.headingView}>
                                        <Text style={styles.heading}>
                                            Our Caregiver
                                        </Text>
                                    </View>
                                    <FlatList
                                        data={params?.employees}
                                        showsHorizontalScrollIndicator={false}
                                        horizontal
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={({ item }) => <CareGiverCard
                                            data={item}
                                            selectedCareGiver={selectedCareGiver}
                                            isEye={true}
                                            onEyePress={onEyePress}
                                            customStyle={{
                                                marginHorizontal: 5,
                                            }}
                                            onPress={getCaregiver} />}
                                    />
                                    {/* <View style={styles.cardFooter0}>
                                    <View style={styles.reviewCard0}>
                                        <View style={styles.imgView0}>
                                            <StarCircleIcon />
                                        </View>
                                        <View style={styles.footerText0}>
                                            <Text style={styles.text0}>
                                                Baby Feeding
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.reviewCard0}>
                                        <View style={styles.imgView0}>
                                            <HeartCircleIcon />
                                        </View>
                                        <View style={styles.footerText0}>
                                            <Text style={styles.text0}>
                                                Baby Massage
                                            </Text>
                                        </View>
                                    </View>
                                </View> */}
                                </View>
                            }
                            <View style={styles.row}>
                                <Text style={styles.heading}>
                                    Reviews from users
                                </Text>
                                <Text style={styles.para}>
                                    See all
                                </Text>
                            </View>
                            {[...Array(10).keys()].map((el, index) => (
                                <UserCards key={index} />
                            ))}
                        </View>
                    </ScrollView>
                    <View style={styles.footer}>
                        <Button title={"Schedule an appointment"} onPress={() => goToDateTime()} />
                    </View>
                </>
            }
            {isObjEmpty(params) && !loading && <EmptyList text={"No serivces found"} />}
            <CareGiverModal ref={caregiverModal} />
        </WrapperContainer1>
    )
}

export default CareGiverDetail

const styles = StyleSheet.create({
    innerContainer: {
        flex: 1,
        padding: 15
    },
    card: {
        backgroundColor: theme.bg,
        paddingVertical: 20,
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    },
    cardUpper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: 20
    },
    profileView: {
        height: 64,
        width: 64,
        borderRadius: 10,
    },
    img: {
        height: '100%',
        width: '100%',
    },
    textView: {
        flex: 1,
        marginHorizontal: 10
    },
    name: {
        fontSize: 18,
        fontFamily: Fonts.bold,
        color: theme.text
    },
    ratingView: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        // alignItems: 'center',
    },
    icon: {
        height: 16,
        width: 16
    },
    ratingText: {
        fontSize: 12,
        fontFamily: Fonts.medium,
        color: theme.textGray,
        marginLeft: 5
    },
    chatIcon: {
        height: 36,
        width: 36
    },
    cardCenter: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 20
    },
    line: {
        flex: 1,
        height: 1,
        width: '100%'
    },
    overlay0: {
        height: 24,
        width: 24,
        borderRadius: 100,
        position: 'absolute',
        right: -10
    },
    overlay1: {
        height: 24,
        width: 24,
        borderRadius: 100,
        position: 'absolute',
        left: -10
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 20
    },
    card0: {
        marginTop: 30
    },
    headingView: {
        marginBottom: 10
    },
    heading: {
        fontSize: 18,
        fontFamily: Fonts.bold,
        color: theme.text,
    },
    cardFooter0: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20
    },
    reviewCard: {
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
        height: 34,
        width: 112
    },
    imgView: {
        height: 36,
        width: 36,
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
    reviewCard0: {
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
        height: 46,
        width: 156
    },
    imgView0: {
        height: 40,
        width: 40,
        position: 'absolute',
        top: -15,
    },
    footerText0: {
        left: 45
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 20
    },
    para: {
        fontSize: 14,
        fontFamily: Fonts.medium,
        color: theme.textBlue,
    },
    footer: {
        backgroundColor: theme.bg,
        paddingHorizontal: 15,
        borderRadius: 16,
        height: 72,
        marginBottom: 20,
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
        marginHorizontal: 15
    }
})