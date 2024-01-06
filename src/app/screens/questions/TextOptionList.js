import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { CrossRoundIcon, TickBoxIcon } from '../../utils/images';
import { theme } from '../../utils/colors';
import { Fonts } from '../../utils/fonts';

const TextOptionList = ({
    questions,
    el,
    isReview = false,
    currentQuestion,
    isMock = false,
    onSelectOption,
    currentQuestionIndex
}) => {

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

    const highLightOption = (el) => {
        let user_answer = questions[currentQuestionIndex]?.user_answer
        return user_answer?.length && user_answer.includes(el.option) ? true : false
    }

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.row01, currentQuestion?.isCheck ? styles.option1 : styles.option(highLightOption(el))]}
            onPress={() => isReview ? {} : onSelectOption(el)}>
            <View style={styles.textView}>
                <Text style={styles.optionText}>
                    {el.option}
                </Text>
            </View>
            {!isMock &&
                <View style={styles.icon01}>
                    {getIcon(el)}
                </View>
            }
        </TouchableOpacity>
    )
}

export default TextOptionList

const styles = StyleSheet.create({
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
        backgroundColor: theme.greenish,
        paddingVertical: 15,
        marginBottom: 20,
        paddingHorizontal: 20,
        borderRadius: 7
    }),
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
    icon01: {
        height: 25,
        width: 25,
    },
    optionText: {
        fontFamily: Fonts.medium,
        fontSize: 14,
        color: theme.black
    },
})