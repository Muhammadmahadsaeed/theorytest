import React, { useState } from 'react';
import { StyleSheet, View, Text } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import { theme } from '../../utils/colors';
import { Fonts } from '../../utils/fonts';

const DropDownComponent = ({
    setItems,
    label,
    setOpen,
    items,
    setValue,
    value,
    zIndex,
    zIndexInverse,
    onOpen,
    open,
    setObj
}) => {

    return (
        <View style={styles.inputContainer(zIndex)}>
            <Text style={styles.label}>
                {label}
            </Text>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                onOpen={onOpen}
                zIndex={zIndex}
                // maxHeight={"auto"}
                zIndexInverse={zIndexInverse}
                closeOnBackPressed
                disableBorderRadius={true}
                placeholder={label}
                onSelectItem={(item) => {
                    setObj(item)
                }}
                itemProps={{
                    activeOpacity: 0.8,
                    
                }}
                placeholderStyle={{
                    color: theme.gray,
                    fontFamily: Fonts.medium
                }}
                dropDownContainerStyle={{
                    borderWidth: 1,
                    borderColor: theme.borderColor,
                    // flex: 1
                    position: 'relative', // to fix scroll issue ... it is by default 'absolute'
                    top: 0, //to fix gap between label box and container
                }}
                listItemContainerStyle={styles.listItemContainerStyle}
                listMode='SCROLLVIEW'
                scrollViewProps={{
                    nestedScrollEnabled: true,
                    contentContainerStyle: {
                        flexGrow: 1
                    }
            }}
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
    )
}

export default DropDownComponent

const styles = StyleSheet.create({
    inputContainer: (zIndex) => ({
        marginBottom: 15,
        zIndex: zIndex
    }),
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
        zIndex: -100
    },
    inputStyle: {
        flex: 1,
        fontFamily: Fonts.medium,
        fontSize: 16,
        color: theme.inputText
    },
    listItemContainerStyle: {
    },
})