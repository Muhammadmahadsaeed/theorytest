import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import { theme } from '../../utils/colors';

const QuestionProgress = ({currentQuestionIndex, questions }) => {
    return (
        <View style={styles.progressView}>
            <View style={[styles.progressBar, { width: (((currentQuestionIndex + 1) / questions.length) * 100) + '%' }]} />
        </View>
    )
}

export default QuestionProgress

const styles = StyleSheet.create({
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
})