import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import { Fonts } from '../../utils/fonts';
import { theme } from '../../utils/colors';
import { AddressBookIcon, PlusCircleIcon } from '../../utils/images';
import { capitalizeFirstLetter } from '../../helper/helper';

const { width, height } = Dimensions.get('window')

const AddressCard = ({
    data,
    onPress,
    customStyle = {},
    selectedAddress = {},
}) => {

   

    return (
        <TouchableOpacity
            style={[styles.row0(selectedAddress?.uid == data?.uid), customStyle]}
            activeOpacity={0.95}
            onPress={() => onPress(data)}>
            {data?.name == 'new' ?
                <View style={styles.row01}>
                    <View style={styles.icon}>
                        <PlusCircleIcon />
                    </View>
                    <Text style={styles.text00} numberOfLines={2}>
                        Add new
                    </Text>
                </View>
                :
                <>
                    <View style={styles.imageView}>
                        <AddressBookIcon />
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.text00} numberOfLines={2}>
                            {capitalizeFirstLetter(data?.address)}
                        </Text>
                        <Text style={styles.text01} numberOfLines={1}>
                            {data?.city}
                        </Text>
                    </View>
                </>
            }

        </TouchableOpacity>
    )

}

export default AddressCard

const styles = StyleSheet.create({
    row0: (is) => ({
        width: width * 0.8,
        marginHorizontal: 5,
        marginBottom: 20,
        marginTop: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.bg,
        borderRadius: 16,
        borderWidth: is ? 1.5 : 0,
        borderColor: is ? theme.borderPurple : 'transparent',
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    }),
    imageView: {
        height: 55,
        width: 55,
        borderRadius: 16,
    },
    content: {
        flex: 1,
        marginLeft: 10,
    },
    row01: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center'
    },
    icon: {
        height: 55,
        width: 55,
        marginBottom: 10
    },
    text00: {
        fontSize: 16,
        fontFamily: Fonts.bold,
        color: theme.text
    },
    text01: {
        fontFamily: Fonts.medium,
        fontSize: 14,
        color: theme.textGray,
        marginTop: 10
    }

})