import React from 'react';
import { Text, View } from 'react-native'
import { theme } from '../../utils/colors';
import { BackLeftIcon } from '../../utils/images';
import { Fonts } from '../../utils/fonts';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';


const HeaderWithBackButton = ({ text, rightIcon, onPress, path }) => {

    const navigation = useNavigation()


    const goToBack = () => {
        if (path) {
            navigation.replace(path)
        } else {
            navigation.goBack()
        }
    }

    return (
        <View style={styles.header}>
            <View style={styles.headerTop}>
                <TouchableOpacity
                    style={styles.left}
                    activeOpacity={0.95}
                    onPress={() => goToBack()}>
                    <BackLeftIcon />
                </TouchableOpacity>
                <View style={styles.center}>
                    <Text style={styles.centerText}>
                        {text}
                    </Text>
                </View>
                <View style={styles.right} />
            </View>
        </View>
    )
}

export default HeaderWithBackButton;

const styles = ({
    header: {
        height: 65,
        paddingHorizontal: 15,
        backgroundColor: theme.bg,
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
        fontSize: 16,
        color: theme.text,
        fontFamily: Fonts.bold
    },
    right: {
        height: 40,
        width: 40
    }

})