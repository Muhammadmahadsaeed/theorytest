import Toast from 'react-native-toast-message';
import { showMessage, hideMessage } from "react-native-flash-message";
import { Fonts } from './fonts';
import { white } from './colors';

export const showToast = (type, text1 = '', text2 = '') => {
    Toast.show({
        type: type,
        text1: text1,
        text2: text2
    });
}

export const showFlashMessage = (type, text1) => {
    showMessage({
        message: text1,
        type: type,
        position:'top',
        titleStyle: {
            fontFamily: Fonts.bold,
            color: white,
            fontSize: 16
        }
    });
}