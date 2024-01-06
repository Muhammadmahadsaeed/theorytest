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
import WrapperContainer1 from '../../components/Wrapper/WrapperContainer1';
import { BackLeftIcon, BackWardArrowIcon, CrossRoundIcon, FlagIcon, ForwardEnWhiteIcon, HeartIcon, InfoCircleIcon, RedFlagIcon, RedHeartIcon, TickBoxIcon, TimeIcon } from '../../utils/images';
import { theme } from '../../utils/colors';
import { Fonts } from '../../utils/fonts';
import { useDispatch, useSelector } from 'react-redux';
import TextModal from '../../components/Modal/TextModal';


const ReviewQuestionScreen = ({ navigation, route }) => {

    const { result: questions, index } = route?.params || []

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(index || 0);

    const dispatch = useDispatch();
    const { userFlag, userFavourite } = useSelector(state => state.userReducer)

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

    const onNext = () => {
        let index = currentQuestionIndex + 1
        if (index >= questions.length) {

            return
        }
        setCurrentQuestionIndex(currentQuestionIndex + 1)
    }

    const onPrev = () => {
        setCurrentQuestionIndex(currentQuestionIndex - 1)
    }

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

        // setQuestions(updatedQuestions);
    };

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

        // setQuestions(updatedQuestions);
    };

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

    const openModal = () => {
        textModalRef.current.isOpen()
    }

    let currentQuestion = questionsWithResult[currentQuestionIndex]

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
                    style={styles.btn2(currentQuestion?.user_answer ? true : false)}
                    disabled={currentQuestion?.user_answer ? false : true}
                    activeOpacity={0.8}
                    onPress={() => onNext()}>
                    <Text style={styles.btn2Text}>
                        {currentQuestionIndex == questions.length - 1 ? "Finish" : "Next"}
                    </Text>
                    <ForwardEnWhiteIcon svgStyle={styles.arrowSvg} />
                </TouchableOpacity>
            </View>
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