import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
    goToBack,
    fromFlagScreen = false,
    showFlag = true
}) => {

    const dispatch = useDispatch();
    const { userFlag, userFavourite } = useSelector(state => state.userReducer)
    const [isFlag, setIsFlag] = useState(false)
    const [isFavorite, setIsFavorite] = useState(false)

    const mapDispatchToProps = (value) => {
        dispatch({ type: 'update_redux', payload: value });
    };

    useEffect(() => {
        checkQuestionIsFavorite()
        if(fromFlagScreen) checkQuestionIsFlag()
    }, [currentQuestion, currentQuestionIndex, userFavourite, userFlag])

    const checkQuestionIsFavorite = () => {
        const isItemInFavorites = userFavourite.some((el) => el?.id === currentQuestion?.id);
        if (isItemInFavorites) {
            setIsFavorite(true)
        } else {
            setIsFavorite(false)
        }
    }

    const checkQuestionIsFlag = () => {
        const isItemInFavorites = userFlag.some((el) => el?.id === currentQuestion?.id);
        if (isItemInFavorites) {
            setIsFlag(true)
        } else {
            setIsFlag(false)
        }
    }

    const onFavoriteClick = (item) => {
        const isItemInFavorites = userFavourite.some((el) => el.id === item.id);
        const updatedFavorite = isItemInFavorites
            ? userFavourite.filter((el) => el.id !== item.id)
            : [...userFavourite, { ...item, is_favorite: !item?.is_favorite }];

        mapDispatchToProps({ userFavourite: updatedFavorite });

    }

    const onFlag = (item) => {

        const isItemInFlags = userFlag.some((el) => el.id === item.id); //redux array

        //redux array
        const updatedFlag = isItemInFlags
            ? userFlag.filter((el) => el.id !== item.id)
            : [...userFlag, { ...item, is_flag: !item?.is_flag }];

        mapDispatchToProps({ userFlag: updatedFlag });//redux array
    }

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
                        {isFlag ?
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
                    {isFavorite ?
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