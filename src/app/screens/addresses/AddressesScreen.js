import React, { useState, useEffect } from 'react';
import {
    View,
    FlatList,
    StyleSheet
} from 'react-native';
import WrapperContainer from '../../components/Wrapper/WrapperContainer';
import HeaderWithBackButton from '../../components/Headers/HeaderWithBackButton';
import AddressesList from './AddressesList';
import Button from '../../components/Buttons/Button';
import { theme } from '../../utils/colors';
import { useDispatch, useSelector } from 'react-redux';
import { isNullRetNull } from '../../helper/helper';
import { EmptyList } from '../../components/Exception/EmptyList';
import { showFlashMessage } from '../../utils/Toast';
import { postUpdateProfile } from '../../services/api';
import ModalLoader from '../../components/Modal/ModalLoader';
import WrapperContainer1 from '../../components/Wrapper/WrapperContainer1';

const AddressesScreen = ({ navigation }) => {

    const { userData } = useSelector(state => state.userReducer)

    const dispatch = useDispatch()

    const mapDispatchToProps = (value) => {
        dispatch({ type: 'update_redux', payload: value });
    };


    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (isNullRetNull(userData.addresses, false)) {
            let parse = JSON.parse(userData.addresses)
            setData(parse);
        } else {
            console.log("else=======");
        }
    }, [userData])

    const goToEdit = () => {
        navigation.navigate('update-address')
    }

    const onDelete = async (item) => {
        try {
            setLoading(true)
            let filter = data.filter((el) => el?.uid !== item?.uid)
            let body = { "addresses": JSON.stringify(filter) }
            let updateUser = await postUpdateProfile(body)
            mapDispatchToProps({ userData: { ...userData, ...updateUser?.result?.data } })
            showFlashMessage("success", "Your Address has been deleted");
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }

    return (
        <WrapperContainer1>
            <HeaderWithBackButton text={"Address"} />
            <View style={styles.innerContainer}>
                <ModalLoader loading={loading} />
                {!!!data?.length && <EmptyList text={"There is no save addresses"} />}
                {!!data?.length &&
                    <FlatList
                        data={data}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => <AddressesList data={item} address={data} onDelete={onDelete} />}
                    />
                }
                <View style={styles.footer}>
                    <Button title={"Add New address"} onPress={() => goToEdit(false)} />
                </View>
            </View>
        </WrapperContainer1>
    )
}

export default AddressesScreen

const styles = StyleSheet.create({
    innerContainer: {
        flex: 1,
    },
    footer: {
        backgroundColor: theme.bg,
        paddingHorizontal: 15,
        borderRadius: 16,
        // height: 72,
        marginVertical: 20,
        justifyContent: 'center',
        marginHorizontal: 15
    }
})