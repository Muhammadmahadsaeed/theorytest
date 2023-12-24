import React, { useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { theme } from '../../utils/colors'
import { Fonts } from '../../utils/fonts'
import { MenuIcon } from '../../utils/images';


const MoreMenu = ({ goToEdit, onDelete}) => {


    const [visible, setVisible] = useState(false);

    const hideMenu = (type) => {
        setVisible(false)
        if(type == 'edit') goToEdit() 
        else onDelete()

    };

    const showMenu = () => setVisible(true);

    return (
        <Menu
            visible={visible}
            style={styles.containerStyle}
            anchor={<TouchableOpacity
                style={styles.right}
                activeOpacity={0.95}
                onPress={() => showMenu()}>
                <MenuIcon svgStyle={styles.svgStyle} />
            </TouchableOpacity>}
            onRequestClose={hideMenu}>
            <MenuItem onPress={() => hideMenu("edit")} textStyle={styles.textStyle}>
                Edit
            </MenuItem>
            <MenuItem onPress={() => hideMenu("delete")} textStyle={styles.textStyle}>
                Delete
            </MenuItem>
        </Menu>
    )
}

export default MoreMenu

const styles = StyleSheet.create({
    containerStyle: {
        // right: 30,
        // top: 30,

    },
    textStyle: {
        fontFamily: Fonts.medium,
        fontSize: 14,
        color: theme.textBlack
    },
    right: {
        paddingLeft: 20,
        paddingVertical: 10
    },
    svgStyle: {
        height: 20,
        width: 20
    }
})