import React, { useEffect, useState, useCallback, useMemo } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    KeyboardAvoidingView,
    TextInput,
    Text,
    TouchableOpacity
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import WrapperContainer1 from '../../components/Wrapper/WrapperContainer1';
import HeaderWithBackButton from '../../components/Headers/HeaderWithBackButton';
import { Fonts } from '../../utils/fonts';
import { theme } from '../../utils/colors';
import DropDownComponent from '../../components/DropDownComponent/DropDownComponent';
import MapComponent from '../../components/Map/MapComponent';
import CheckBoxComponent from '../../components/CheckBox/CheckBox';
import { create_UUID, isObjEmpty } from '../../helper/helper';
import Button from '../../components/Buttons/Button';
import { decodeAddressByLocation } from '../../helper/AddressByLocation';
import { postUpdateProfile } from '../../services/api';
import { showFlashMessage } from '../../utils/Toast';

const country_state_city = require('country-state-city')
let countryCode = 'AE'

const UpdateAddress = ({ navigation, route }) => {

    const { params } = route || {}

    const dispatch = useDispatch()

    let { currentLocation, userData } = useSelector((state) => state.userReducer);

    const mapDispatchToProps = (value) => {
        dispatch({ type: 'update_redux', payload: value });
    };

    const [stateArray, setStateArray] = useState([]);
    const [cityArray, setCityArray] = useState([]);
    const [countryOpen, setCountryOpen] = useState(false);
    const [cityOpen, setCityOpen] = useState(false);
    const [areaOpen, setAreaOpen] = useState(false);
    const [countryValue, setCountryValue] = useState(params?.state || null);
    const [cityValue, setCityValue] = useState(params?.city || null);
    const [countryObj, setCountryObj] = useState({})
    const [cityObj, setCityObj] = useState({})
    const [isChecked, setIsChecked] = useState(false)
    const [address, setAddress] = useState(null)
    const [loading, setLoading] = useState(false)
    const [state, setState] = useState({})

    const { City, State } = country_state_city

    useEffect(() => {
        getProvince(countryCode)
    }, [])

    const getProvince = (code) => {
        let stateOptions = State.getStatesOfCountry(code)
        let state = stateOptions.map((elm, index) => ({
            id: index,
            value: elm.name,
            label: elm.name,
            stateCode: elm.isoCode,
            latitude: elm.latitude,
            longitude: elm.longitude
        }))
        if(params){
            const matchingObject = state.find(item => item?.value?.includes(params?.state));
            setCountryValue(matchingObject?.value)
            setCountryObj(matchingObject)
        }
        setStateArray(state)
    }

    const onCountryOpen = useCallback(() => {
        setCityOpen(false);
        setAreaOpen(false)
    }, []);

    const onCityOpen = useCallback(() => {
        setCountryOpen(false);
        setAreaOpen(false)
    }, []);

    const getCities = useMemo(() => {
        if (!isObjEmpty(countryObj)) {
            let cityOptions = City.getCitiesOfState(countryCode, countryObj.stateCode)
            let cities = cityOptions.map((elm, index) => ({
                id: index,
                value: elm.name,
                label: elm.name,
                stateCode: elm.isoCode,
                latitude: elm.latitude,
                longitude: elm.longitude
            }))
            if(params){
                const matchingObject = cities.find(item => item?.value?.includes(params?.city));
                setCityValue(matchingObject?.value)
                setCityObj(matchingObject)
            }
            setCityArray(cities)
        } else return []
    }, [countryObj])

    const handleOnChange = () => {
        setIsChecked(!isChecked)
    }

    const getAddress = async (location) => {
        try {
            let address = await decodeAddressByLocation(location?.latitude, location?.longitude)
            setAddress(address);
        } catch (error) {

        }
    }

    const onChangeText = (text, name) => {
        setState({ ...state, [name]: text })
    }

    const onAddress = async () => {
        try {
            setLoading(true)
            let address = await decodeAddressByLocation(cityObj?.latitude, cityObj?.longitude)
            address["uid"] = create_UUID()
            address['area'] = state['area']
            let userAddress = JSON.parse(userData?.addresses)
            let newAddress = !isChecked ? [...userAddress, { ...address }] : [{ ...address }, ...userAddress]
            let body = { "addresses": JSON.stringify(newAddress) }
            let updateUser = await postUpdateProfile(body)
            mapDispatchToProps({ userData: { ...userData, ...updateUser?.result?.data } })
            showFlashMessage("success", "Your Address has been added");
            navigation.goBack()
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    return (
        <WrapperContainer1>
            <HeaderWithBackButton text={"Address Updates"} />
            <View style={styles.innerContainer}>
                <View style={styles.card}>
                    <ScrollView
                        nestedScrollEnabled={true}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ flexGrow: 1 }}>
                        <KeyboardAvoidingView>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>
                                    First name & Last name
                                </Text>
                                <View style={styles.inputBox}>
                                    <TextInput
                                        style={styles.inputStyle}
                                        placeholder='Muhammad'
                                        value={userData?.name || ""}
                                        onChangeText={text => onChangeText(text, 'name')}
                                    />
                                </View>
                            </View>
                            <DropDownComponent
                                label={"State"}
                                zIndex={3000}
                                open={countryOpen}
                                setOpen={setCountryOpen}
                                onOpen={onCountryOpen}
                                zIndexInverse={1000}
                                items={stateArray}
                                value={countryValue}
                                setObj={setCountryObj}
                                setValue={setCountryValue}
                                setItems={setStateArray}
                            />
                            <DropDownComponent
                                label={"City"}
                                open={cityOpen}
                                onOpen={onCityOpen}
                                setOpen={setCityOpen}
                                zIndex={2000}
                                setObj={setCityObj}
                                zIndexInverse={2000}
                                items={cityArray}
                                value={cityValue}
                                setValue={setCityValue}
                                setItems={setCityArray}
                            />
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>
                                    Area
                                </Text>
                                <View style={styles.inputBox}>
                                    <TextInput
                                        style={styles.inputStyle}
                                        placeholder='Hili'
                                        value={state["area"] || ""}
                                        onChangeText={text => onChangeText(text, 'area')}
                                    />
                                </View>
                            </View>
                            {!isObjEmpty(cityObj) ?
                                <View style={styles.mapView}>
                                    <MapComponent
                                        location={isObjEmpty(cityObj) ? currentLocation : cityObj}
                                        getAddress={getAddress} />
                                </View>
                                :
                                null
                            }
                            <TouchableOpacity
                                style={styles.link}
                                activeOpacity={0.8}
                                onPress={() => handleOnChange()}>
                                <CheckBoxComponent
                                    handleOnChange={handleOnChange}
                                    isChecked={isChecked}
                                    style={{
                                        height: 25,
                                        width: 25,

                                    }}
                                />
                                <Text style={styles.linkText}>
                                    Select the address as default
                                </Text>
                            </TouchableOpacity>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
                <View style={styles.footer}>
                    <Button
                        disable={isObjEmpty(cityObj) ? true : false}
                        selected={isObjEmpty(cityObj) ? true : false}
                        title={"Save address"}
                        loading={loading}
                        onPress={onAddress} />
                </View>
            </View>
        </WrapperContainer1>
    )
}

export default UpdateAddress

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    innerContainer: {
        flex: 1,
        marginBottom: 20
    },
    card: {
        flex: 1,
        width: '92%',
        alignSelf: 'center',
        padding: 15,
        zIndex: 100,
        borderRadius: 16,
        margin: 15,
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
    inputContainer: {
        marginBottom: 15
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
    mapView: {
        height: 182
    },
    link: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20
    },
    linkText: {
        flex: 1,
        color: theme.textGray,
        fontFamily: Fonts.medium,
        fontSize: 14,
        marginLeft: 10
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '85%',
        zIndex: 100,
        alignSelf: 'center'
    }
})