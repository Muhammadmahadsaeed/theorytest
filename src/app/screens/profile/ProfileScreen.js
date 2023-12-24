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
import { CustomPinIcon, ExitIcon, ForwardArrowIcon, HelpIcon, HistoryIcon, LoginIcon, PayIcon, PhoneIcon, UserDeactiveIcon, profile, profile_placeholder } from '../../utils/images';
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
        name: 'Profile',
        icon: <UserDeactiveIcon svgStyle={svgStyle} />,
        route: 'edit-profile'
    }, {
        id: 1,
        name: 'Chats History',
        icon: <HistoryIcon svgStyle={svgStyle} />,
        route: 'Chat'
    }, {
        id: 1,
        name: 'Address',
        icon: <CustomPinIcon svgStyle={svgStyle} />,
        route: 'address'
    }, {
        id: 1,
        name: 'Payment Method',
        icon: <PayIcon svgStyle={svgStyle} />,
        route: 'Profile'
    }, {
        id: 1,
        name: 'Help Center',
        icon: <HelpIcon svgStyle={svgStyle} />,
        route: 'help-center'
    }, {
        id: 1,
        name: 'Hotline',
        icon: <PhoneIcon svgStyle={svgStyle} />,
        route: 'news-screen'
    }, {
        id: 1,
        name: 'About Us',
        icon: <HelpIcon svgStyle={svgStyle} />,
        route: 'Profile'
    }, {
        id: 1,
        name: userData ? 'Logout' : "Login",
        icon: userData ? <ExitIcon svgStyle={svgStyle} /> : <LoginIcon svgStyle={svgStyle} />,
        css: {
            color: userData ? theme.red : theme.text
        },
        route: 'logout'
    }]

    const goToRoute = (path) => {
        if (path && path == 'logout') {
            mapDispatchToProps({ userData: null, token: null, userFavourite: [] })
            navigation.replace('auth-stack', { screen: 'login-screen' });
            return
        } else if (!userData && loginPaths.includes(path)) {
            showFlashMessage("error", 'Please login to explore')
        } else {
            navigation.navigate(path)
        }
    }

    const goToProfile = () => {
        if(userData){
            navigation.navigate('edit-profile')
        }else{
            showFlashMessage("error", "Please login to explore")
        }
    }
    return (
        <WrapperContainer>
            <CustomHeader text={"Profile"} />
            <View style={styles.innerContainer}>
                <TouchableOpacity
                    style={styles.card}
                    activeOpacity={0.95}
                    onPress={() => goToProfile()}>
                    <View style={styles.profileIcon}>
                        <Image source={userData?.image ? { uri: userData?.image } : profile_placeholder} style={styles.img} />
                    </View>
                    <View style={styles.textView}>
                        <Text style={styles.name}>
                            {userData ? userData?.name : "Hi Guest"}
                        </Text>
                        <Text style={styles.number}>
                            {userData ? userData?.phone : ''}
                        </Text>
                    </View>
                    <View style={styles.forwardArrow}>
                        <ForwardArrowIcon />
                    </View>
                </TouchableOpacity>
                <ScrollView showsVerticalScrollIndicator={false}>
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
                                <Text style={[styles.text, { ...el.css }]}>
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
        top: -50,
        padding: 10,
        zIndex: 100,
        borderRadius: 16,
        marginHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
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
    profileIcon: {
        height: 64,
        width: 64,
        borderRadius: 16
    },
    img: {
        height: '100%',
        width: '100%',
        borderRadius: 16
    },
    textView: {
        flex: 1,
        marginHorizontal: 10
    },
    name: {
        fontFamily: Fonts.bold,
        fontSize: 16,
        color: theme.textBlack
    },
    number: {
        fontFamily: Fonts.medium,
        fontSize: 14,
        color: theme.textGray
    },
    forwardArrow: {
        height: 32,
        width: 32
    },
    list: {
        marginTop: 50,
        marginBottom: 20,
        borderRadius: 16,
        padding: 15,
        flex: 1,
        marginHorizontal: 15,
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
        paddingBottom: 20
    },
    icon: {
        height: 24,
        width: 24
    },
    text: {
        flex: 1,
        marginLeft: 15,
        fontFamily: Fonts.medium,
        fontSize: 16,
        color: theme.text
    }
})