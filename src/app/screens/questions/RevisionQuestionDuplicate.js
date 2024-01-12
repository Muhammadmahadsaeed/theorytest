import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import {
    View,
    Text,
    Alert,
    BackHandler,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import WrapperContainer1 from '../../components/Wrapper/WrapperContainer1';
import { CrossRoundIcon, InfoCircleIcon, TickBoxIcon } from '../../utils/images';
import { theme } from '../../utils/colors';
import { Fonts } from '../../utils/fonts';
import questionArray from '../../services/section.json'
import AlertBottomSheetComponent from '../../components/BottomSheet/AlertBottomSheetComponent';
import { useDispatch } from 'react-redux';
import TextModal from '../../components/Modal/TextModal';
import QuestionFooter from './QuestionFooter';
import QuestionHeader from './QuestionHeader';
import QuestionProgress from './QuestionProgress';


const RevisionQuestionByTopic = ({ navigation, route }) => {

    const { config } = route?.params || {}

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [questions, setQuestions] = useState(questionArray);

    const bottomSheetRef = useRef(null);
    const textModalRef = useRef()
    const dispatch = useDispatch();

    const mapDispatchToProps = (value) => {
        dispatch({ type: 'update_redux', payload: value });
    };

    const snapPoints = useMemo(() => ['40%'], []);

    const handleSheetChanges = useCallback((index) => {
    }, []);

    const handleClosePress = useCallback(() => {
        bottomSheetRef.current?.close();
    }, []);

    const renderBackdrop = useCallback(props => (
        <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            pressBehavior={"close"}
            enableTouchThrough
        />
    ), []);


    useEffect(() => {
        const backAction = () => {
            Alert.alert('Hold on!', 'Are you sure you want to go back?', [
                {
                    text: 'Cancel',
                    onPress: () => null,
                    style: 'cancel',
                },
                { text: 'YES', onPress: () => BackHandler.exitApp() },
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, []);

    const goToBack = (index) => {
        bottomSheetRef.current?.snapToIndex(index);
    }

    const onCheck = () => {
        let currentQuestion = questions[currentQuestionIndex]
        const updatedQuestions = [...questions];

        const userAnswer = currentQuestion.user_answer || [];

        const options = currentQuestion.options.map(o => {
            const isCorrectAnswer = currentQuestion.correct_answer.includes(o.option);
            const userGotItRight = isCorrectAnswer && userAnswer.includes(o.option);
            const userGotItWrong = !isCorrectAnswer && userAnswer.includes(o.option);
            const userSelectedAnswer = isCorrectAnswer && !userAnswer.includes(o.option);
            return {
                ...o,
                isCorrectAnswer,
                userGotItRight,
                userGotItWrong,
                userSelectedAnswer
            }
        })
        updatedQuestions[currentQuestionIndex] = { ...currentQuestion, options: options, isCheck: true }

        setQuestions(updatedQuestions);


    }

    const onSelectOption = (item) => {

        const updatedQuestions = [...questions];
        const currentQuestion = updatedQuestions[currentQuestionIndex];
        const updatedQuestions2 = [...questions].map(q => {
            if (q.id === currentQuestion.id) {
                const alreadySelected = q.user_answer?.length ? !!q.user_answer.find(el => el === item.option) : false;
                if (alreadySelected) {
                    return {
                        ...q,
                        user_answer: q.type === 'redio' ? [] : q.user_answer.filter(el => el !== item.option)
                    }
                }
                return {
                    ...q,
                    user_answer: (q.user_answer?.length && q.user_answer?.length < 2 && q.type === 'checkbox') ? [...q.user_answer, item.option] : [item.option]
                }
            }
            return q
        })
        setQuestions(updatedQuestions2);
    };

    const highLightOption = (el) => {
        let user_answer = questions[currentQuestionIndex]?.user_answer
        return user_answer?.length && user_answer.includes(el.option) ? true : false
    }


    const onConfirm = () => {
        handleClosePress()
        let find = questions.some(el => el.user_answer)
        if (find) {
            navigation.replace('mock-result',
                {
                    result:
                        questions.slice(0, currentQuestionIndex),
                    isPractice: true
                })
        } else {
            navigation.goBack()
        }
    }

    const openModal = () => {
        textModalRef.current.isOpen()
    }

    const getIcon = (item) => {
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

    let currentQuestion = questions[currentQuestionIndex]

    return (
        <WrapperContainer1>
            <QuestionHeader
                currentQuestion={currentQuestion}
                setQuestions={setQuestions}
                questions={questions}
                goToBack={goToBack}
                showFlag={false}
                currentQuestionIndex={currentQuestionIndex} />
            <View style={styles.container}>
                <QuestionProgress currentQuestionIndex={currentQuestionIndex} questions={questions} />
                <View style={styles.row}>
                    <Text style={styles.heading}>
                        Question {currentQuestionIndex + 1} / {questions.length}
                    </Text>
                    {currentQuestion?.isCheck ?
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
                        :
                        null
                    }
                </View>
                <View style={styles.questionView}>
                    <Text style={styles.text}>
                        {currentQuestion?.question}
                    </Text>
                    <View style={styles.optionView}>
                        <Text style={styles.text01}>
                            {currentQuestion?.type == 'radio' ? "Please select one answer" : "Please select one or more answer"}
                        </Text>

                        {currentQuestion?.options?.map((el, index) => (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                key={index}
                                style={[styles.row01, currentQuestion?.isCheck ? styles.option1 : styles.option(highLightOption(el))]}
                                onPress={() => onSelectOption(el)}>
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
                showResult={true}
                config={config}
                isPractice={true}
                currentQuestion={currentQuestion}
                currentQuestionIndex={currentQuestionIndex}
                setCurrentQuestionIndex={setCurrentQuestionIndex}
                navigation={navigation}
                onCheck={onCheck} />
            <BottomSheet
                ref={bottomSheetRef}
                index={-1}
                backdropComponent={renderBackdrop}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}>
                <AlertBottomSheetComponent
                    onCancel={handleClosePress}
                    onConfirm={onConfirm} />
            </BottomSheet>
            <TextModal ref={textModalRef} currentQuestion={currentQuestion} />
        </WrapperContainer1>
    )
}

export default RevisionQuestionByTopic

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
    textView: {
        flex: 1,
        marginRight: 10
    },
    icon01: {
        height: 25,
        width: 25,
    },
    row01: {
        paddingVertical: 15,
        marginBottom: 20,
        paddingHorizontal: 20,
        borderRadius: 7,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.greenish,
    },
    option: (is) => ({
        borderColor: theme.skyBlue,
        borderWidth: is ? 1.5 : 0,

        // paddingVertical: 15,
        // marginBottom: 20,
        // paddingHorizontal: 20,
        // borderRadius: 7
    }),
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
        backgroundColor: theme.buttonBg,
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
        backgroundColor: theme.buttonBg,
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