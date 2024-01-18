import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native';
import { theme } from '../../utils/colors';
import { Fonts } from '../../utils/fonts';

const QuestionList = ({ currentQuestion, onSelectOption, customStyles }) => {
    return (
        <View style={styles.questionView}>
            <Text style={styles.text}>
                {currentQuestion?.question}
            </Text>
            {currentQuestion.image &&
                <View style={styles.imgView}>
                    <Image style={styles.img} source={{ uri: currentQuestion?.imageUrl }} />
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.iconView}>
                        <ZoomPlusIcon />
                    </TouchableOpacity>
                    <View style={styles.overlay} />
                </View>
            }
            <View style={styles.optionView}>
                <Text style={styles.text01}>
                    {currentQuestion?.type == 'radio' ? "Please select one answer" : "Please select one or more answer"}
                </Text>
                {currentQuestion?.options?.map((el, index) => (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        key={index}
                        style={{ ...customStyles }}
                        onPress={() => onSelectOption(el)}>
                        <Text style={styles.optionText}>
                            {el.option}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    )
}

export default QuestionList

const styles = StyleSheet.create({
    questionView: {
        marginTop: 30
    },
    text: {
        fontFamily: Fonts.medium,
        fontSize: 20,
        color: theme.black
    },
    optionView: {
        marginTop: 40
    },
    text01: {
        fontFamily: Fonts.medium,
        fontSize: 14,
        color: theme.grayShade1,
        marginBottom: 5
    },
    imgView: {
        height: 180,
        marginTop: 15,
    },
    img: {
        height: '100%',
        width: '100%',
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
    optionText: {
        fontFamily: Fonts.medium,
        fontSize: 14,
        color: theme.black
    },
})