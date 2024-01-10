import React, { useCallback, useEffect, useMemo } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { BackLeftIcon, FlagIcon, HeartIcon, RedFlagIcon, RedHeartIcon } from '../../utils/images';
import { useDispatch, useSelector } from 'react-redux';

const QuestionHeader = ({
    currentQuestion,
    currentQuestionIndex,
    questions,
    setQuestions,
    goToBack,
    setFlaggedQuestion,
    flaggedQuestion,
    showFlag = true
}) => {

    const dispatch = useDispatch();
    const { userFlag, userFavourite } = useSelector(state => state.userReducer)

    const mapDispatchToProps = (value) => {
        dispatch({ type: 'update_redux', payload: value });
    };

    const onFavoriteClick = useCallback((item) => {
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
    }, [currentQuestion, currentQuestionIndex])

    const onFlag = useCallback((item) => {
        let newFlaggedArr = [...flaggedQuestion]; //local flagged state
        const updatedQuestions = [...questions]; //local question state

        const isItemInFlags = userFlag.some((el) => el.id === item.id); //redux array
        const alreadyFlagged = flaggedQuestion.some(el => el.id === item.id); //local state

        //redux array
        const updatedFlag = isItemInFlags
            ? userFlag.filter((el) => el.id !== item.id)
            : [...userFlag, item];

        //local question state
        updatedQuestions[currentQuestionIndex] = {
            ...updatedQuestions[currentQuestionIndex],
            is_flag: !questions[currentQuestionIndex]?.is_flag,
        };

        //local flagged state
        if (alreadyFlagged) {
            newFlaggedArr = flaggedQuestion.filter(el => el.id !== item.id)
        } else {
            newFlaggedArr.push({
                ...item,
                is_flag: !item?.is_flag,
                originalIndex: currentQuestionIndex
            })
        }
        setQuestions(updatedQuestions); //local question state
        setFlaggedQuestion(newFlaggedArr)//local flagged state
        mapDispatchToProps({ userFlag: updatedFlag });//redux array
    }, [currentQuestion, currentQuestionIndex])

    return (
        <View style={styles.headerTop}>
            <TouchableOpacity
                style={styles.left}
                activeOpacity={0.95}
                onPress={() => goToBack(0)}>
                <BackLeftIcon />
            </TouchableOpacity>
            <View style={styles.right}>
                {showFlag &&
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
                }
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
    )
}

export default QuestionHeader

const styles = StyleSheet.create({
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
})