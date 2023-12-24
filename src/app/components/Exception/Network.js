import React from 'react';
import {
    View,
    Image,
} from 'react-native';
import { Nointernet } from '../../utils/images'


const NoNetwork = ({ }) => {
    return (
        <View style={styles.imgView}>
            <Image source={Nointernet} style={styles.img} />
        </View>
    )
}

export default NoNetwork

const styles = ({
    overlay: {
        height: '9%',
        width: '100%',
        top: 0,
        backgroundColor: 'black',
        alignItems: 'center',
    },
    logoview: {
        width: '35%',
        height: '85%',
    },
    logoImg: {
        resizeMode: 'contain', width: '100%', height: '100%'
    },
    imgView: {
        width: '100%',
        height: '91%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    img: {
        width: '60%', height: 200, resizeMode: 'contain'
    }
})