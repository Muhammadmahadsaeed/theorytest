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

const FlagAndLikeQuestion = ({ navigation, route }) => {

    const { fromRoute } = route?.params || {}

    const { userFavourite, userFlag } = useSelector(state => state.userReducer)

    const [questions, setQuestions] = useState(fromRoute == 'flag' ? userFlag : userFavourite)

    const onQuestionClick = () => {

    }

    return (
        <WrapperContainer1>
            <HeaderWithBackButton text={fromRoute == 'flag' ? 'Flag Questions' : 'Liked Questions'} />
            <View style={styles.innerContainer}>
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