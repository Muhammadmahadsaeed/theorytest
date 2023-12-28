import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import WrapperContainer1 from '../../components/Wrapper/WrapperContainer1';
import { BackLeftIcon, TimeIcon } from '../../utils/images';
import { theme } from '../../utils/colors';
import { Fonts } from '../../utils/fonts';

const QuestionScreen = ({ navigation }) => {

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const goToBack = () => {

    }

    return (
        <WrapperContainer1>
            <View style={styles.headerTop}>
                <TouchableOpacity
                    style={styles.left}
                    activeOpacity={0.95}
                    onPress={() => goToBack()}>
                    <BackLeftIcon />
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <View style={styles.progressView}>
                    <View style={[styles.progressBar, {  width: ((20 / 50) * 100) + '%' }]} />
                </View>
                <View style={styles.row}>
                <Text style={styles.heading}>
                        Question {currentQuestionIndex + 1} / 50
                    </Text>
                    <View style={styles.timeView}>
                        <View style={styles.clockIcon}>
                            <TimeIcon />
                        </View>
                        <Text style={styles.time}>
                            00:07
                        </Text>
                    </View>
                </View>
            </View>
        </WrapperContainer1>
    )
}

export default QuestionScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
    },
    headerTop: {
        paddingHorizontal: 15,
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    left: {
        height: 40,
        width: 40
    },
    progressView: {
        height: 5,
        width: '100%',
        backgroundColor: theme.grey
    },
    progressBar: {
        height: 5,
        backgroundColor: theme.skyBlue
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20
    },
    heading: {
        fontFamily: Fonts.medium,
        fontSize: 20,
        color: theme.black
    },
    timeView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.green,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 10
    },
    clockIcon: {
        height: 20,
        width: 20
    },
    time: {
        fontFamily: Fonts.medium,
        fontSize: 14,
        color: theme.black,
        marginLeft: 10
    },
})