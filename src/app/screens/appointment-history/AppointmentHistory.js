import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList
} from 'react-native';
import { theme } from '../../utils/colors';
import CustomHeader from '../../components/Headers/CustomHeader';
import { AppointmentIcon } from '../../utils/images';
import { Fonts } from '../../utils/fonts';
import WrapperContainer from '../../components/Wrapper/WrapperContainer';
import { postAppointment } from '../../services/api';
import { useSelector } from 'react-redux';
import { Loading } from '../../components/Loading/Loading';
import { EmptyList } from '../../components/Exception/EmptyList';
import AppointmentHistoryList from './AppointmentHistoryList';


const AppointmentHistory = ({ navigation, route }) => {

    const { userData } = useSelector(state => state.userReducer)

    const [dataList, setDataList] = useState([])
    const [optionIndex, setOptionIndex] = useState(0)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setLoading(true)
            setDataList([])
            getAppointments()
        });
        return unsubscribe;

    }, [navigation])

    const getAppointments = async () => {
        try {
            let response = await postAppointment({})

            if (response?.result?.length > 0) {
                setDataList(response?.result)
            }
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }


    return (
        <WrapperContainer>
            <View style={styles.innerContainer}>
                <CustomHeader
                    text={"Schedule"}
                    path={'appointment'}
                    isLeft={true}
                    isRight={false} />
                <View style={styles.card}>
                    <View style={styles.cardIcon}>
                        <AppointmentIcon />
                    </View>
                    <Text style={styles.cardText}>
                        Appointments History
                    </Text>
                </View>
                <View style={styles.body}>
                    {!!!dataList.length && loading && <Loading color={theme.black} size={40} />}
                    {!!dataList.length && !loading &&
                        <View style={{ flex: 1 }}>
                            <FlatList
                                data={dataList}
                                showsVerticalScrollIndicator={false}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => <AppointmentHistoryList data={item} navigation={navigation} />}
                            />
                        </View>
                    }
                    {!!!dataList.length && !loading && <EmptyList text={"No appointments available"} />}
                </View>
            </View>
        </WrapperContainer>
    )

}

export default AppointmentHistory

const styles = ({
    innerContainer: {
        flex: 1,
    },
    card: {
        height: 114,
        width: '100%',
        backgroundColor: theme.bg,
        position: 'absolute',
        marginTop: 100,
        width: '90%',
        alignSelf: 'center',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    cardIcon: {
        height: 48,
        width: 48
    },
    cardText: {
        fontSize: 14,
        color: theme.textBlack,
        fontFamily: Fonts.bold,
        marginTop: 10
    },
    body: {
        flex: 1,
        marginTop: 50
    }

})