import React from 'react'
import Checkbox from 'expo-checkbox';
import { theme } from '../../utils/colors';

const CheckBoxComponent = ({ id, handleOnChange, name, isChecked, value, elm, style = {} }) => {

    return (
        <Checkbox
            style={{ ...style }}
            value={!!isChecked}
            color={theme.buttonBg}
            onValueChange={(ev) => handleOnChange(ev, elm)} />
    )
}

export default CheckBoxComponent