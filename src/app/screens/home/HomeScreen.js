import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Image,
    Linking
} from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { theme } from '../../utils/colors';
import HomeHeader from '../../components/Headers/HomeHeader';
import { Fonts } from '../../utils/fonts';
import { AddressBookIcon, AlertIcon, CrownIcon, govuk } from '../../utils/images';
import { useSelector } from 'react-redux';
import moment from 'moment';
import WrapperContainer1 from '../../components/Wrapper/WrapperContainer1';

const today = moment().format('dddd, DD MMM YYYY');

const HomeScreen = ({ navigation }) => {

    const { userData, } = useSelector(state => state.userReducer)
    const video = useRef(null);

    const [list, setList] = useState([
        {
            id: 2,
            name: 'Theory Test',
            css: {
                borderColor: theme.lightGreen
            },
            icon: <AddressBookIcon />,
            link: 'theory-test'
        },
        {
            id: 3,
            name: 'Hazard Perception',
            css: {
                borderColor: theme.red
            },
            icon: <AlertIcon />,
            link: 'hazard'
        },
        {
            id: 5,
            name: 'Highway Code',
            icon: <CrownIcon />,
            webLink: 'https://www.gov.uk/book-theory-test'
        },
        {
            id: 6,
            name: 'Book Theory Test',
            icon: govuk,
            type: 'png',
            webLink: 'https://www.gov.uk/guidance/the-highway-code'
        },
    ])
    const [videoLoading, setVideoLoading] = useState(true)

    const onClick = (el) => {
        if (el?.link) {
            navigation.navigate(el.link)
            return
        } else {
            Linking.openURL(el.webLink)
        }
    }

    return (
        <WrapperContainer1>
            <View style={styles.innerContainer}>
                <HomeHeader />
                <View style={styles.body}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.contentContainerStyle}>
                        <View style={styles.textView0}>
                            <Text style={styles.date}>
                                {today}
                            </Text>
                            <Text style={styles.name}>
                                Hi, {userData?.name || "Welcome"}
                            </Text>
                        </View>
                        <View style={styles.videoView}>
                            {/* {videoLoading &&
                                <Loading color={theme.skyBlue} size={40} />
                            } */}
                            <Video
                                ref={video}
                                style={styles.video}
                                source={{
                                    uri: 'https://media.safedrivingforlife.info/media/intro.webm',
                                }}
                                useNativeControls={false}
                                resizeMode={ResizeMode.COVER}
                                shouldPlay
                                isMuted
                                isLooping={true}
                                onLoad={() => setVideoLoading(false)}
                            // onPlaybackStatusUpdate={status => setStatus(() => status)}
                            />

                        </View>
                        <View style={styles.headingView}>
                            <Text style={styles.heading}>
                                What are you looking for?
                            </Text>
                        </View>
                        <View style={styles.box}>
                            {list.map((el, index) => (
                                <TouchableOpacity
                                    style={[styles.row, { ...el?.css }]}
                                    key={index}
                                    activeOpacity={0.8}
                                    onPress={() => onClick(el)}>
                                    <View style={[styles.imgView]}>
                                        {el.type == 'png' ? <Image source={el.icon} style={styles.img} /> : el.icon}
                                    </View>
                                    <View style={styles.textView}>
                                        <Text style={styles.text}>
                                            {el.name}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                </View>
            </View>
        </WrapperContainer1>
    )

}

export default HomeScreen

const styles = StyleSheet.create({
    innerContainer: {
        flex: 1,
    },
    videoView: {
        height: 200,
        width: '100%',
        marginTop: 15
    },
    video: {
        height: 200,
        width: '100%'
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
        flex: 1,
        marginLeft: 20
    },
    date: {
        fontSize: 16,
        fontFamily: Fonts.medium,
        color: theme.grayShade1,
    },
    name: {
        fontSize: 25,
        fontFamily: Fonts.bold,
        color: theme.black,
    },
    headingView: {
        marginVertical: 15,
    },
    heading: {
        fontFamily: Fonts.bold,
        fontSize: 18,
        color: theme.black
    },
    contentContainerStyle: {
        paddingBottom: 100
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: theme.purple,
        marginBottom: 15,
        borderRadius: 8,
        padding: 10
    },
    imgView: {
        height: 45,
        width: 45,
        backgroundColor: theme.white
    },
    img: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain'
    },
    text: {
        fontFamily: Fonts.medium,
        fontSize: 16,
        color: theme.black
    }
})