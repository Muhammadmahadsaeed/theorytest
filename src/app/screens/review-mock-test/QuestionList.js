import React from "react";
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';
import { ForwardEnIcon } from "../../utils/images";
import { theme } from "../../utils/colors";
import { Fonts } from "../../utils/fonts";

const QuestionList = ({ data, onQuestionClick, index }) => {
    return (
        <TouchableOpacity
            style={[styles.row]}
            activeOpacity={0.95}
            onPress={() => onQuestionClick(index)}>
            <View style={styles.textView}>
                <Text style={styles.text}>
                    {data.question}
                </Text>
            </View>
            <View style={styles.icon}>
                <ForwardEnIcon />
            </View>
        </TouchableOpacity>
    )
}

export default QuestionList

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        marginHorizontal: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.white,
        marginBottom: 10,
        marginTop: 5,
        borderRadius: 8,
        paddingVertical: 15,
        paddingHorizontal: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    textView: {
        flex: 1,
    },
    text: {
        fontFamily: Fonts.medium,
        fontSize: 16,
        color: theme.skyBlue
    },
    icon: {
        height: 35,
        width: 35
    }
})