import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import {
    View,
    Text,
    Alert,
    BackHandler,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image
} from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import WrapperContainer1 from '../../components/Wrapper/WrapperContainer1';
import { BackLeftIcon, BackWardArrowIcon, FlagIcon, ForwardEnWhiteIcon, HeartIcon, RedFlagIcon, RedHeartIcon, TimeIcon, ZoomPlusIcon } from '../../utils/images';
import { theme } from '../../utils/colors';
import { Fonts } from '../../utils/fonts';
import AlertBottomSheetComponent from '../../components/BottomSheet/AlertBottomSheetComponent';
import { useDispatch, useSelector } from 'react-redux';
import QuestionProgress from './QuestionProgress';
import FlaggedQuestionAlertModal from '../../components/Modal/FlaggedQuestionAlert';

let totalTimeInMinutes = 57

const FlaggedQuestionScreen = ({ navigation, route }) => {

    const { result = [], config, originalQuestion } = route?.params || {}
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(totalTimeInMinutes * 60);
    const [questions, setQuestions] = useState(result);
    const [flaggedQuestion, setFlaggedQuestion] = useState([])

    let currentQuestion = questions[currentQuestionIndex]

    const dispatch = useDispatch();
    const { userFlag, userFavourite } = useSelector(state => state.userReducer)

    const mapDispatchToProps = (value) => {
        dispatch({ type: 'update_redux', payload: value });
    };

    const bottomSheetRef = useRef(null);
    const flaggedModalRef = useRef(null)
    const imageModalRef = useRef()

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
        if ((currentQuestionIndex + 1) >= questions.length) {
            onFinish()
            return
        }
        setCurrentQuestionIndex(currentQuestionIndex + 1)
    }

    const onFinish = () => {
        let flaggedQuestion = questions.filter(el => el?.is_flag)
        if (flaggedQuestion?.length > 0) {
            setFlaggedQuestion(flaggedQuestion)
            flaggedModalRef.current.isOpen()
            return
        }
        else {
            goToResult()
        }
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
        // if (config?.autoSkip) {
        //     currentQuestion?.type == 'radio' ? onNext(updatedQuestions2) : currentQuestion?.user_answer?.length && currentQuestion?.user_answer?.length < 2 && onNext(updatedQuestions2)
        // }
    };

    const highLightOption = (el) => {
        let user_answer = questions[currentQuestionIndex]?.user_answer

        return user_answer?.length && user_answer.includes(el.option) ? true : false
    }


    const onPrev = () => {
        setCurrentQuestionIndex(currentQuestionIndex - 1)
    }

    const onYessPress = (flaggedQuestion) => {
        let quest = arrangeOriginalQuestions(flaggedQuestion)
        navigation.replace('flagged-question', { result: flaggedQuestion, originalQuestion: quest })
    }

    const btnStatus = () => {
        let type = questions[currentQuestionIndex]?.type
        let user_answer = questions[currentQuestionIndex]?.user_answer

        if (type == 'radio') {
            return user_answer?.length ? true : false
        }
        return user_answer?.length && user_answer?.length == 2 ? true : false
    }

    const onFavoriteClick = (item) => {
        const isItemInFavorites = userFavourite.some((el) => el.id === item.id);
        const updatedQuestions = [...questions];

        const updatedFavorite = isItemInFavorites
            ? userFavourite.filter((el) => el.id !== item.id)
            : [...userFavourite, { ...item, is_favorite: !item?.is_favorite }];


        updatedQuestions[currentQuestionIndex] = {
            ...updatedQuestions[currentQuestionIndex],
            is_favorite: !item?.is_favorite,
        };

        setQuestions(updatedQuestions);
        mapDispatchToProps({ userFavourite: updatedFavorite });

    }

    const onFlag = (item) => {
        const updatedQuestions = [...questions]; //local question state  

        const isItemInFlags = userFlag.some((el) => el.id === item.id); //redux array

        //redux array
        const updatedFlag = isItemInFlags
            ? userFlag.filter((el) => el.id !== item.id)
            : [...userFlag, { ...item, is_flag: !item?.is_flag }];

        //local question state
        updatedQuestions[currentQuestionIndex] = {
            ...updatedQuestions[currentQuestionIndex],
            is_flag: !item?.is_flag
        };

        setQuestions(updatedQuestions); //local question state
        mapDispatchToProps({ userFlag: updatedFlag });//redux array
    }

    const onConfirm = () => {
        handleClosePress()
        navigation.replace('mock-result',
            {
                result: arrangeOriginalQuestions(),
                isPractice: false
            })

    }

    const arrangeOriginalQuestions = () => {
        const newQuestion = originalQuestion.map((el, index) => {
            let find = questions.find((elem) => index == elem.originalIndex)
            if (find) {
                return {
                    ...el,
                    user_answer: find?.user_answer,
                    is_favorite: find.is_favorite ?? false,
                    is_flag: find.is_flag ?? false
                }
            } else {
                return {
                    ...el
                }
            }
        })
        return newQuestion
    }

    const onNoPress = (flaggedQuestion) => {
        let quest = arrangeOriginalQuestions(flaggedQuestion)
        navigation.replace('mock-result', { result: quest, isPractice: false })
    }

    const goToResult = () => {
        let quest = arrangeOriginalQuestions()
        console.log("on no flag quest", quest);
        // navigation.replace('mock-result', { result: quest, isPractice: false })
    }

    const openImageModal = (uri) => {
        imageModalRef.current.isOpen(uri);
    }
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
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainerStyle}>
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
                        {currentQuestion?.image &&
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => openImageModal(currentQuestion?.imageUrl)}
                                style={styles.imgView}>
                                <Image style={styles.img} source={{ uri: currentQuestion?.imageUrl }} />
                                <View style={styles.iconView}>
                                    <ZoomPlusIcon />
                                </View>
                                <View style={styles.overlay} />
                            </TouchableOpacity>
                        }
                        <View style={styles.optionView}>
                            <Text style={styles.text01}>
                                {currentQuestion?.type == 'radio' ? "Please select one answer" : "Please select one or more answer"}
                            </Text>
                            <View style={currentQuestion?.optionType == 'text' ? {} : styles.gridView}>
                                {currentQuestion?.options?.map((el, index) => (
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        key={index}
                                        style={el.image ? styles.gridView1(highLightOption(el)) : styles.option(highLightOption(el))}
                                        onPress={() => onSelectOption(el)}>
                                        {el.image ?
                                            <View style={styles.optionImg}>
                                                <Image source={{ uri: el.option }} style={styles.opImg} />
                                            </View>
                                            :
                                            <Text style={styles.optionText}>
                                                {el.option}
                                            </Text>
                                        }
                                    </TouchableOpacity>
                                ))}
                            </View>
                            {/* {currentQuestion?.options?.map((el, index) => (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                key={index}
                                style={styles.option(highLightOption(el))}
                                onPress={() => onSelectOption(el)}>
                                <Text style={styles.optionText}>
                                    {el.option}
                                </Text>
                            </TouchableOpacity>
                        ))} */}
                        </View>
                    </View>
                </View>
            </ScrollView>
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
                {!config?.autoSkip &&
                    <TouchableOpacity
                        style={styles.btn2(btnStatus())}
                        disabled={btnStatus() ? false : true}
                        activeOpacity={0.8}
                        onPress={() => currentQuestionIndex == questions.length - 1 ? onFinish() : onNext(questions)}>
                        <Text style={styles.btn2Text}>
                            {currentQuestionIndex == questions.length - 1 ? "Finish" : "Next"}
                        </Text>
                        <ForwardEnWhiteIcon svgStyle={styles.arrowSvg} />
                    </TouchableOpacity>
                }
            </View>
            <FlaggedQuestionAlertModal
                ref={flaggedModalRef}
                flaggedQuestion={flaggedQuestion}
                onYessPress={onYessPress}
                onNoPress={onNoPress} />
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
    contentContainerStyle: { paddingBottom: 100 },
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
    imgView: {
        height: 180,
        marginTop: 15,
    },
    img: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain'
    },
    iconView: {
        height: 40,
        width: 40,
        backgroundColor: theme.white,
        borderRadius: 7,
        position: 'absolute',
        bottom: 10,
        right: 10,
        zIndex: 100,
        padding: 6
    },
    overlay: {
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.2)',
        position: 'absolute'
    },
    gridView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    gridView1: (is) => ({
        width: 100 / 2.2 + '%',
        marginBottom: 20,
        borderColor: theme.skyBlue,
        backgroundColor: theme.greenish,
        borderWidth: is ? 1.5 : 0,
        borderRadius: 7
    }),
    optionImg: {
        height: 150,
    },
    opImg: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain'
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