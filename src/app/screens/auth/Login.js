import React, { useEffect, useRef, useState, useMemo } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Platform
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import WrapperContainer from '../../components/Wrapper/WrapperContainer';
import CustomHeader from '../../components/Headers/CustomHeader';
import { theme } from '../../utils/colors';
import Button from '../../components/Buttons/Button';
import { Fonts } from '../../utils/fonts';
import { FacebookIcon, GoogleIcon } from '../../utils/images';
import PhoneInput from '../../components/Inputs/PhoneInput';
import { useDispatch } from 'react-redux';
import { postGoogleLogin, postLogin } from '../../services/api';
import { ANDROID_CLIENT_ID_GOOGLE, ANDROID_CLIENT_SECRET_GOOGLE, EXPO_CLIENT_ID, GOOGLE_LOGIN_USER_INFO, IOS_CLIENT_ID_GOOGLE, REDIRECT_URI, db } from '../../services/constants';
import ModalLoader from '../../components/Modal/ModalLoader';
import { showFlashMessage } from '../../utils/Toast';

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation, route }) => {

    const phoneInput = useRef(null);
    const { params } = route || {}

    const dispatch = useDispatch();

    const mapDispatchToProps = (value) => {
        dispatch({ type: 'update_redux', payload: value });
    };


    const [request, response, promptAsync] = Google.useAuthRequest(
        {
            androidClientId: ANDROID_CLIENT_ID_GOOGLE,
            clientId: ANDROID_CLIENT_ID_GOOGLE,
            expoClientId: EXPO_CLIENT_ID,
            iosClientId: IOS_CLIENT_ID_GOOGLE,
        },
    );

    const [state, setState] = useState({})
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [userinfo, setUserInfo] = useState(null);
    const [modalLoading, setModalLoading] = useState(false)

    useEffect(() => {
        if (response?.type === "success" && !userinfo) {
            googleSignUp(response);
        }
    }, [response])

    const googleSignUp = async (response) => {
        if (response?.type === 'success') {
            setModalLoading(true)
            setUserInfo(response)
            const { authentication } = response
            try {
                let body = {
                    "jsonrpc": "2.0",
                    "params": {
                        "device": Platform.OS == "ios" ? "ios" : "android",
                        "idToken": authentication.idToken
                    }
                }
                let result = await postGoogleLogin(body)
                if (result?.result?.status) {
                    setModalLoading(false)
                    mapDispatchToProps({
                        userData: result?.result?.data,
                        token: result?.result?.token,
                        userFavourite: result?.result?.data?.favourite_salons
                    })
                    navigation.replace('bottom-tab')
                }

            } catch (error) {

            } finally {
               
            }
        } else {
            showFlashMessage("error", "Something went wrong")
        }

    }

    const goToOTP = async () => {
        try {
            setLoading(true)
            let response = await postLogin({
                "phone": `+971${state['phone']}`,
                "type": "login",
                "dev": true
            })
            if (response?.result?.message?.includes('Otp sent, please check your phone for otp.')) {
                navigation.navigate('otp-screen', {
                    ...params,
                    ...response?.result,
                    fromRoute: 'login'
                })
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    const onChangeText = (text, name) => {
        setState({ ...state, [name]: text })
    }

    return (
        <WrapperContainer>
            <CustomHeader
                path={"bottom-tab"}
                text={"Login"}
                isLeft={true}
                customStyle={{ height: 260 }} />
                <ModalLoader loading={modalLoading} />
            <View style={styles.container}>
                <View style={styles.card}>
                    <View style={styles.cardInner}>
                        <Text style={styles.label}>
                            Email or phone number
                        </Text>
                        <PhoneInput onChangeText={onChangeText} state={state} />
                    </View>
                    <View style={styles.footer}>
                        <Button
                            title={"Confirm"}
                            onPress={goToOTP}
                            loading={loading} />
                    </View>
                </View>
                <View style={styles.seperatorView}>
                    <View style={styles.row}>
                        <View style={styles.line} />
                        <Text style={styles.orText}>
                            Or
                        </Text>
                        <View style={styles.line} />
                    </View>
                    <View style={styles.row0}>
                        <TouchableOpacity
                            style={styles.btn}
                            activeOpacity={0.95}>
                            <View style={styles.icon}>
                                <FacebookIcon />
                            </View>
                            <Text style={styles.btnText}>
                                Facebook
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.btn, { marginLeft: 20 }]}
                            activeOpacity={0.95}
                            onPress={() => promptAsync({ showInRecents: true })}>
                            <View style={styles.icon}>
                                <GoogleIcon />
                            </View>
                            <Text style={styles.btnText}>
                                Google
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[styles.seperatorView, { justifyContent: 'flex-end' }]}>
                    <View style={styles.bottomView}>
                        <Text style={styles.bottomText}>
                            Don’t have an account?
                        </Text>
                        <TouchableOpacity
                            style={[styles.bottomBtn]}
                            activeOpacity={0.95}
                            onPress={() => navigation.navigate('register')}>
                            <Text style={styles.bottomBtnText}>
                                Sign up now!
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            
        </WrapperContainer>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        flex: 1,
        width: '100%',
        backgroundColor: theme.bg,
        position: 'absolute',
        top: -100,
        zIndex: 1,
        width: '90%',
        alignSelf: 'center',
        borderRadius: 16,
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    cardInner: {
        paddingHorizontal: 20,
        marginTop: 20,
        marginBottom: 70
    },
    label: {
        fontSize: 14,
        fontFamily: Fonts.bold,
        color: theme.textGray,
        marginBottom: 15
    },
    containerStyle: {
        borderWidth: 1,
        borderColor: theme.borderColor,
        backgroundColor: theme.bg,
        borderRadius: 16,
        height: 44
    },
    textContainerStyle: {
        // height: 44,
        borderTopRightRadius: 16,
        borderBottomRightRadius: 16,
        backgroundColor: theme.bg,
        borderLeftWidth: 5,
        borderLeftColor: theme.borderColor,

    },
    textInputStyle: {
        height: 44,
        flex: 1,
        backgroundColor: 'pink',
        fontSize: 16,
        fontFamily: Fonts.medium,
        color: theme.gray,
    },
    codeTextStyle: {
        height: 44,
        textAlignVertical: 'center',
        fontSize: 13,
        fontFamily: Fonts.medium,
        color: theme.textBlue,
        ...Platform.select({
            ios: {
                lineHeight: 44 // as same as height
            },
            android: {}
        })

    },
    footer: {
        width: '90%',
        alignSelf: 'center',
        position: 'absolute',
        bottom: -20
    },
    seperatorView: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 70,
        marginBottom: 20
    },
    row0: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    line: {
        width: 70,
        height: 1,
        backgroundColor: theme.backgroundGray
    },
    orText: {
        fontFamily: Fonts.medium,
        fontSize: 14,
        color: theme.textGray,
        marginHorizontal: 10,
    },
    icon: {
        height: 18,
        width: 18
    },
    btn: {
        height: 42,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        width: '42%',
        backgroundColor: theme.bg,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    btnText: {
        fontFamily: Fonts.medium,
        fontSize: 12,
        color: theme.textGray,
        marginLeft: 10
    },
    bottomView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30
    },
    bottomText: {
        color: theme.textGray,
        fontFamily: Fonts.medium,
        fontSize: 14
    },
    bottomBtn: {
        paddingHorizontal: 10,
        paddingVertical: 8
    },
    bottomBtnText: {
        color: theme.buttonBgDark,
        fontFamily: Fonts.bold,
        fontSize: 14
    }
})