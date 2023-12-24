import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';
import { black, white } from '../../constants/colors';
import { RalewayMedium } from '../../constants/fonts';

const ReloadNetwork = ({ onReload }) => {

    const onNetworkCheck = () => {
        onReload()
    }

    return (
        <View style={styles.container}>
            <View style={{ width: '80%' }}>
                <Text style={styles.text}>
                    No internet, yor are offline, connect to internet and try again
                </Text>
                <TouchableOpacity activeOpacity={0.95} style={styles.btn} onPress={() => onNetworkCheck()}>
                    <Text style={styles.btnText}>
                        Reload
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ReloadNetwork

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: white,
        fontSize: 16,
        fontFamily: RalewayMedium,
        opacity: 0.6,
        textAlign: 'center'
    },
    btn: {
        marginTop: 10,
        borderRadius: 7,
        padding: 10,
        width: '30%',
        backgroundColor: white,
        alignSelf: 'center',
        alignItems: 'center'
    },
    btnText: {
        color: black,
        fontSize: 14,
        fontFamily: RalewayMedium,
    }
})