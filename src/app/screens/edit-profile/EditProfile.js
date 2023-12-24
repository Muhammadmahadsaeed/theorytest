import React, { useState } from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    Image,
    Text,
    ScrollView,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import moment from 'moment';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DropDownPicker from 'react-native-dropdown-picker';
import CustomHeader from '../../components/Headers/CustomHeader';
import { CalenderBlueIcon, CameraBlackIcon, profile_placeholder } from '../../utils/images';
import { theme } from '../../utils/colors'
import { Fonts } from '../../utils/fonts';
import WrapperContainer1 from '../../components/Wrapper/WrapperContainer1';
import Button from '../../components/Buttons/Button';
import { useDispatch, useSelector } from 'react-redux';
import { isObjEmpty } from '../../helper/helper';
import { postUpdateProfile } from '../../services/api';
import { showFlashMessage } from '../../utils/Toast';
import withAuth from '../../utils/withAuth';

const EditProfile = ({ navigation, route }) => {

    let { params } = route || {}
    const dispatch = useDispatch()
    const { userData } = useSelector(state => state.userReducer)

    const mapDispatchToProps = (value) => {
        dispatch({ type: 'update_redux', payload: value });
    };

    const [state, setState] = useState(params?.isRoute == 'signup' ? {} : userData)
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(userData?.gender || null);
    const [items, setItems] = useState([
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' }
    ]);
    const [image, setImage] = useState({})
    const [base64, setBase64] = useState(null)
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(userData?.date_of_birth || '')

    const onChangeText = (text, name) => {
        setState({ ...state, [name]: text })
    }

    const goToHome = async () => {
        try {
            setLoading(true)
            state["gender"] = value
            let body = {
                "name": state["name"],
                "password": state["password"] || false,
                "customer_notification_token": "",
                "phone": state["phone"] || userData["phone"],
                "image": base64 ? base64 : false,
                "gender": value ? value : false,
                "date_of_birth": selectedDate ? selectedDate : false
            }
            let response = await postUpdateProfile(body)
            if (response?.result?.status) {
                mapDispatchToProps({ userData: { ...userData, ...response?.result?.data } })
                showFlashMessage("success", response?.result?.message)
                params?.isRoute == 'signup' ? navigation.replace('bottom-tab') : navigation.goBack()
            } else {
                showFlashMessage("error", response?.result?.message)
            }
        } catch (error) {

        } finally {
            setLoading(false)
        }

    }

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setSelectedDate(moment(date).format("YYYY-MM-DD"))
        hideDatePicker();
    };


    const handleBannerChange = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
                allowsEditing: true,
                base64: true
            });
            if (!result.canceled) {
                // setBase64("data:image/jpeg;base64," + result.assets[0].base64);
                setBase64(result.assets[0].base64)
                setImage(result.assets[0]?.uri);
            }
        } catch (error) {

        }
    };

    return (
        <WrapperContainer1>
            <CustomHeader
                text={"Information Profile"}
                isRight={false}
                isLeft={params?.isRoute == 'signup' ? false : true}
                type={true} />
            <View style={styles.innerContainer}>
                <View style={styles.profileCircle}>
                    <View style={styles.imgView}>
                        <Image source={!isObjEmpty(image) && { uri: image } || userData?.image && { uri: userData?.image } || profile_placeholder} style={styles.img} />
                    </View>
                    <TouchableOpacity
                        style={styles.cameraIcon}
                        activeOpacity={0.8}
                        onPress={() => handleBannerChange()}>
                        <CameraBlackIcon svgStyle={styles.svgStyle} />
                    </TouchableOpacity>

                </View>
                <View style={[styles.innerContainer, { marginTop: 50, paddingHorizontal: 20 }]}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <KeyboardAvoidingView>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>
                                    First name & Last name
                                </Text>
                                <View style={styles.inputBox}>
                                    <TextInput
                                        style={styles.inputStyle}
                                        placeholder='Full name'
                                        onChangeText={text => onChangeText(text, 'name')}
                                        value={state['name'] || ''}
                                    />
                                </View>
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>
                                    Gender
                                </Text>
                                <DropDownPicker
                                    open={open}
                                    value={value}
                                    items={items}
                                    zIndex={1000}
                                    setOpen={setOpen}
                                    setValue={setValue}
                                    setItems={setItems}
                                    closeOnBackPressed
                                    disableBorderRadius={true}
                                    placeholder={'Male'}
                                    placeholderStyle={{
                                        color: theme.gray,
                                        fontFamily: Fonts.medium
                                    }}
                                    dropDownContainerStyle={{
                                        borderWidth: 1,
                                        borderColor: theme.borderColor,
                                        height: 100
                                    }}
                                    listItemContainerStyle={styles.listItemContainerStyle}
                                    listMode='SCROLLVIEW'
                                    props={{
                                        activeOpacity: 0.95,
                                        style: {
                                            ...styles.inputBox
                                        }
                                    }}
                                    textStyle={styles.inputStyle}
                                    style={styles.inputBox}
                                />
                            </View>
                            <View style={[styles.inputContainer, { zIndex: -1000 }]}>
                                <Text style={styles.label}>
                                    Date of birth
                                </Text>
                                <TouchableOpacity
                                    style={styles.inputBox}
                                    activeOpacity={0.8}
                                    onPress={() => setDatePickerVisibility(!isDatePickerVisible)}>
                                    <TextInput
                                        style={styles.inputStyle}
                                        placeholder='1988/04/29'
                                        editable={false}
                                        value={moment(selectedDate).format("DD/MM/YYYY")}
                                    />
                                    <View style={styles.icon} >
                                        <CalenderBlueIcon />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>
                                    Phone number
                                </Text>
                                <View style={styles.inputBox}>
                                    <TextInput
                                        style={styles.inputStyle}
                                        placeholder='052 9940 595'
                                        keyboardType='number-pad'
                                        editable={false}
                                        value={state['phone'] || userData["phone"]}
                                    />
                                </View>
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>
                                    Email
                                </Text>
                                <View style={styles.inputBox}>
                                    <TextInput
                                        style={styles.inputStyle}
                                        placeholder='Email address'
                                        value={state['email'] || ''}
                                        onChangeText={text => onChangeText(text, 'email')}
                                    />
                                </View>
                            </View>
                            <View style={styles.footer}>
                                <Button
                                    title={"Save"}
                                    loading={loading}
                                    onPress={goToHome} />
                            </View>
                        </KeyboardAvoidingView>

                    </ScrollView>
                </View>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    display='spinner'
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
            </View>
        </WrapperContainer1>
    )
}

export default withAuth(EditProfile)

const styles = StyleSheet.create({

    innerContainer: {
        flex: 1
    },
    profileCircle: {
        height: 100,
        width: 100,
        borderRadius: 100,
        borderWidth: 2,
        backgroundColor: theme.searchFieldBg,
        borderColor: theme.textWhite,
        position: 'absolute',
        top: -50,
        alignSelf: 'center'
    },
    img: {
        height: '100%',
        width: '100%',
        borderRadius: 100
    },
    cameraIcon: {
        height: 40,
        width: 40,
        backgroundColor: theme.bg,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 5,
        right: -8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    svgStyle: {
        height: 20,
        width: 20
    },
    inputContainer: {
        marginTop: 20,
        // zIndex: -100
    },
    label: {
        fontSize: 14,
        fontFamily: Fonts.medium,
        color: theme.textGray
    },
    inputBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        height: 44,
        borderWidth: 1,
        borderColor: theme.borderColor,
        borderRadius: 16,
        marginTop: 8,
    },
    inputStyle: {
        flex: 1,
        fontFamily: Fonts.medium,
        fontSize: 16,
        color: theme.inputText
    },
    listItemContainerStyle: {
        backgroundColor: theme.bg,
        zIndex: 1000,
    },
    icon: {
        height: 18,
        width: 18
    },
    footer: {
        backgroundColor: theme.bg,
        borderRadius: 16,
        marginTop: 50,
        marginBottom: 20,
        justifyContent: 'center',
    }
})