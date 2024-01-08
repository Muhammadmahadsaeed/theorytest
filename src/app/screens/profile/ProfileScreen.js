import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';
import WrapperContainer from '../../components/Wrapper/WrapperContainer';
import CustomHeader from '../../components/Headers/CustomHeader';
import { ScrollView } from 'react-native';
import { ClearIcon, CustomPinIcon, ExitIcon, FlagIcon, ForwardArrowIcon, HeartIcon, HelpIcon, HistoryIcon, LoginIcon, PayIcon, PhoneIcon, ShareIcon, SupportIcon, UserDeactiveIcon, profile, profile_placeholder } from '../../utils/images';
import { theme } from '../../utils/colors';
import { Fonts } from '../../utils/fonts';
import { useSelector, useDispatch } from 'react-redux';
import { showFlashMessage } from '../../utils/Toast';

const svgStyle = {
    height: 24,
    width: 24
}

const loginPaths = ['edit-profile', 'Chat', 'address']

const ProfileScreen = ({ navigation }) => {

    const { userData } = useSelector(state => state.userReducer)
    const dispatch = useDispatch();

    const mapDispatchToProps = (value) => {
        dispatch({ type: 'update_redux', payload: value });
    };

    const list = [{
        id: 1,
        name: 'Flagged Questions',
        icon: <FlagIcon svgStyle={svgStyle} />,
        route: 'edit-profile'
    }, {
        id: 1,
        name: 'Liked Questions',
        icon: <HeartIcon svgStyle={svgStyle} />,
        route: 'address'
    }, {
        id: 1,
        name: 'Share App',
        icon: <ShareIcon svgStyle={svgStyle} />,
        route: 'Profile'
    }, {
        id: 1,
        name: 'Help Center',
        icon: <SupportIcon svgStyle={{ height: 28, width: 28 }} />,
        route: 'help-center',
        css: {

        }
    }, {
        id: 1,
        name: 'About Us',
        icon: <HelpIcon svgStyle={svgStyle} />,
        route: 'Profile'
    }, {
        id: 1,
        name: 'Clear Cache',
        icon: <ClearIcon svgStyle={svgStyle} />,
        route: 'Chat'
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

    const goToRoute = (path) => {
        // if (path && path == 'logout') {
        //     mapDispatchToProps({ userData: null, token: null, userFavourite: [] })
        //     navigation.replace('auth-stack', { screen: 'login-screen' });
        //     return
        // } else if (!userData && loginPaths.includes(path)) {
        //     showFlashMessage("error", 'Please login to explore')
        // } else {
        //     navigation.navigate(path)
        // }
    }

    const goToProfile = () => {
        // if(userData){
        //     navigation.navigate('edit-profile')
        // }else{
        //     showFlashMessage("error", "Please login to explore")
        // }
    }
    return (
        <WrapperContainer>
            <CustomHeader text={"Profile"} />
            <View style={styles.innerContainer}>
                <TouchableOpacity
                    style={styles.card}
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
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.contentContainerStyle}>
                    <TouchableOpacity
                        style={styles.card01}
                        activeOpacity={0.95}>
                        <Text style={styles.text}>
                            Hazard Perception Stats
                        </Text>
                        <View style={styles.row01}>
                            {theory.map((el, index) => (
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
                                onPress={() => goToRoute(el.route)}>
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
        top: -70,
        position: 'absolute',
        padding: 10,
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

    card01: {
        marginTop: 60,
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
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 16,
        padding: 15,
        flex: 1,
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