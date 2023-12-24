import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native';
import OTPTextInput from "react-native-otp-textinput";
import WrapperContainer from '../../components/Wrapper/WrapperContainer';
import CustomHeader from '../../components/Headers/CustomHeader';
import Button from '../../components/Buttons/Button';
import { theme } from '../../utils/colors';
import { Fonts } from '../../utils/fonts';
import { postVerifyOtp } from '../../services/api';
import { useDispatch, useSelector } from 'react-redux';

const OTPScreen = ({ navigation, route }) => {

    let otpInput = useRef(null);
    const dispatch = useDispatch();
    let { currentLocation } = useSelector((state) => state.userReducer);

    const mapDispatchToProps = (value) => {
        dispatch({ type: 'update_redux', payload: value });
    };

    let { params } = route || {}

    const [otp, setOtp] = useState("");
    const [errors, setErrors] = useState(false)
    const [text, setText] = useState("")
    const [isDisable, setIsDisable] = useState(false)

    const handleChange = (otp) => {
        setOtp(otp)
    }

    const onVerifyOtp = async () => {
        if (otp.length == 4 && otp == params?.otp) {
            let body = { "otp": otp.toString() }
            setIsDisable(true)
            try {
                let response = await postVerifyOtp(body, params?.token)
                if (response?.result?.status) {
                    mapDispatchToProps({
                        userData: response?.result?.data,
                        token: response?.result?.token,
                        userFavourite: response?.result?.data?.favourite_salons
                    })
                    if (params?.fromRoute == 'login') {
                        navigation.replace('bottom-tab')
                        return
                    }
                    navigation.replace('bottom-tab', {
                        screen: 'Profile',
                        params: {
                            screen: 'edit-profile',
                            params: {
                                isRoute: 'signup'
                            }
                        }
                    })
                } else {
                    setErrors(true)
                    setText(response?.result?.message)
                }
            } catch (error) {
            } finally {
                setIsDisable(false)
            }
        }
        else {
            setIsDisable(false)
            setErrors(true)
            setText("Invalid code")
        }
    }

    return (
        <WrapperContainer>
            <CustomHeader
                text={"Verify Your Number"}
                isLeft={true}
                customStyle={{ height: 260 }}
                params={params}
                isOtp={true} />
            <View style={styles.innerContainer}>
                <View style={styles.card}>
                    <View style={styles.cardInner}>
                        <Text style={styles.label}>
                            Enter the verify number that sent to your phone recently.
                        </Text>
                        <OTPTextInput
                            ref={otpInput}
                            textInputStyle={styles.textInputStyle}
                            offTintColor={theme.borderColor1}
                            handleTextChange={handleChange} />
                        {errors &&
                            <Text style={styles.errText}>
                                {text}
                            </Text>
                        }
                    </View>
                    <View style={styles.footer}>
                        <Button
                            loading={isDisable}
                            title={"Confirm"}
                            onPress={() => onVerifyOtp()} />
                    </View>
                </View>
                <View style={[styles.seperatorView, { justifyContent: 'flex-end' }]}>
                    <View style={styles.bottomView}>
                        <TouchableOpacity
                            style={[styles.bottomBtn]}
                            activeOpacity={0.95}
                        >
                            <Text style={styles.bottomBtnText}>
                                Resend
                            </Text>
                        </TouchableOpacity>
                        <Text style={styles.bottomText}>
                            (00:39)
                        </Text>
                    </View>
                </View>
            </View>
        </WrapperContainer>
    )
}

export default OTPScreen

const styles = StyleSheet.create({
    innerContainer: {
        flex: 1,
    },
    card: {
        flex: 1,
        width: '100%',
        backgroundColor: theme.bg,
        position: 'absolute',
        top: -100,
        zIndex: 100,
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
        fontFamily: Fonts.medium,
        color: theme.textGray,
        marginBottom: 15,
        textAlign: 'center'
    },
    textInputStyle: {
        borderWidth: 1,
        borderColor: theme.borderColor1,
        borderRadius: 10,
        borderBottomWidth: 1,
        fontSize: 16,
        fontFamily: Fonts.bold,
        color: theme.textBlack,
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
    bottomView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30
    },
    bottomText: {
        color: theme.textBlue,
        fontFamily: Fonts.medium,
        fontSize: 14
    },
    bottomBtn: {
        marginLeft: 10
    },
    bottomBtnText: {
        color: theme.textBlue,
        fontFamily: Fonts.bold,
        fontSize: 14
    },
    errText: {
        fontFamily: Fonts.medium,
        color: theme.red,
        fontSize: 16
    }
})