import React, { useRef, useState } from 'react';
import {
    View,
    StyleSheet,
    Share,
    Text,
    TouchableOpacity
} from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import WrapperContainer from '../../components/Wrapper/WrapperContainer';
import CustomHeader from '../../components/Headers/CustomHeader';
import { ScrollView } from 'react-native';
import { ClearIcon, FlagIcon, HeartIcon, HelpIcon, ShareIcon, SupportIcon } from '../../utils/images';
import { theme } from '../../utils/colors';
import { Fonts } from '../../utils/fonts';
import { useDispatch } from 'react-redux';
import DeleteModal from '../../components/Modal/DeleteModal';

const svgStyle = {
    height: 24,
    width: 24
}


const ProfileScreen = ({ navigation }) => {

    const dispatch = useDispatch();
    const deleteModal = useRef()

    const mapDispatchToProps = (value) => {
        dispatch({ type: 'update_redux', payload: value });
    };

    const list = [{
        id: 1,
        name: 'Flagged Questions',
        icon: <FlagIcon svgStyle={svgStyle} />,
        route: 'flag-nd-like',
        short_name: 'flag'
    }, {
        id: 1,
        name: 'Liked Questions',
        icon: <HeartIcon svgStyle={svgStyle} />,
        route: 'flag-nd-like',
        short_name: 'liked'
    }, {
        id: 1,
        name: 'Share App',
        icon: <ShareIcon svgStyle={svgStyle} />,
        route: 'share'
    }, {
        id: 1,
        name: 'Help Center',
        icon: <SupportIcon svgStyle={{ height: 28, width: 28 }} />,
        route: 'help-center',
    }, {
        id: 1,
        name: 'About Us',
        icon: <HelpIcon svgStyle={svgStyle} />,
        route: 'help-center',
    }, {
        id: 1,
        name: 'Clear Cache',
        icon: <ClearIcon svgStyle={svgStyle} />,
        route: 'cache'
    }]
    const [theory, setTheory] = useState([
        {
            id: 1,
            name: 'Taken',
            value: 27
        },
        {
            id: 1,
            name: 'Pass',
            value: 3
        },
        {
            id: 1,
            name: 'Failed',
            value: 27
        }
    ])
    const [hazardPerc, setHazardPerc] = useState([
        {
            id: 1,
            name: 'Taken',
            value: 27
        },
        {
            id: 1,
            name: 'Pass',
            value: 3
        },
        {
            id: 1,
            name: 'Failed',
            value: 27
        }
    ])

    const goToRoute = (item) => {
        if (item?.route == 'flag-nd-like') {
            navigation.navigate(item?.route, { fromRoute: item?.short_name });
            return
        }
        if (item?.route == 'share') {
            onShare()
        }
        if (item?.route == 'cache') {
            deleteModal.current.isOpen()
        }
        else {
            navigation.navigate(item?.route)
        }
    }


    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'React Native | A framework for building native apps using React',
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <WrapperContainer>
            <CustomHeader text={"Profile"} />
            <View style={styles.innerContainer}>
                <TouchableOpacity
                    style={styles.card}
                    activeOpacity={0.95}>
                    <Text style={styles.text}>
                        Test Readiness Indicator
                    </Text>
                    <View style={styles.circleView}>
                        <AnimatedCircularProgress
                            size={80}
                            width={8}
                            fill={50}
                            rotation={180}
                            // arcSweepAngle={300}
                            tintColor={theme.skyBlue}
                            tintTransparency
                            onAnimationComplete={() => console.log('onAnimationComplete')}
                            backgroundColor={theme.lightBorderGrey}>
                            {
                                (fill) => (
                                    <Text style={styles.fillText}>
                                        Pass
                                    </Text>
                                )
                            }
                        </AnimatedCircularProgress>
                    </View>
                    <Text style={styles.heading}>
                        Just Starting Out
                    </Text>
                </TouchableOpacity>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.contentContainerStyle}>
                    <TouchableOpacity
                        style={styles.card01}
                        activeOpacity={0.95}>
                        <Text style={styles.text}>
                            Theory Test Stats
                        </Text>
                        <View style={styles.row01}>
                            {theory.map((el, index) => (
                                <View style={styles.col} key={index}>
                                    <View style={styles.box}>
                                        <Text style={styles.boxText}>
                                            27
                                        </Text>
                                    </View>
                                    <Text style={styles.text01}>
                                        Taken
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.card01, { marginTop: 20, }]}
                        activeOpacity={0.95}>
                        <Text style={styles.text}>
                            Hazard Perception Stats
                        </Text>
                        <View style={styles.row01}>
                            {hazardPerc.map((el, index) => (
                                <View style={styles.col} key={index}>
                                    <View style={styles.box}>
                                        <Text style={styles.boxText}>
                                            {el.value}
                                        </Text>
                                    </View>
                                    <Text style={styles.text01}>
                                        {el.name}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </TouchableOpacity>
                    <View style={styles.list}>
                        {list.map((el, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.row}
                                activeOpacity={0.95}
                                onPress={() => goToRoute(el)}>
                                <View style={styles.icon}>
                                    {el.icon}
                                </View>
                                <Text style={[styles.text11, { ...el.css }]}>
                                    {el.name}
                                </Text>
                            </TouchableOpacity>
                        ))}

                    </View>
                </ScrollView>
            </View>
            <DeleteModal ref={deleteModal} />
        </WrapperContainer>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    innerContainer: {
        flex: 1,

    },
    card: {
        alignSelf: 'center',
        top: -90,
        position: 'absolute',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
        width: '93%',
        borderRadius: 16,
        backgroundColor: theme.bg,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    circleView: {
        alignItems: 'center',
        marginVertical: 10
    },
    fillText: {
        fontFamily: Fonts.medium,
        fontSize: 14,
        color: theme.black
    },
    heading: {
        fontFamily: Fonts.medium,
        fontSize: 18,
        color: theme.black
    },
    card01: {
        marginTop: 95,
        alignSelf: 'center',
        paddingVertical: 13,
        paddingHorizontal: 10,
        zIndex: 100,
        width: '93%',
        borderRadius: 16,
        backgroundColor: theme.bg,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    row01: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 20
    },
    col: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    box: {
        backgroundColor: theme.greenish,
        borderRadius: 50,
        paddingHorizontal: 20,
        paddingVertical: 5
    },
    boxText: {
        fontFamily: Fonts.medium,
        fontSize: 16,
        color: theme.black,

    },
    text01: {
        fontFamily: Fonts.medium,
        fontSize: 14,
        color: theme.black,
        marginTop: 5
    },
    contentContainerStyle: {
        paddingBottom: 150
    },
    list: {
        flex: 1,
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 16,
        padding: 15,
        width: '93%',
        backgroundColor: theme.bg,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
        paddingVertical: 10
    },
    icon: {
        height: 24,
        width: 24
    },
    text: {
        fontFamily: Fonts.medium,
        fontSize: 16,
        color: theme.text
    },
    text11: {
        flex: 1,
        marginLeft: 15,
        fontFamily: Fonts.medium,
        fontSize: 16,
        color: theme.text
    }
})