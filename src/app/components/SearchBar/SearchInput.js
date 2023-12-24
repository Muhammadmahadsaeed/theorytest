import React from 'react';
import {
    View,
    TextInput,
    StyleSheet
} from 'react-native';
import { SearchGreenIcon } from '../../utils/images';
import { theme } from '../../utils/colors';
import { Fonts } from '../../utils/fonts';
import BackButton from '../Headers/BackArrow';

const SearchInput = ({onSearch, customStyle = {}, isBack = false }) => {

    const onChange = (value) => {
        onSearch(value)
    }


    return (
        <View style={[styles.inputContainer, { ...customStyle }]}>
            {isBack ?
                <View style={styles.icon}>
                    <BackButton />
                </View>
                :
                null
            }
            <TextInput
                style={styles.inputStyle}
                placeholder='Search'
                placeholderTextColor={theme.gray}
                onChangeText={(e) => onChange(e)}
            />
            <View style={styles.rightIcon}>
                <SearchGreenIcon svgStyle={styles.svgStyle} />
            </View>
        </View>
    )
}

export default SearchInput

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 15,
        alignSelf: 'center',
        backgroundColor: theme.searchFieldBg,
        height: 44,
        borderRadius: 16,
    },
    icon: {
        height: 35,
        width: 35,
        justifyContent: 'center'
    },
    rightIcon: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    svgStyle: {
        height: 20,
        width: 20
    },
    inputStyle: {
        flex: 1,
        borderRadius: 16,
        backgroundColor: theme.searchFieldBg,
        fontFamily: Fonts.medium,
        fontSize: 14,
        color: theme.textBlack,
        marginLeft: 15
    }
})