import React, { useState, useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import WrapperContainer1 from '../../components/Wrapper/WrapperContainer1';
import HeaderWithBackButton from '../../components/Headers/HeaderWithBackButton';
import { theme } from '../../utils/colors';
import { Fonts } from '../../utils/fonts';
import ReviewMockTestQuestion from './ReviewMockTestQuestion';

const obj = [
    'correctQuestionArray',
    'wrongQuestionArray',
    'flagQuestionArray',
    'result',
]

const ReviewMockTest = ({ navigation, route }) => {

    const { result: questions } = route?.params || []

    const [selectedTab, setSelectedTab] = useState(0)

    const getQuestions = useMemo(() => {
        if (!questions.length) return [];

        const processQuestion = (elem) => {
            const isRadio = elem.type === 'radio';
            const userAnswer = elem.user_answer || [];

            if (isRadio) {
                const isRightAnswer = userAnswer[0] === elem.correct_answer[0];
                return { ...elem, isCorrect: isRightAnswer, isWrong: !isRightAnswer };
            } else {
                const allCorrectAreChecked = userAnswer.every(el => elem.correct_answer.includes(el));
                return { ...elem, isCorrect: allCorrectAreChecked, isWrong: !allCorrectAreChecked };
            }
        };

        const result = questions.map(processQuestion);
        const correctQuestionArray = result.filter(el => el.isCorrect);
        const wrongQuestionArray = result.filter(el => el.isWrong);
        const flagQuestionArray = result.filter(el => el.is_flag);

        return [{
            id: 1,
            name: 'Correct',
            short_name: 'correct',
            questions: correctQuestionArray,
            length: correctQuestionArray.length
        }, {
            id: 1,
            name: 'Wrong',
            short_name: 'wrong',
            questions: wrongQuestionArray,
            length: wrongQuestionArray.length
        }, {
            id: 1,
            name: 'Flag',
            short_name: 'flag',
            questions: flagQuestionArray,
            length: flagQuestionArray.length
        }]

    }, [questions]);

    const onTabClick = (index) => {
        setSelectedTab(index)
    }

    const onQuestionClick = (index) => {
        navigation.navigate('review-question', { result: getQuestions[selectedTab].questions, index: index })
    }

    return (
        <WrapperContainer1>
            <HeaderWithBackButton text={""} />
            <View style={styles.innerContainer}>
                <View style={styles.tabView}>
                    {getQuestions.map((el, index) => (
                        <TouchableOpacity
                            key={index}
                            activeOpacity={0.8}
                            style={styles.tab(selectedTab == index)}
                            onPress={() => onTabClick(index)}>
                            <Text style={styles.tabText(selectedTab == index)}>
                                {el.name} ({el.length})
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={styles.content}>
                    {selectedTab == 0 && <ReviewMockTestQuestion
                        questions={getQuestions[selectedTab].questions}
                        onQuestionClick={onQuestionClick}
                        selectedTab={selectedTab}
                    />
                    }
                    {selectedTab == 1 && <ReviewMockTestQuestion
                        questions={getQuestions[selectedTab].questions}
                        onQuestionClick={onQuestionClick}
                        selectedTab={selectedTab}
                    />
                    }
                    {selectedTab == 2 && <ReviewMockTestQuestion
                        questions={getQuestions[selectedTab].questions}
                        onQuestionClick={onQuestionClick}
                        selectedTab={selectedTab}
                    />
                    }
                </View>
            </View>
        </WrapperContainer1>
    )
}

export default ReviewMockTest

const styles = StyleSheet.create({
    innerContainer: {
        flex: 1,

        marginTop: 20
    },
    tabView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    tab: (is) => ({
        borderWidth: is ? 0 : 1,
        borderColor: theme.skyBlue,
        backgroundColor: is ? theme.skyBlue : 'transparent',
        // paddingHorizontal: 30,
        width: '30%',
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 7
    }),
    tabText: (is) => ({
        fontFamily: Fonts.medium,
        color: is ? theme.white : theme.skyBlue,
        fontSize: 16
    }),
    content: {
        flex: 1,
        marginTop: 20,
    }
})