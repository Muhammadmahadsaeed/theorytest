import React, { useState, useRef, useCallback, useMemo } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    ScrollView
} from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import WrapperContainer1 from '../../components/Wrapper/WrapperContainer1';
import HeaderWithBackButton from '../../components/Headers/HeaderWithBackButton';
import { theme } from '../../utils/colors';
import { Fonts } from '../../utils/fonts';

const RevisionQuestion = ({ }) => {

    const [list, setList] = useState([
        {
            id: 1,
            name: 'Alertness',
            // icon: <ClockWatchIcon />,

        },
        {
            id: 2,
            name: "Attitude",
            // icon: <ReviewIcon />,
            // link: 'revision-question'
        },
        {
            id: 3,
            name: "Documents",
            // icon: <QuestionIcon />
        },
        {
            id: 3,
            name: "Hazard Awareness",
            // icon: <SearchFileIcon />
        },
        {
            id: 1,
            name: 'Motorway Rules',
            // icon: <ClockWatchIcon />,

        },
        {
            id: 2,
            name: "Other Types of Vehicle",
            // icon: <ReviewIcon />,
            // link: 'revision-question'
        },
        {
            id: 3,
            name: "Road and Traffic Signs",
            // icon: <QuestionIcon />
        },
        {
            id: 3,
            name: "Vehicle Handling",
            // icon: <SearchFileIcon />
        },
        {
            id: 1,
            name: 'Vulnerable Road Users',
            // icon: <ClockWatchIcon />,

        },
        {
            id: 2,
            name: "Safety Margins",
            // icon: <ReviewIcon />,
            // link: 'revision-question'
        },
        {
            id: 3,
            name: "Safety and Your Vehicle",
            // icon: <QuestionIcon />
        },
        {
            id: 3,
            name: "Vehicle Loading",
            // icon: <SearchFileIcon />
        },
        {
            id: 3,
            name: "Incidents, Accidents and Emergencies",
            // icon: <SearchFileIcon />
        }
    ])

    return (
        <WrapperContainer1>
            <HeaderWithBackButton text={"Select Categories to Practise"} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.innerContainer}>
                    {list.map((el, index) => (
                        <TouchableOpacity
                            style={[styles.row, { ...el?.css }]}
                            key={index}
                            activeOpacity={0.8}
                            onPress={() => onClick(el)}>
                            <View style={styles.imgView}>
                                {el.icon}
                            </View>
                            <View style={styles.textView}>
                                <Text style={styles.text}>
                                    {el.name}
                                </Text>
                                <View style={styles.progressView}>
                                    <View style={[styles.progressBar, { width: ((5 / 27) * 100) + '%' }]} />
                                </View>
                                <View style={styles.row1}>
                                    <Text style={styles.text1}>
                                        Answered: 1/20
                                    </Text>
                                    <Text style={styles.text1}>
                                        Correctly: 1/20
                                    </Text>
                                </View>
                            </View>
                            <AnimatedCircularProgress
                                size={40}
                                width={3}
                                fill={15}
                                rotation={180}
                                // arcSweepAngle={300}
                                tintColor={theme.skyBlue}
                                tintTransparency
                                onAnimationComplete={() => console.log('onAnimationComplete')}
                                backgroundColor={theme.lightBorderGrey}>
                                {
                                    (fill) => (
                                        <Text style={styles.fillText}>
                                            10%
                                        </Text>
                                    )
                                }
                            </AnimatedCircularProgress>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </WrapperContainer1>
    )
}

export default RevisionQuestion

const styles = StyleSheet.create({
    innerContainer: {
        flex: 1,
        marginHorizontal: 15,
        marginTop: 20
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.white,
        marginBottom: 15,
        borderRadius: 8,
        paddingVertical: 15,
        paddingHorizontal: 10,
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
        marginHorizontal: 20
    },
    imgView: {
        height: 45,
        width: 45,
        backgroundColor: theme.white
    },
    text: {
        fontFamily: Fonts.medium,
        fontSize: 16,
        color: theme.black
    },
    description: {
        fontFamily: Fonts.medium,
        fontSize: 12,
        color: theme.grayShade1
    },
    progressView: {
        marginVertical: 10,
        height: 5,
        width: '100%',
        backgroundColor: theme.grey
    },
    progressBar: {
        height: 5,
        backgroundColor: theme.skyBlue
    },
    row1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    text1: {
        fontFamily: Fonts.medium,
        fontSize: 12,
        color: theme.lightGrey
    },
    fillText: {
        fontFamily: Fonts.medium,
        fontSize: 10,
        color: theme.skyBlue
    }
})