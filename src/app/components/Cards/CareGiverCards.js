import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';
import { Fonts } from '../../utils/fonts';
import { theme } from '../../utils/colors';
import { EyeIcon, PinBlueIcon, StarIcon, imagegallery, profile } from '../../utils/images';
import { capitalizeFirstLetter, formatStringWithCommas } from '../../helper/helper';


const CareGiverCard = ({
    data,
    onPress,
    customStyle = {},
    selectedCareGiver = {},
    isEye = false,
    onEyePress
}) => {


    return (
        <TouchableOpacity
            style={[styles.row0(selectedCareGiver?.id == data?.id), customStyle]}
            activeOpacity={0.95}
            onPress={() => onPress ? onPress(data) : console.log("========")}>
            <View style={styles.imageView}>
                <Image source={(data?.image || data?.profile_banner) ? { uri: (data?.image || data?.profile_banner) } : imagegallery} style={styles.img} />
            </View>
            <View style={styles.content}>
                <View style={styles.textView}>
                    <Text style={styles.text00}>
                        {capitalizeFirstLetter(data?.name)}
                    </Text>
                    {data?.seller_tags &&
                        <Text style={styles.text1} numberOfLines={1}>
                            {formatStringWithCommas(data?.seller_tags)}
                        </Text>
                    }
                </View>
                <View style={styles.row01}>
                    <View style={styles.left}>
                        <View style={styles.icon}>
                            <StarIcon />
                        </View>
                        <Text style={styles.ratingText}>
                            4.5 (834)
                        </Text>
                    </View>
                    {data?.distance &&
                        <View style={styles.right}>
                            <View style={styles.icon}>
                                <PinBlueIcon />
                            </View>
                            <Text style={styles.distance}>
                                {data?.distance?.toFixed(2)} KM
                            </Text>
                        </View>
                    }
                    {isEye &&
                        <TouchableOpacity
                            style={styles.eyeBtn}
                            onPress={() => onEyePress(data)}
                            activeOpacity={0.8}>
                            <View style={styles.icon1}>
                                <EyeIcon />
                            </View>
                        </TouchableOpacity>
                    }
                </View>
            </View>
        </TouchableOpacity>
    )

}

export default CareGiverCard

const styles = StyleSheet.create({
    row0: (is) => ({
        marginHorizontal: 15,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.bg,
        borderRadius: 16,
        borderWidth: is ? 1.5 : 0,
        borderColor: is ? theme.borderPurple : 'transparent',
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    }),
    imageView: {
        height: 92,
        width: 92,
        borderRadius: 16,
    },
    img: {
        height: '100%',
        width: '100%',
        borderRadius: 16,
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginLeft: 10,
    },
    textView: {
        // flex: 1
    },
    text00: {
        fontSize: 16,
        fontFamily: Fonts.bold,
        color: theme.text
    },
    text1: {
        fontSize: 14,
        fontFamily: Fonts.medium,
        color: theme.gray,
        marginTop: 5,
        marginBottom: 10
    },
    row01: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    left: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    icon: {
        height: 13,
        width: 13
    },
    icon1: {
        height: 20,
        width: 20
    },
    ratingText: {
        fontSize: 12,
        fontFamily: Fonts.medium,
        color: theme.textGray,
        marginLeft: 5
    },
    right: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: theme.bgBlue,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 6
    },
    eyeBtn: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: theme.bgBlue,
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 6
    },
    distance: {
        fontSize: 12,
        fontFamily: Fonts.medium,
        color: theme.textBlue,
        marginLeft: 5
    }
})