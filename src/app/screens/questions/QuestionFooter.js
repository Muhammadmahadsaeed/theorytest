import React, { useCallback, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { BackWardArrowIcon, ForwardEnWhiteIcon } from '../../utils/images';
import { theme } from '../../utils/colors';
import { Fonts } from '../../utils/fonts';

const QuestionFooter = ({
    questions = [],
    currentQuestionIndex,
    setCurrentQuestionIndex,
    navigation,
    fromFlagndLikeRoute = false,
}) => {


    const onNext = () => {
        if ((currentQuestionIndex + 1) >= questions.length) {
            onFinish()
            return
        }
        setCurrentQuestionIndex(currentQuestionIndex + 1)
    }

    const onFinish = () => {
        navigation.goBack()
    }

    const onPrev = () => {
        setCurrentQuestionIndex(currentQuestionIndex - 1)
    }

    const btnStatus = () => {
        let type = questions[currentQuestionIndex]?.type
        let user_answer = questions[currentQuestionIndex]?.user_answer

        if (type == 'radio') {
            return fromFlagndLikeRoute ? true : user_answer?.length ? true : false
        }
        return fromFlagndLikeRoute ? true : user_answer?.length && user_answer?.length == 2 ? true : false
    }

    return (
        <View style={styles.footer}>
            {currentQuestionIndex !== 0 ?
                <TouchableOpacity
                    style={styles.btn1}
                    activeOpacity={0.8}
                    onPress={() => onPrev()}>
                    <BackWardArrowIcon svgStyle={styles.arrowSvg1} />
                    <Text style={styles.btn1Text}>
                        Previous
                    </Text>
                </TouchableOpacity>
                :
                <View />
            }

            <TouchableOpacity
                style={styles.btn2(btnStatus())}
                disabled={btnStatus() ? false : true}
                activeOpacity={0.8}
                onPress={() => currentQuestionIndex == questions.length - 1 ? onFinish() : onNext()}>
                <Text style={styles.btn2Text}>
                    {currentQuestionIndex == questions.length - 1 ? "Finish" : "Next"}
                </Text>
                <ForwardEnWhiteIcon svgStyle={styles.arrowSvg} />
            </TouchableOpacity>
        </View>
    )
}

export default QuestionFooter

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 15,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        alignSelf: 'center',
        backgroundColor: theme.bg,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    btn1: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '32%',
        height: 47,
        backgroundColor: theme.skyBlue,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 100,
    },
    btn1Text: {
        color: theme.white,
        fontFamily: Fonts.medium,
        fontSize: 16
    },
    btn2: (is) => ({
        width: '32%',
        height: 47,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.skyBlue,
        borderRadius: 100,
        opacity: is ? 1 : 0.5
    }),
    btn2Text: {
        color: theme.white,
        fontFamily: Fonts.medium,
        fontSize: 16
    },
    arrowSvg: {
        height: 25,
        width: 25
    },
    arrowSvg1: {
        height: 12,
        width: 12,
        marginRight: 5
    }
})