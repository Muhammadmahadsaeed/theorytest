import React from 'react'
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native'
import { theme, white } from '../../utils/colors';
import { Fonts } from '../../utils/fonts';

const { width, height } = Dimensions.get('window')
const SPACING = 5;

const SliderList = ({ data }) => {


    return (
        <TouchableOpacity
            style={styles.cardView}
            activeOpacity={0.95}>
            <View style={styles.image}>
                {data.image}
            </View>
            <View style={styles.textView}>
                <Text style={styles.itemText}>
                    {data.title}
                </Text>
                <Text style={styles.itemDescription}>
                    {data.description}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = ({
    cardView: {
        height: height * 0.8,
        width: width,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: width * 0.9,
        height: height * 0.6,
    },
    textView: {
        paddingHorizontal: 15,
    },
    itemText: {
        fontSize: 16,
        fontFamily: Fonts.bold,
        color: theme.textBlack,
        textAlign: 'center'
    },
    itemDescription: {
        marginTop: 15,
        fontSize: 16,
        fontFamily: Fonts.medium,
        color: theme.textBlack,
        textAlign: 'center'
    }
})

export default SliderList