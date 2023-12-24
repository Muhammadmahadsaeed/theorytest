import React from 'react';
import {
    StyleSheet,
    View,
    Modal,
    ActivityIndicator,
    Text
} from 'react-native';
import { theme } from '../../utils/colors';
import { Fonts } from '../../utils/fonts';

const ModalLoader = ({ loading }) => {

    return (
        <Modal
            transparent={true}
            style={styles.modalStyle}
            animationType={'none'}
            visible={loading}
            onRequestClose={() => console.log('close modal')}>
            <View style={styles.modalBackground}>
                <View style={styles.activityIndicatorWrapper}>
                    <ActivityIndicator
                        animating={true}
                        color={theme.black}
                        size={50} />
                    <Text style={styles.text}>
                        Loading ...
                    </Text>
                </View>
            </View>
        </Modal>
    );
};

export default ModalLoader;

const styles = StyleSheet.create({
    modalStyle:{
        flex: 1, 
        justifyContent:  'center', 
        alignSelf: 'stretch', 
        borderWidth: 0, 
        borderColor:'transparent'
    },
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040',
    },
    activityIndicatorWrapper: {
        backgroundColor: theme.bg,
        flexDirection: 'row',
        alignItems: 'center',
        height: 100,
        width: '85%',
        borderRadius: 5,
        paddingHorizontal: 20
    },
    text: {
        fontFamily: Fonts.medium,
        fontSize: 20,
        color: theme.textBlack,
        marginLeft: 15
    }
});