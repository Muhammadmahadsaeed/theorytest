import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { Fonts } from '../../utils/fonts';
import { theme } from '../../utils/colors';
import { MapPinIcon, MenuIcon } from '../../utils/images';
import MoreMenu from '../../components/MoreMenu/MoreMenu';
import { useNavigation } from '@react-navigation/native';

const AddressesList = ({ data, onDelete }) => {

    const navigation = useNavigation()

    const goToEdit = (item) => {
        navigation.navigate('update-address', { ...item })
    }

    return (
        <View style={styles.card}>
            <View style={styles.left}>
                <MapPinIcon />
            </View>
            <View style={styles.center}>
                <Text style={styles.address} numberOfLines={2}>
                    {data?.address} {"\n"} {data?.city}
                </Text>
            </View>
            <MoreMenu goToEdit={() => goToEdit(data)} onDelete={() => onDelete(data)} />
        </View>
    )
}

export default AddressesList

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundColor: theme.bg,
        borderRadius: 16,
        marginVertical: 10,
        marginHorizontal: 15,
        padding: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,

    },
    left: {
        height: 20,
        width: 20
    },
    center: {
        flex: 1,
        marginHorizontal: 10
    },
    address: {
        fontFamily: Fonts.medium,
        fontSize: 14,
        color: theme.textGray
    },

})