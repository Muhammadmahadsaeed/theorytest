import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import * as Location from 'expo-location';
import { useDispatch, useSelector } from 'react-redux';
import { Fonts } from '../../utils/fonts';
import { darkBlue, theme, white } from '../../utils/colors';
import SearchBar from '../../components/SearchBar/SearchBarForAddress';
import MapComponent from '../../components/Map/MapComponent';
import { EmptyList } from '../../components/Exception/EmptyList';
import { Loading } from '../../components/Loading/Loading';
import { decodeAddressByLocation, decodeAddressBySearch } from '../../helper/AddressByLocation';
import WrapperContainer from '../../components/Wrapper/WrapperContainer';
import WrapperContainer1 from '../../components/Wrapper/WrapperContainer1';


const LocationScreen = ({ navigation, route }) => {

    const [location, setLocation] = useState({ latitude: 24.265762, longitude: 55.753336 });
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(true)
    const [markers, setMarkers] = useState([])
    const [address, setAddress] = useState(null)

    let { params } = route || {}

    const dispatch = useDispatch();
    const { currentLocation } = useSelector(state => state.userReducer);

    const mapDispatchToProps = (value) => {
        dispatch({ type: 'update_redux', payload: value });
    };

    useEffect(() => {
        if (params?.route !== 'home' && params?.params !== 'manual') {
            getLocation()
        } else {
            setLoading(false)
            setLocation({ latitude: currentLocation?.lat, longitude: currentLocation?.lng });
            setAddress(currentLocation)
        }
    }, [])

    const getLocation = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location?.coords);
            getAddress(location?.coords)
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }

    const onSearch = async (place, details) => {
        setLoading(true)
        try {
            let response = await decodeAddressBySearch(details)
            setLocation({ latitude: response.lat, longitude: response.lng })
            setAddress(response)
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }


    const getAddress = async (location) => {
        try {
            let address = await decodeAddressByLocation(location.latitude, location.longitude)
            setAddress(address);
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }



    const requestForPermission = () => {

    }

    const onConfirm = () => {
        mapDispatchToProps({ currentLocation: address })
        navigation.replace('bottom-tab')
    }


    return (
        <WrapperContainer1>
            <View style={styles.innerContainer}>
                <View style={styles.header}>
                    <SearchBar
                        onSearch={onSearch}
                        customStyle={{
                            alignSelf: 'center',
                            marginTop: 10,
                            position: 'absolute'
                        }} />
                </View>
                {loading && !errorMsg && <Loading color={darkBlue} size={60} />}
                {!loading && !errorMsg &&
                    <MapComponent
                        location={location}
                        markers={markers}
                        getAddress={getAddress} />}
                {!loading && errorMsg && <EmptyList text={errorMsg} />}
                <View style={styles.footer}>
                    <TouchableOpacity
                        style={styles.btn(address, theme.buttonBgDark)}
                        activeOpacity={0.95}>
                        <Text style={styles.btnText}>
                            Click here to allow location
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.btn1(address)}
                        activeOpacity={0.95}
                        disabled={!address}
                        onPress={() => onConfirm()}>
                        <Text style={styles.btnText}>
                            Confirm Location
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </WrapperContainer1>
    )
}

export default LocationScreen


const styles = ({
    innerContainer: {
        flex: 1
    },
    header: {
        zIndex: 1000,
        backgroundColor: white,
        height: 70,
        paddingHorizontal: 10,
        position: 'relative'
    },

    footer: {
        bottom: 0,
        position: 'absolute',
        width: '100%',
        backgroundColor: theme.bg,
        width: '100%',
        padding: 15,
        shadowOpacity: 0.23,
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: -3,
        },
        shadowColor: "#000",
        elevation: 4,
    },

    btn: (value, bg) => ({
        backgroundColor: bg ? bg : theme.buttonBg,
        height: 44,
        width: '100%',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    }),
    btn1: (value, bg) => ({
        backgroundColor: bg ? bg : theme.buttonBg,
        height: 44,
        width: '100%',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        opacity: value ? 1 : 0.4
    }),
    btnText: {
        fontFamily: Fonts.medium,
        fontSize: 16,
        color: theme.textWhite
    },
})