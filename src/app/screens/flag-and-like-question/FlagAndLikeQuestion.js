import React, { useState } from 'react';
import {
    View,
    FlatList,
    StyleSheet
} from 'react-native';
import QuestionList from '../review-mock-test/QuestionList';
import { useSelector } from 'react-redux';
import WrapperContainer1 from '../../components/Wrapper/WrapperContainer1';
import HeaderWithBackButton from '../../components/Headers/HeaderWithBackButton';
import { EmptyList } from '../../components/Exception/EmptyList';

const FlagAndLikeQuestion = ({ navigation, route }) => {

    const { fromRoute, name, path } = route?.params || {}

    const { userFavourite, userFlag } = useSelector(state => state.userReducer)

    const [questions, setQuestions] = useState(fromRoute == 'flag' ? userFlag : userFavourite || [])

    const onQuestionClick = (index) => {
        navigation.navigate('review-question', {
            result: fromRoute == 'flag' ? userFlag : userFavourite,
            index: index,
            fromRoute: true
        })
    }

    return (
        <WrapperContainer1>
            <HeaderWithBackButton
                path={path}
                text={fromRoute == 'flag' ? 'Flag Questions' : name || 'Liked Questions'}
            />
            <View style={styles.innerContainer}>
                {questions?.length > 0 ?
                    <FlatList
                        data={questions}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.contentContainerStyle}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => <QuestionList
                            data={item}
                            index={index}
                            onQuestionClick={onQuestionClick} />}
                    />
                    :
                    <EmptyList text={`You have no data`} />
                }
            </View>
        </WrapperContainer1>
    )
}

export default FlagAndLikeQuestion

const styles = StyleSheet.create({
    innerContainer: {
        flex: 1,
    }
})