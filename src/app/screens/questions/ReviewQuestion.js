import React, { useRef, useState, useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView
} from 'react-native';
import WrapperContainer1 from '../../components/Wrapper/WrapperContainer1';
import { CrossRoundIcon, InfoCircleIcon, TickBoxIcon, ZoomPlusIcon } from '../../utils/images';
import { theme } from '../../utils/colors';
import { Fonts } from '../../utils/fonts';
import { useDispatch } from 'react-redux';
import TextModal from '../../components/Modal/TextModal';
import QuestionHeader from './QuestionHeader';
import QuestionFooter from './QuestionFooter';
import QuestionProgress from './QuestionProgress';
import ImageModal from '../../components/Modal/ImageModal';


const ReviewQuestionScreen = ({ navigation, route }) => {

    const { result: questions, index, fromFlagndLikeRoute, fromFlagScreen } = route?.params || {}

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(index || 0);
    const [questArray, setQuestArray] = useState([])

    const dispatch = useDispatch();

    const textModalRef = useRef()
    const imageModalRef = useRef()

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
                if (fromFlagndLikeRoute) {
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
        setQuestArray(array)
        return array
    }, [questions])

    const goToBack = () => {
        navigation.goBack()
    }

    const getIcon = (item) => {
        if (item.isCorrectAnswer && fromFlagndLikeRoute) {
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

    const openImageModal = (uri) => {
        imageModalRef.current.isOpen(uri);
    }

    let currentQuestion = questArray[currentQuestionIndex]

    return (
        <WrapperContainer1>
            <QuestionHeader
                currentQuestion={currentQuestion}
                setQuestions={setQuestArray}
                goToBack={goToBack}
                fromFlagScreen={fromFlagScreen}
                fromFlagndLikeRoute={fromFlagndLikeRoute}
                questions={questArray}
                showFlag={fromFlagndLikeRoute ? true : false}
                currentQuestionIndex={currentQuestionIndex} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainerStyle}>
                <View style={styles.container}>
                    <QuestionProgress currentQuestionIndex={currentQuestionIndex} questions={questArray} />
                    <View style={styles.row}>
                        <Text style={styles.heading}>
                            Question {currentQuestionIndex + 1} / {questArray.length}
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
                        <View style={[currentQuestion?.optionType == 'text' ? {} : styles.gridView, styles.optionView]}>
                            {currentQuestion?.options?.map((el, index) => (
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    key={index}
                                    disabled={true}
                                    style={el.image ? styles.gridView1(el) : styles.option(el)}>
                                    {el.image ?
                                        <View style={styles.optionImg}>
                                            <Image source={{ uri: el.option }} style={styles.opImg} />
                                            <View style={styles.icon02}>
                                                {getIcon(el)}
                                            </View>
                                        </View>
                                        :
                                        <>
                                            <View style={styles.textView}>
                                                <Text style={styles.optionText}>
                                                    {el.option}
                                                </Text>
                                            </View>
                                            <View style={styles.icon01}>
                                                {getIcon(el)}
                                            </View>
                                        </>
                                    }
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>
            <QuestionFooter
                questions={questArray}
                fromFlagndLikeRoute={fromFlagndLikeRoute}
                currentQuestion={currentQuestion}
                currentQuestionIndex={currentQuestionIndex}
                setCurrentQuestionIndex={setCurrentQuestionIndex}
                navigation={navigation} />
            <TextModal ref={textModalRef} currentQuestion={currentQuestion} />
            <ImageModal ref={imageModalRef} />
        </WrapperContainer1>
    )
}

export default ReviewQuestionScreen

const styles = StyleSheet.create({
    contentContainerStyle: { paddingBottom: 100 },
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
    optionView: {
        marginTop: 40
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
        borderRadius: 7,
        backgroundColor: theme.greenish
    }),
    optionImg: {
        height: 150,
    },
    opImg: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain'
    },
    text01: {
        fontFamily: Fonts.medium,
        fontSize: 14,
        color: theme.grayShade1,
        marginBottom: 5
    },
    option1: {

    },
    textView: {
        flex: 1,
        marginRight: 10
    },
    option: (is) => ({
        paddingVertical: 15,
        marginBottom: 20,
        paddingHorizontal: 20,
        borderRadius: 7,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.greenish

    }),
    optionImg: {
        height: 150,
    },
    opImg: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain'
    },
    icon02: {
        height: 25,
        width: 25,
        position: 'absolute',
        top: 0,
        right: 0
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