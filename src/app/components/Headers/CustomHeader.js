import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native'
import { theme } from '../../utils/colors';
import { BackCircleWhiteIcon, BackLeftIcon, ClockRectIcon } from '../../utils/images';
import { Fonts } from '../../utils/fonts';
import { useNavigation } from '@react-navigation/native';
import I18n from 'i18n-js';


const CustomHeader = ({ text, isLeft, customStyle, isRight, type, path, params, isOtp }) => {

    const navigation = useNavigation()

    const goToBack = () => {
        if (path) {
            navigation.navigate(path)
        } else {
            navigation.goBack()
        }
    }

    return (
        <View style={[styles.header, { ...customStyle }]}>
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
                        onPress={() => navigation.navigate('appointment-history')}>
                        <ClockRectIcon />
                    </TouchableOpacity>
                    :
                    <View style={styles.right} />
                }
            </View>
            {isOtp ?
                <View style={styles.body}>
                    <Text style={styles.bodyText}>
                        {I18n.t('your_otp')} {params?.otp}
                    </Text>
                </View>
                :
                null
            }
        </View>
    )
}

export default CustomHeader;

const styles = ({
    header: {
        height: 166,
        paddingHorizontal: 15,
        backgroundColor: theme.buttonBgDark,
        borderBottomLeftRadius: 36,
        borderBottomRightRadius: 36
    },
    headerTop: {
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
        width: 40
    },
    body: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20
    },
    bodyText: {
        fontFamily: Fonts.medium,
        fontSize: 18,
        color: theme.textWhite
    }

})