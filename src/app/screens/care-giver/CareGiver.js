import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList
} from 'react-native';
import WrapperContainer from '../../components/Wrapper/WrapperContainer';
import HeaderWithBackButton from '../../components/Headers/HeaderWithBackButton';
import { Fonts } from '../../utils/fonts';
import { theme } from '../../utils/colors';
import CareGiverCard from '../../components/Cards/CareGiverCards';
import { useSelector } from 'react-redux';
import { getServiceByCategory, postSellerByTags } from '../../services/api';
import { Loading } from '../../components/Loading/Loading';
import { EmptyList } from '../../components/Exception/EmptyList';

const CareGiverScreen = ({ navigation, route }) => {

    const { currentLocation } = useSelector(state => state.userReducer);
    let params = route?.params || {}

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);
    const [errText, setErrText] = useState('');

    useEffect(() => {
        getServices()
    }, [])

    const getServices = async () => {
        try {
            let body = {
                "category_id": params?.id
            }
            let response = await getServiceByCategory(body)
            if (response?.result?.data?.length > 0) {
                setData(response?.result?.data)
            }
        } catch (error) {
            setErrText(error?.data?.message)
        }
        finally {
            setLoading(false)
        }
    }

    const onItemPress = (item) => {
        navigation.navigate('care-giver-detail', { ...item })
    }
    return (
        <WrapperContainer>
            <HeaderWithBackButton text={"Caregiver Information"} rightIcon={"search"} />
            <View style={styles.innerContainer}>
                <View style={styles.headingView}>
                    <Text style={styles.heading}>
                        {params?.name}
                    </Text>
                </View>
                {!!!data.length && loading && (
                    <Loading size={40} color={theme.black} />
                )}
                {!!data.length && !loading && (
                    <FlatList
                        data={data}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => <CareGiverCard data={item} onPress={onItemPress} />}
                    />
                )}
                {!!!data.length && !loading && (
                    <EmptyList text={errText} />
                )}

            </View>
        </WrapperContainer>
    )
}

export default CareGiverScreen

const styles = StyleSheet.create({
    innerContainer: {
        flex: 1,

    },
    headingView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20
    },
    heading: {
        fontSize: 18,
        fontFamily: Fonts.bold,
        color: theme.textBlack
    }
})