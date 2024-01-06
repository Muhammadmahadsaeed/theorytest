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
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import WrapperContainer1 from '../../components/Wrapper/WrapperContainer1';
import { BackLeftIcon, BackWardArrowIcon, CrossRoundIcon, FlagIcon, ForwardEnWhiteIcon, HeartIcon, InfoCircleIcon, RedFlagIcon, RedHeartIcon, TickBoxIcon, TimeIcon } from '../../utils/images';
import { theme } from '../../utils/colors';
import { Fonts } from '../../utils/fonts';
import questionArray from '../../services/section.json'
import AlertBottomSheetComponent from '../../components/BottomSheet/AlertBottomSheetComponent';
import { useDispatch, useSelector } from 'react-redux';
import TextModal from '../../components/Modal/TextModal';

let totalTimeInMinutes = 57

const RevisionQuestionByTopic = ({ navigation }) => {

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [questions, setQuestions] = useState(questionArray);

    const bottomSheetRef = useRef(null);
    const textModalRef = useRef()
    const dispatch = useDispatch();
    const { userFlag, userFavourite } = useSelector(state => state.userReducer)

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

    const onNext = () => {
        let index = currentQuestionIndex + 1
        if (index >= questions.length) {
            navigation.replace('mock-result', { result: questions })
            return
        }
        setCurrentQuestionIndex(currentQuestionIndex + 1)
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

    const onPrev = () => {
        setCurrentQuestionIndex(currentQuestionIndex - 1)
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

    const onFlag = (item) => {
        const isItemInFlags = userFlag.some((el) => el.id === item.id);

        const updatedFlag = isItemInFlags
            ? userFlag.filter((el) => el.id !== item.id)
            : [...userFlag, item];

        mapDispatchToProps({ userFlag: updatedFlag });

        const updatedQuestions = [...questions];
        updatedQuestions[currentQuestionIndex] = {
            ...updatedQuestions[currentQuestionIndex],
            is_flag: !questions[currentQuestionIndex]?.is_flag,
        };

        setQuestions(updatedQuestions);
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

    const onFavoriteClick = async (item) => {
        const isItemInFavorites = userFavourite.some((el) => el.id === item.id);
        const updatedQuestions = [...questions];

        const updatedFavorite = isItemInFavorites
            ? userFavourite.filter((el) => el.id !== item.id)
            : [...userFavourite, item];

        mapDispatchToProps({ userFavourite: updatedFavorite });

        updatedQuestions[currentQuestionIndex] = {
            ...updatedQuestions[currentQuestionIndex],
            is_favorite: !questions[currentQuestionIndex]?.is_favorite,
        };

        setQuestions(updatedQuestions);
    };

    const checkBtn = () => {
        let type = questions[currentQuestionIndex]?.type
        let user_answer = questions[currentQuestionIndex]?.user_answer

        if (type == 'radio') {
            return user_answer?.length ? true : false
        }
        return user_answer?.length && user_answer?.length == 2 ? true : false
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
            <View style={styles.headerTop}>
                <TouchableOpacity
                    style={styles.left}
                    activeOpacity={0.95}
                    onPress={() => goToBack(0)}>
                    <BackLeftIcon />
                </TouchableOpacity>
                <View style={styles.right}>
                    <TouchableOpacity
                        style={[styles.flagIcon, { alignItems: 'center' }]}
                        activeOpacity={0.8}
                        onPress={() => onFlag(currentQuestion)}>
                        {currentQuestion?.is_flag ?
                            <RedFlagIcon svgStyle={styles.flagIconSvg} />
                            :
                            <FlagIcon svgStyle={styles.flagIconSvg} />
                        }
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.flagIcon, { marginLeft: 5, alignItems: 'flex-end' }]}
                        activeOpacity={0.8}
                        onPress={() => onFavoriteClick(currentQuestion)}>
                        {currentQuestion?.is_favorite ?
                            <RedHeartIcon svgStyle={styles.flagIconSvg} />
                            :
                            <HeartIcon svgStyle={styles.flagIconSvg} />
                        }
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.container}>
                <View style={styles.progressView}>
                    <View style={[styles.progressBar, { width: (((currentQuestionIndex + 1) / questions.length) * 100) + '%' }]} />
                </View>
                <View style={styles.row}>
                    <Text style={styles.heading}>
                        Question {currentQuestionIndex + 1} / 50
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
                {currentQuestion?.isCheck ?
                    <TouchableOpacity
                        style={styles.btn2(true)}
                        // disabled={checkBtn() ? false : true}
                        activeOpacity={0.8}
                        onPress={() => onNext()}>
                        <Text style={styles.btn2Text}>
                            {currentQuestionIndex == questions.length - 1 ? "Finish" : "Next"}
                        </Text>
                        <ForwardEnWhiteIcon svgStyle={styles.arrowSvg} />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                        style={styles.btn2(checkBtn())}
                        disabled={checkBtn() ? false : true}
                        activeOpacity={0.8}
                        onPress={() => onCheck()}>
                        <Text style={styles.btn2Text}>
                            Check
                        </Text>
                        <ForwardEnWhiteIcon svgStyle={styles.arrowSvg} />
                    </TouchableOpacity>
                }
            </View>
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
            <TextModal ref={textModalRef} />
        </WrapperContainer1>
    )
}

export default RevisionQuestionByTopic

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
    right: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    flagIcon: {
        height: 50,
        width: 50,
        justifyContent: 'center'
    },
    flagIconSvg: {
        height: 25,
        width: 25
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