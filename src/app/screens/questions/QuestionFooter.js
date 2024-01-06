import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { BackWardArrowIcon, ForwardEnWhiteIcon } from '../../utils/images';
import { theme } from '../../utils/colors';
import { Fonts } from '../../utils/fonts';

const QuestionFooter = ({
    questions = [],
    currentQuestion,
    currentQuestionIndex,
    onPrev,
    onCheck,
    onNext,
    isMock
}) => {

    const checkBtn = () => {
        let type = questions[currentQuestionIndex]?.type
        let user_answer = questions[currentQuestionIndex]?.user_answer

        if (type == 'radio') {
            return user_answer?.length ? true : false
        }
        return user_answer?.length && user_answer?.length == 2 ? true : false
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
            {(isMock || currentQuestion?.isCheck) ?
                <TouchableOpacity
                    style={styles.btn2(checkBtn())}
                    disabled={checkBtn() ? false : true}
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