import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { theme } from '../../utils/colors';
import HomeHeader from '../../components/Headers/HomeHeader';
import { Fonts } from '../../utils/fonts';
import { DoctorWritingIcon, MedicalHistoryIcon, NewsPaper1Icon, NewsPaperIcon, OldIcon } from '../../utils/images';
import CategoryList from './CategoryList';
import DoctorList from './DoctorList';
import WrapperContainer from '../../components/Wrapper/WrapperContainer';
import { useSelector } from 'react-redux';
import { getHomeData, postAppointment } from '../../services/api';
import { Loading } from '../../components/Loading/Loading';
import moment from 'moment';
import WrapperContainer1 from '../../components/Wrapper/WrapperContainer1';
import { floatToTime, isObjEmpty } from '../../helper/helper';

const today = moment().format('dddd, DD MMM YYYY');

const HomeScreen = ({ navigation }) => {

    const { currentLocation, userData, } = useSelector(state => state.userReducer)

    const [category, setCategory] = useState([])
    const [doctor, setDoctorList] = useState([])
    const [news, setNews] = useState([])
    const [loading, setLoading] = useState(true)
    const [appointmentList, setAppointmentList] = useState({})
    const [isClear, setIsClear] = useState(false)

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            let body = {
                first: { "latlng": `${currentLocation?.lat},${currentLocation?.lng}` },
                second: { "dont_load_services": true },
                third: {},
                fourth: {}
            }

            const { topSeller, categories, appointment, news } = await getHomeData(body)
            if (topSeller?.result?.services?.length > 0) {
                setDoctorList(topSeller?.result?.services)
            }
            if (categories?.result?.data?.length > 0) {
                setCategory(categories?.result?.data)
            }
            if (appointment?.result?.length > 0) {
                setAppointmentList(appointment?.result[0])
            }
            if (news?.result?.data?.length > 0) {
                setNews(news?.result?.data)
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    const goToNewScreen = (params) => {
        navigation.navigate('Profile', {
            screen: 'news-screen',
            params: {
                ...params,
                path: 'home'
            }
        })
    }

    return (
        <WrapperContainer1>
            <View style={styles.innerContainer}>
                <HomeHeader />
                <View style={styles.body}>
                    {loading && <Loading size={60} color={theme.black} />}
                    {!loading &&
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={styles.contentContainerStyle}>
                            <View style={styles.textView}>
                                <Text style={styles.date}>
                                    {today}
                                </Text>
                                <Text style={styles.name}>
                                    Hi, {userData?.name || "Guest"}
                                </Text>
                            </View>
                            {!isObjEmpty(appointmentList) > 0 && !isClear &&
                                <View style={styles.searchView}>
                                    <View style={styles.searchTextView}>
                                        <Text style={styles.searchHeading}>
                                            Don't forget
                                        </Text>
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            onPress={() => setIsClear(!isClear)}>
                                            <Text style={styles.clearText}>
                                                Clear
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.searchBox}>
                                        <View style={styles.searchBoxIcon}>
                                            <MedicalHistoryIcon />
                                        </View>
                                        <TextInput
                                            style={styles.input}
                                            placeholder={"Nanny, Linda B. Johnson"}
                                            value={appointmentList?.name}
                                            editable={false} />
                                        <View>
                                            <Text style={styles.time}>
                                                {floatToTime(appointmentList?.booking_start_time)}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            }
                            <View style={styles.headingView}>
                                <Text style={styles.heading}>
                                    What are you looking for?
                                </Text>
                            </View>
                            <View style={styles.categoryList}>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    {category?.map((el, index) => (
                                        <CategoryList data={el} key={index} />
                                    ))}
                                </ScrollView>
                            </View>
                            <View style={styles.headingView}>
                                <Text style={styles.heading}>
                                    Our Services
                                </Text>
                            </View>
                            <View style={styles.categoryList1}>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    {doctor?.map((el, index) => (
                                        <DoctorList data={el} key={index} />
                                    ))}
                                </ScrollView>
                            </View>
                            <View style={[styles.headingView, styles.row]}>
                                <Text style={styles.heading}>
                                    Our News
                                </Text>
                                <TouchableOpacity
                                    style={styles.link}
                                    activeOpacity={0.8}
                                    onPress={() => goToNewScreen(news[0])}>
                                    <Text style={styles.linkText}>
                                        Show all
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.categoryList1}>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    {news?.map((el, index) => (
                                        <DoctorList
                                            data={el}
                                            key={index}
                                            isNews={true}
                                            goToNewScreen={goToNewScreen} />
                                    ))}
                                </ScrollView>
                            </View>
                        </ScrollView>
                    }
                </View>
            </View>
        </WrapperContainer1 >
    )

}

export default HomeScreen

const styles = ({
    innerContainer: {
        flex: 1,
    },
    svgStyle: {
        height: 70,
        width: 70,
    },
    body: {
        flex: 1,
        paddingHorizontal: 15,
        marginTop: 20
    },
    textView: {

    },
    date: {
        fontSize: 16,
        fontFamily: Fonts.medium,
        color: theme.gray,
    },
    name: {
        fontSize: 25,
        fontFamily: Fonts.bold,
        color: theme.textBlack,
    },
    searchView: {
        marginTop: 25
    },
    searchTextView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    searchHeading: {
        fontSize: 18,
        fontFamily: Fonts.bold,
        color: theme.textBlack,
    },
    clearText: {
        fontSize: 14,
        fontFamily: Fonts.medium,
        color: theme.textBlack,
    },
    searchBox: {
        marginTop: 15,
        height: 54,
        borderRadius: 16,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: theme.borderColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    searchBoxIcon: {
        height: 24,
        width: 24
    },
    input: {
        flex: 1,
        fontSize: 16,
        fontFamily: Fonts.medium,
        color: theme.inputText,
    },
    time: {
        fontSize: 12,
        fontFamily: Fonts.medium,
        color: theme.buttonBg,
    },
    headingView: {
        marginVertical: 15,
    },
    heading: {
        fontFamily: Fonts.bold,
        fontSize: 18,
        color: theme.textBlack
    },
    contentContainerStyle: {
        paddingBottom: 100
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    link: {
        paddingVertical: 5,
    },
    linkText: {
        fontFamily: Fonts.bold,
        color: theme.buttonBg,
        fontSize: 14,
        borderBottomColor: theme.buttonBg,
        borderBottomWidth: 1
    }
})