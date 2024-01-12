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
import FlaggedQuestionAlertModal from '../../components/Modal/FlaggedQuestionAlert';

const QuestionFooter = ({
    questions = [],
    originalQuestion = [],
    currentQuestion,
    currentQuestionIndex,
    onCheck,
    showResult = false,
    showNext,
    config,
    setCurrentQuestionIndex,
    navigation,
    fromFlagndLikeRoute = false,
    flaggedQuestion,
    fromFlagScreen = false,
    isPractice = false,
    isNext = false,
    setIsNext
}) => {

    const flaggedModalRef = useRef(null)

    const onNext = () => {
        if ((currentQuestionIndex + 1) >= questions.length) {
            onFinish()
            return
        }
        setCurrentQuestionIndex(currentQuestionIndex + 1)
    }

    const onYessPress = () => {

        // flaggedModalRef.current.isClose()
        if (!fromFlagScreen) {
            const newQuestion = flaggedQuestion.map((el) => {
                let find = questions.find((elem, index) => el.originalIndex == index)
                if (find) {
                    return {
                        ...el,
                        user_answer: find.user_answer
                    }
                } else {
                    return {
                        ...el
                    }

                }
            })
            navigation.replace('flagged-question', { result: newQuestion, originalQuestion: questions })

        }
    }

    const onNoPress = () => {
        // flaggedModalRef.current?.isClose()
        if (fromFlagScreen) {
            const newQuestion = originalQuestion.map((el, index) => {
                let find = questions.find((elem) => index == elem.originalIndex)
                if (find) {
                    return {
                        ...el,
                        user_answer: find.user_answer
                    }
                } else {
                    return {
                        ...el
                    }
                }
            })
            goToResult(newQuestion)
        } else {
            goToResult(questions)
        }

    }

    const onFinish = () => {
        if (showResult && flaggedQuestion?.length > 0) {
            flaggedModalRef.current.isOpen()
            return
        }
        if (showResult) {
            goToResult(questions)
            return
        } else {
            navigation.goBack()
        }
    }

    const goToResult = (questions) => {
        navigation.replace('mock-result', { result: questions, isPractice })
    }

    const onPrev = () => {
        console.log("cal======");
        if(isNext) setIsNext(false)
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
            {(showNext || currentQuestion?.isCheck) && !config?.autoSkip &&
                <TouchableOpacity
                    style={styles.btn2(currentQuestion?.isCheck ? true : btnStatus())}
                    disabled={currentQuestion?.isCheck ? false : btnStatus() ? false : true}
                    activeOpacity={0.8}
                    onPress={() => currentQuestionIndex == questions.length - 1 ? onFinish() : onNext()}>
                    <Text style={styles.btn2Text}>
                        {currentQuestionIndex == questions.length - 1 ? "Finish" : "Next"}
                    </Text>
                    <ForwardEnWhiteIcon svgStyle={styles.arrowSvg} />
                </TouchableOpacity>
            }
            {!(showNext || currentQuestion?.isCheck) &&
                <TouchableOpacity
                    style={styles.btn2(btnStatus())}
                    disabled={btnStatus() ? false : true}
                    activeOpacity={0.8}
                    onPress={() => onCheck()}>
                    <Text style={styles.btn2Text}>
                        Check
                    </Text>
                    <ForwardEnWhiteIcon svgStyle={styles.arrowSvg} />
                </TouchableOpacity>
            }
            <FlaggedQuestionAlertModal
                ref={flaggedModalRef}
                flaggedQuestion={flaggedQuestion}
                onYessPress={onYessPress}
                onNoPress={onNoPress} />
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