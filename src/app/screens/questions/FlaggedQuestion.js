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
import {  TimeIcon } from '../../utils/images';
import { theme } from '../../utils/colors';
import { Fonts } from '../../utils/fonts';
import questionArray from '../../services/section.json'
import AlertBottomSheetComponent from '../../components/BottomSheet/AlertBottomSheetComponent';
import { useDispatch, useSelector } from 'react-redux';
import QuestionFooter from './QuestionFooter';
import QuestionHeader from './QuestionHeader';
import QuestionProgress from './QuestionProgress';

let totalTimeInMinutes = 57

const FlaggedQuestionScreen = ({ navigation, route }) => {

    const { result = [], config, originalQuestion  } = route?.params || {}
    
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(totalTimeInMinutes * 60);
    const [questions, setQuestions] = useState(result);
    const [flaggedQuestion, setFlaggedQuestion] = useState(result)

    let currentQuestion = questions[currentQuestionIndex]

    const bottomSheetRef = useRef(null);

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
        const interval = setInterval(() => {
            if (timeRemaining === 0) {
                clearInterval(interval);
                // Timer has reached 00:00, you can handle the completion here
                return;
            }
            setTimeRemaining(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timeRemaining, totalTimeInMinutes]);


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


    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };


    const goToBack = (index) => {
        bottomSheetRef.current?.snapToIndex(index);
    }
    // for auto skip 
    const onNext = (questions) => {
        let index = currentQuestionIndex + 1
        if (index >= questions.length) {
            navigation.replace('mock-result', { result: questions })
            return
        }
        setCurrentQuestionIndex(currentQuestionIndex + 1)
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
        if (config?.autoSkip) {
            currentQuestion?.type == 'radio' ? onNext(updatedQuestions2) : currentQuestion?.user_answer?.length && currentQuestion?.user_answer?.length < 2 && onNext(updatedQuestions2)
       }
    };

    const highLightOption = (el) => {
        let user_answer = questions[currentQuestionIndex]?.user_answer
        
        return user_answer?.length && user_answer.includes(el.option) ? true : false
    }


    const onConfirm = () => {
        handleClosePress()
        let find = questions.some(el => el.user_answer)
        if (find) {
            navigation.replace('mock-result', { result: questions })
        } else {
            navigation.goBack()
        }
    }

   
    return (
        <WrapperContainer1>
            <QuestionHeader
                goToBack={goToBack}
                currentQuestion={currentQuestion}
                setQuestions={setQuestions}
                questions={questions}
                flaggedQuestion={flaggedQuestion}
                setFlaggedQuestion={setFlaggedQuestion}
                currentQuestionIndex={currentQuestionIndex} />
             <View style={styles.container}>
                <QuestionProgress currentQuestionIndex={currentQuestionIndex} questions={questions} />
                <View style={styles.row}>
                    <Text style={styles.heading}>
                        Question {currentQuestion?.originalIndex + 1} / 50
                    </Text>
                    <View style={styles.timeView}>
                        <View style={styles.clockIcon}>
                            <TimeIcon />
                        </View>
                        <Text style={styles.time}>
                            {formatTime(timeRemaining)}
                        </Text>
                    </View>
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
                                style={styles.option(highLightOption(el))}
                                onPress={() => onSelectOption(el)}>
                                <Text style={styles.optionText}>
                                    {el.option}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </View>
           <QuestionFooter
                questions={questions}
                showNext={true}
                currentQuestion={currentQuestion}
                currentQuestionIndex={currentQuestionIndex}
                config={config}
                fromFlagScreen={true}
                showResult={true}
                originalQuestion={originalQuestion}
                flaggedQuestion={flaggedQuestion}
                setCurrentQuestionIndex={setCurrentQuestionIndex}
                navigation={navigation} />
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
        </WrapperContainer1>
    )
}

export default FlaggedQuestionScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
    },

    progressView: {
        marginTop: 20,
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
        borderColor: theme.skyBlue,
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
    option: (is) => ({
        borderColor: theme.skyBlue,
        borderWidth: is ? 1.5 : 0,
        backgroundColor: theme.greenish,
        paddingVertical: 15,
        marginBottom: 20,
        paddingHorizontal: 20,
        borderRadius: 7
    }),
    optionText: {
        fontFamily: Fonts.medium,
        fontSize: 14,
        color: theme.black
    },
})