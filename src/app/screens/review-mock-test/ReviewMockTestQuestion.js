import React, { useState } from 'react';
import {
    View,
    FlatList,
    StyleSheet
} from 'react-native';
import QuestionList from './QuestionList';

const ReviewMockTestQuestion = ({ questions = [],  onQuestionClick }) => {

    return (
        <FlatList
            data={questions}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.innerContainer}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => <QuestionList data={item} index={index} onQuestionClick={onQuestionClick} />}
        />
    )
}

export default ReviewMockTestQuestion

const styles = StyleSheet.create({
    innerContainer: {
        flex: 1,
    }
})