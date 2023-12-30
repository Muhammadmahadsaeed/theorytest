import React, { useRef, useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    Alert,
    BackHandler,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import WrapperContainer1 from '../../components/Wrapper/WrapperContainer1';
import { BackLeftIcon, BackWardArrowIcon, ForwardEnWhiteIcon, TimeIcon } from '../../utils/images';
import { theme } from '../../utils/colors';
import { Fonts } from '../../utils/fonts';
import questionArray from '../../services/section.json'

let totalTimeInMinutes = 57

const QuestionScreen = ({ navigation }) => {

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(totalTimeInMinutes * 60);
    const [questions, setQuestions] = useState(questionArray);

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
            {text: 'YES', onPress: () => BackHandler.exitApp()},
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


    const goToBack = () => {

    }

    const onNext = () => {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
    }

    const onPrev = () => {
        setCurrentQuestionIndex(currentQuestionIndex - 1)
    }

    const onSelectOption = (item) => {
        const updatedQuestions = [...questions];
        updatedQuestions[currentQuestionIndex] = {
            ...updatedQuestions[currentQuestionIndex],
            user_answer: item.option,
        };
        setQuestions(updatedQuestions);

    }

    const highlighOption = (el) => {
        return questions[currentQuestionIndex]?.user_answer && questions[currentQuestionIndex]?.user_answer == el.option ? true : false
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
                    <View style={[styles.progressBar, { width: ((currentQuestionIndex / questions.length) * 100) + '%' }]} />
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
                            {formatTime(timeRemaining)}
                        </Text>
                    </View>
                </View>
                <View style={styles.questionView}>
                    <Text style={styles.text}>
                        {questions[currentQuestionIndex].question}
                    </Text>
                    <View style={styles.optionView}>
                        {questions[currentQuestionIndex].options?.map((el, index) => (

                            <TouchableOpacity
                                activeOpacity={0.8}
                                key={index}
                                style={styles.option(highlighOption(el))}
                                onPress={() => onSelectOption(el)}>
                                <Text style={styles.optionText}>
                                    {el.option}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </View>
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
                    style={styles.btn2(questions[currentQuestionIndex]?.user_answer ? true : false)}
                    disabled={questions[currentQuestionIndex]?.user_answer ? false : true}
                    activeOpacity={0.8}
                    onPress={() => onNext()}>
                    <Text style={styles.btn2Text}>
                        Next
                    </Text>
                    <ForwardEnWhiteIcon svgStyle={styles.arrowSvg} />
                </TouchableOpacity>
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
        marginTop: 20
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
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.buttonBg,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 7
    },
    btn1Text: {
        color: theme.white,
        fontFamily: Fonts.medium,
        fontSize: 16
    },
    btn2: (is) => ({
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.buttonBg,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 7,
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
        height: 15,
        width: 15,
        marginRight: 5
    }
})