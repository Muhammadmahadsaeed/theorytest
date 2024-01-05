import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
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
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import WrapperContainer1 from '../../components/Wrapper/WrapperContainer1';
import HeaderWithBackButton from '../../components/Headers/HeaderWithBackButton';
import { theme } from '../../utils/colors';
import { Fonts } from '../../utils/fonts';
import { CertificateIcon, ReviewQuestionIcon } from '../../utils/images';
import Button from '../../components/Buttons/Button';
import { useSelector } from 'react-redux';

function arraysEqual(arr1, arr2) {
    return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
}

const MockTestResult = ({ navigation, route }) => {

    const { result: questions } = route?.params || []

    const { userFlag, userFavourite } = useSelector(state => state.userReducer)

    const getPercentage = useMemo(() => {

        const initial = { correctCount: 0, wrongCount: 0 }
        if (questions.length) {
            const result = questions.reduce((acc, curr, index, array) => {
                const isRadio = curr.type === 'radio';
                const userAnswer = curr.user_answer || [];

                if (isRadio) {
                    const isRightAnswer = userAnswer[0] === curr.correct_answer[0];
                    return {
                        correctCount: isRightAnswer ? acc.correctCount + 1 : acc.correctCount,
                        wrongCount: isRightAnswer ? acc.wrongCount : acc.wrongCount + 1,
                    }
                } else {
                    const alCorrectAreChecked = userAnswer.every(el => curr.correct_answer.includes(el));

                    return {
                        correctCount: alCorrectAreChecked ? acc.correctCount + 1 : acc.correctCount,
                        wrongCount: alCorrectAreChecked ? acc.wrongCount : acc.wrongCount + 1,
                    }
                }
            }, initial)

            // Calculate the percentage
            const totalQuestions = questions.length;
            const percentage = (result.correctCount / totalQuestions) * 100;

            return percentage;
        }

        return 0;
    }, [questions]);


    return (
        <WrapperContainer1>
            <HeaderWithBackButton text={"Result"} />
            <View style={styles.innerContainer}>
                <View style={styles.circleView}>
                    <AnimatedCircularProgress
                        size={120}
                        width={8}
                        fill={getPercentage}
                        rotation={180}
                        // arcSweepAngle={300}
                        tintColor={theme.skyBlue}
                        tintTransparency
                        onAnimationComplete={() => console.log('onAnimationComplete')}
                        backgroundColor={theme.lightBorderGrey}>
                        {
                            (fill) => (
                                <Text style={styles.fillText}>
                                    Pass
                                </Text>
                            )
                        }
                    </AnimatedCircularProgress>
                </View>
                <View style={styles.content}>
                    <View style={styles.textView}>
                        <Text style={styles.highlightText}>
                            You're fail this time. Keep trying!
                        </Text>
                        <Text style={styles.para}>
                            The pass mark is 43 out of 50 (86%)
                        </Text>
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.boxText}>
                            1 out of 1
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.box1}>
                            <View style={styles.textView1}>
                                <Text style={styles.text0}>
                                    Best Category
                                </Text>
                                <CertificateIcon svgStyle={styles.svgStyle} />
                            </View>
                            <Text style={styles.text1}>
                                Hazard Awareness
                            </Text>
                        </View>
                        <View style={[styles.box1, { marginLeft: 10 }]}>
                            <View style={styles.textView1}>
                                <Text style={styles.text0}>
                                    Worst Category
                                </Text>
                                <CertificateIcon svgStyle={styles.svgStyle} />
                            </View>
                            <Text style={styles.text1}>
                                None
                            </Text>
                        </View>
                    </View>
                    <View style={styles.bottom}>
                        <TouchableOpacity
                            style={styles.btn}
                            activeOpacity={0.8}
                            onPress={() => navigation.navigate('review-mock-test', { result: questions })}>
                            <ReviewQuestionIcon svgStyle={styles.svgStyle1} />
                            <Text style={styles.btnText}>
                                Review Your Answers
                            </Text>
                        </TouchableOpacity>
                        <Button
                            title={"Start a Mock Test"}
                            onPress={() => navigation.replace('theory-test')} />
                    </View>
                </View>
            </View>
        </WrapperContainer1>
    )
}

export default MockTestResult

const styles = StyleSheet.create({
    innerContainer: {
        flex: 1,
        paddingHorizontal: 15,
        marginTop: 20
    },
    circleView: {
        alignItems: 'center'
    },
    fillText: {
        fontFamily: Fonts.medium,
        fontSize: 14,
        color: theme.black
    },
    content: {
        flex: 1,
        marginTop: 30,
        alignItems: 'center'
    },
    textView: {
    },
    highlightText: {
        fontFamily: Fonts.medium,
        color: theme.red,
        fontSize: 18,
        textAlign: 'center'
    },
    para: {
        fontFamily: Fonts.medium,
        color: theme.grayShade1,
        fontSize: 14,
        textAlign: 'center',
        marginTop: 5
    },
    box: {
        marginTop: 20,
        backgroundColor: theme.greenish,
        width: '100%',
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7
    },
    boxText: {
        fontFamily: Fonts.medium,
        fontSize: 20,
        color: theme.black
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    box1: {
        flex: 1,
        paddingVertical: 15,
        paddingHorizontal: 10,
        backgroundColor: theme.greenish,
        borderRadius: 7,
    },
    textView1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text0: {
        fontFamily: Fonts.medium,
        fontSize: 14,
        color: theme.black
    },
    text1: {
        fontFamily: Fonts.medium,
        fontSize: 16,
        color: theme.black
    },
    svgStyle: {
        height: 20,
        width: 20
    },
    bottom: {
        position: 'absolute',
        bottom: 20,
        width: '100%'
    },
    btn: {
        borderWidth: 1,
        borderColor: theme.skyBlue,
        height: 50,
        width: '100%',
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 500,
        marginBottom: 15
    },
    svgStyle1: {
        height: 28,
        width: 28,
        marginRight: 5
    },
    btnText: {
        fontFamily: Fonts.medium,
        fontSize: 16,
        color: theme.skyBlue
    }
})