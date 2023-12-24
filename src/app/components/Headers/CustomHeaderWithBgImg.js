import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native'
import { theme } from '../../utils/colors';
import { BackCircleWhiteIcon, BackLeftIcon, ShareWhiteIcon, news } from '../../utils/images';
import { Fonts } from '../../utils/fonts';
import { useNavigation } from '@react-navigation/native';


const CustomHeaderWithBgImg = ({ path, text, isLeft, customStyle, isRight, type, onShareClick, image }) => {

    const navigation = useNavigation()

    const goToBack = () => {
        if (path) {
            navigation.reset({
                index: 0,
                routes: [{ name: 'bottom-tab' }],
            });
        } else {
            navigation.goBack()
        }
    }

    return (
        <View style={[styles.header, { ...customStyle }]}>
            <Image source={image ? { uri: image } : news} style={styles.bg} />
            <View style={styles.headerTop}>
                {isLeft ?
                    <TouchableOpacity
                        style={styles.left}
                        activeOpacity={0.95}
                        onPress={() => goToBack()}>
                        {type ? <BackCircleWhiteIcon /> : <BackLeftIcon />}
                    </TouchableOpacity>
                    :
                    <View style={styles.left} />
                }
                <View style={styles.center}>
                    <Text style={styles.centerText}>
                        {text}
                    </Text>
                </View>
                {isRight ?
                    <TouchableOpacity
                        style={styles.right}
                        activeOpacity={0.8}
                        onPress={onShareClick}>
                        <ShareWhiteIcon svgStyle={styles.right} />
                    </TouchableOpacity>
                    :
                    <View style={styles.right} />
                }
            </View>
        </View>
    )
}

export default CustomHeaderWithBgImg;

const styles = ({
    header: {
        height: 250,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24
    },
    bg: {
        height: '100%',
        width: '100%',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24
    },
    headerTop: {
        height: 70,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        zIndex: 100,
        paddingHorizontal: 15
    },
    left: {
        height: 40,
        width: 40
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerText: {
        fontSize: 20,
        color: theme.textWhite,
        fontFamily: Fonts.bold
    },
    right: {
        height: 40,
        width: 40,
    }

})