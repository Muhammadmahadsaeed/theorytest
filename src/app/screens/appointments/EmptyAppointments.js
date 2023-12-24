import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { EmptyCalenderIcon } from '../../utils/images';
import Button from '../../components/Buttons/Button';
import { theme } from '../../utils/colors';
import { Fonts } from '../../utils/fonts';

const EmptyAppointment = ({ navigation }) => {

    const goToHome = () => {
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <View style={styles.imageView}>
                <EmptyCalenderIcon svgStyle={styles.svgStyle} />
            </View>
            <View style={styles.textView}>
                <Text style={styles.heading}>
                    You do not have an appointment!
                </Text>
                <Text style={styles.description}>
                    Book a Caregiver service right away for you and your family!
                </Text>
                <Button title={"Make an appointment"} onPress={goToHome} />
            </View>
        </View>
    )
}

export default EmptyAppointment

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 15
    },
    imageView: {
        height: 191,
        width: '100%',
    },
    svgStyle: {
        height: '100%',
        width: '100%'
    },
    textView: {
        marginTop: 20
    },
    heading: {
        fontSize: 18,
        color: theme.textBlack,
        fontFamily: Fonts.bold,
        textAlign: 'center'
    },
    description: {
        fontSize: 16,
        color: theme.textGray,
        fontFamily: Fonts.medium,
        textAlign: 'center',
        marginVertical: 20
    }
})