import React, { useRef, useState, useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import WrapperContainer1 from '../../components/Wrapper/WrapperContainer1';
import { CrossRoundIcon, InfoCircleIcon, TickBoxIcon } from '../../utils/images';
import { theme } from '../../utils/colors';
import { Fonts } from '../../utils/fonts';
import { useDispatch } from 'react-redux';
import TextModal from '../../components/Modal/TextModal';
import QuestionHeader from './QuestionHeader';
import QuestionFooter from './QuestionFooter';
import QuestionProgress from './QuestionProgress';


const ReviewQuestionScreen = ({ navigation, route }) => {

    const { result: questions, index, fromRoute } = route?.params || {}

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(index || 0);
    const [questArray, setQuestArray] = useState([])

    const dispatch = useDispatch();

    const textModalRef = useRef()

    const mapDispatchToProps = (value) => {
        dispatch({ type: 'update_redux', payload: value });
    };


    const questionsWithResult = useMemo(() => {

        const array = questions.map(q => {

            const userAnswer = q.user_answer || [];

            const options = q.options.map(o => {
                const isCorrectAnswer = q.correct_answer.includes(o.option);
                const userGotItRight = isCorrectAnswer && userAnswer.includes(o.option);
                const userGotItWrong = !isCorrectAnswer && userAnswer.includes(o.option);
                const userSelectedAnswer = isCorrectAnswer && !userAnswer.includes(o.option);
                if (fromRoute) {
                    return {
                        ...o,
                        isCorrectAnswer
                    }
                }
                return {
                    ...o,
                    isCorrectAnswer,
                    userGotItRight,
                    userGotItWrong,
                    userSelectedAnswer
                }
            })

            return {
                ...q,
                options,
            }
        })
        return array
    }, [questions])

    const goToBack = () => {
        navigation.goBack()
    }

    const getIcon = (item) => {
        if (item.isCorrectAnswer && fromRoute) {
            return <TickBoxIcon />
        }
        if (item.isCorrectAnswer && item.userGotItRight) {
            return <TickBoxIcon />
        }
        if (!item.isCorrectAnswer && item.userGotItWrong) {
            return <CrossRoundIcon />
        }
        if (item.isCorrectAnswer && item.userSelectedAnswer) {
            return <TickBoxIcon />
        }
    }

    const openModal = () => {
        textModalRef.current.isOpen()
    }

    let currentQuestion = questionsWithResult[currentQuestionIndex]

    return (
        <WrapperContainer1>
            <QuestionHeader
                currentQuestion={currentQuestion}
                setQuestions={setQuestArray}
                goToBack={goToBack}
                questions={questions}
                currentQuestionIndex={currentQuestionIndex} />
            <View style={styles.container}>
                <QuestionProgress currentQuestionIndex={currentQuestionIndex} questions={questions} />
                <View style={styles.row}>
                    <Text style={styles.heading}>
                        Question {currentQuestionIndex + 1} / {questions.length}
                    </Text>
                    <TouchableOpacity
                        style={styles.timeView}
                        activeOpacity={0.8}
                        onPress={() => openModal()}>
                        <View style={styles.clockIcon}>
                            <InfoCircleIcon />
                        </View>
                        <Text style={styles.time}>
                            Explain
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.questionView}>
                    <Text style={styles.text}>
                        {currentQuestion?.question}
                    </Text>
                    <View style={styles.optionView}>
                        {currentQuestion?.options?.map((el, index) => (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                key={index}
                                disabled={true}
                                style={[styles.option(el), styles.option1]}>
                                <View style={styles.textView}>
                                    <Text style={styles.optionText}>
                                        {el.option}
                                    </Text>
                                </View>
                                <View style={styles.icon01}>
                                    {getIcon(el)}
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </View>
            <QuestionFooter
                questions={questions}
                showNext={true}
                fromRoute={fromRoute}
                currentQuestion={currentQuestion}
                currentQuestionIndex={currentQuestionIndex}
                setCurrentQuestionIndex={setCurrentQuestionIndex}
                navigation={navigation} />
            <TextModal ref={textModalRef} />
        </WrapperContainer1>
    )
}

export default ReviewQuestionScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
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
    },
    clockIcon: {
        height: 20,
        width: 20
    },
    time: {
        fontFamily: Fonts.medium,
        fontSize: 14,
        color: theme.black,
        marginLeft: 5
    },
    questionView: {
        marginTop: 30
    },
    text: {
        fontFamily: Fonts.medium,
        fontSize: 20,
        color: theme.black
    },
    optionView: {
        marginTop: 40
    },
    text01: {
        fontFamily: Fonts.medium,
        fontSize: 14,
        color: theme.grayShade1,
        marginBottom: 5
    },
    option1: {
        paddingVertical: 15,
        marginBottom: 20,
        paddingHorizontal: 20,
        borderRadius: 7,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textView: {
        flex: 1,
        marginRight: 10
    },
    option: (is) => {
        // if (is.isCorrectAnswer && is.userGotItRight) {
        //     return { backgroundColor: theme.green }
        // }
        // if (!is.isCorrectAnswer && is.userGotItWrong) {
        //     // return { backgroundColor: theme.lightRed }
        // } 
        return {
            backgroundColor: theme.greenish
        }
    },
    icon01: {
        height: 25,
        width: 25,
    },
    optionText: {
        fontFamily: Fonts.medium,
        fontSize: 14,
        color: theme.black
    },
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