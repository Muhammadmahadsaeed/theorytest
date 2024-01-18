import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import ToggleSwitch from 'toggle-switch-react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { theme, } from '../../utils/colors';
import Button from '../Buttons/Button';
import { Fonts } from '../../utils/fonts';
import { ReviewFileIcon, SmileIcon, TimerIcon } from '../../utils/images';

const TheoryTestBottomSheet = ({ questions, selectedItem, onCancel, onContinue, type }) => {

    const [countries, setCountries] = useState([
        {
            id: 1,
            name: 'GB',
            icon: ''
        },
        {
            id: 2,
            name: 'IN',
            icon: ''
        }
    ])
    const [selectedTab, setSelectedTab] = useState('GB')
    const [toggles, setToggles] = useState({
        "autoSkip": false,
        "newQuestion": false,
        "incorrectQuestion": false,
        "showAnswer": type !== 'mock-test' ? true : false
    })
    const [numOfQues, setNumOfQues] = useState([
        {
            id: 1,
            name: 'All',
            length: 'all',
            isShow: true
        },
        {
            id: 1,
            name: '10',
            length: '10',
            isShow: true
        },
        {
            id: 1,
            name: '20',
            length: '20',
            isShow: true
        },
        {
            id: 1,
            name: '50',
            length: '50',
            isShow: questions?.length > 50 ? true : false
        },

    ])
    const [quesLen, setQuesLen] = useState('10')

    const onTabChange = (el) => {
        setSelectedTab(el.name)
    }

    const onChangeTab = (item) => {
        setQuesLen(item.length)
    }

    return (
        <View style={styles.container}>
            <View style={styles.headingView}>
                <Text style={styles.hidden}>
                    say
                </Text>
                <Text style={styles.heading}>
                    {selectedItem?.name}
                </Text>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.paraView}
                    onPress={onCancel}>
                    <Text style={styles.para}>
                        Cancel
                    </Text>
                </TouchableOpacity>
            </View>
            <BottomSheetScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.upper}>
                    {type == 'mock-test' &&
                        <>
                            <View style={styles.circleView}>
                                <AnimatedCircularProgress
                                    size={100}
                                    width={5}
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
                                                1/{questions.length}
                                            </Text>
                                        )
                                    }
                                </AnimatedCircularProgress>
                            </View>
                            <View style={styles.descriptionView}>
                                <View style={styles.imgView}>
                                    <TimerIcon svgStyle={styles.svgStyle} />
                                    <Text style={styles.time}>
                                        57 min
                                    </Text>
                                </View>
                                <View style={styles.imgView}>
                                    <ReviewFileIcon svgStyle={styles.svgStyle} />
                                    <Text style={styles.time}>
                                        43/50 to pass
                                    </Text>
                                </View>
                                <View style={styles.imgView}>
                                    <SmileIcon svgStyle={styles.svgStyle} />
                                    <Text style={styles.time}>
                                        50 questions
                                    </Text>
                                </View>
                            </View>
                        </>
                    }
                    <View style={styles.tabView}>
                        <Text style={styles.heading0}>
                            Where are you taking your theory test?
                        </Text>
                        <View style={styles.row}>
                            {countries.map((el, index) => (
                                <TouchableOpacity
                                    key={index}
                                    activeOpacity={0.8}
                                    style={styles.tab(selectedTab == el.name)}
                                    onPress={() => onTabChange(el)}>
                                    <Text style={styles.tabText(selectedTab == el.name)}>
                                        {el.name}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                    {type !== 'mock-test' &&
                        <View style={[styles.col]}>
                            <Text style={styles.heading01}>
                                No of Questions
                            </Text>
                            <View style={[styles.tabView01]}>
                                {numOfQues.map((el, index) => {
                                    if (el.isShow) {
                                        return (
                                            <TouchableOpacity
                                                key={index}
                                                activeOpacity={0.8}
                                                onPress={() => onChangeTab(el)}
                                                style={styles.tab01(quesLen == el.length)}>
                                                <Text style={styles.tabText01(quesLen == el.length)}>
                                                    {el.name}
                                                </Text>
                                            </TouchableOpacity>
                                        )
                                    }
                                })}
                            </View>
                        </View>
                    }
                    {type == 'mock-test' &&
                        <View style={[styles.row, styles.row0]}>
                            <View style={styles.textView0}>
                                <Text style={styles.heading0}>
                                    Auto Skip
                                </Text>
                                <Text style={styles.time}>
                                    Enables automatic skipping to the next question upon anwering
                                </Text>
                            </View>
                            <ToggleSwitch
                                isOn={toggles["autoSkip"]}
                                onColor="green"
                                offColor={theme.lightBorderGrey}
                                size="medium"
                                onToggle={isOn => setToggles({ ...toggles, autoSkip: isOn })}
                            />
                        </View>
                    }
                    <View style={[styles.row, styles.row0]}>
                        <View style={styles.textView0}>
                            <Text style={styles.heading0}>
                                New Questions
                            </Text>
                            <Text style={styles.time}>
                                Show more questions you haven't seen before
                            </Text>
                        </View>
                        <ToggleSwitch
                            isOn={toggles["newQuestion"]}
                            onColor="green"
                            offColor={theme.lightBorderGrey}
                            size="medium"
                            onToggle={isOn => setToggles({ ...toggles, newQuestion: isOn })}
                        />
                    </View>
                    <View style={[styles.row, styles.row0]}>
                        <View style={styles.textView0}>
                            <Text style={styles.heading0}>
                                Incorrect Answers
                            </Text>
                            <Text style={styles.time}>
                                Show more question you've previously answered incorrectly
                            </Text>
                        </View>
                        <ToggleSwitch
                            isOn={toggles["incorrectQuestion"]}
                            onColor="green"
                            offColor={theme.lightBorderGrey}
                            size="medium"
                            onToggle={isOn => setToggles({ ...toggles, incorrectQuestion: isOn })}
                        />
                    </View>
                    {type !== 'mock-test' &&
                        <View style={[styles.row, styles.row0]}>
                            <View style={styles.textView0}>
                                <Text style={styles.heading0}>
                                    Show Answers
                                </Text>
                                <Text style={styles.time}>
                                    Display correct answers after you've answered a question
                                </Text>
                            </View>
                            <ToggleSwitch
                                isOn={toggles["showAnswer"]}
                                onColor="green"
                                offColor={theme.lightBorderGrey}
                                size="medium"
                                onToggle={isOn => setToggles({ ...toggles, showAnswer: true })}
                            />
                        </View>
                    }
                    {type == 'mock-test' &&
                        <View style={styles.textView}>
                            <Text style={styles.text}>
                                You will have 57 minutes to anwser 50 questions. You need to correctly anwser 43 or more in order to achieve a pass
                            </Text>
                        </View>
                    }
                    <View style={styles.seperator} />
                </View>
            </BottomSheetScrollView>
            <Button title={"Continue"} onPress={() => onContinue(toggles, quesLen)} />
        </View>
    )
}

export default TheoryTestBottomSheet

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: theme.bg,
        borderRadius: 15
    },
    headingView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,

    },
    hidden: {
        fontFamily: Fonts.bold,
        fontSize: 20,
        color: theme.textBlack,
        opacity: 0
    },
    heading: {
        flex: 1,
        fontFamily: Fonts.bold,
        fontSize: 20,
        textAlign: 'center',
        color: theme.textBlack,
    },
    paraView: {
        alignItems: 'flex-end'
    },
    para: {

        fontFamily: Fonts.medium,
        fontSize: 14,
        color: theme.darkGrey
    },
    upper: {
        flex: 1,
    },
    seperator: {
        height: 10
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText: {
        fontFamily: Fonts.medium,
        fontSize: 14,
        color: theme.textGray,
        marginLeft: 10
    },

    icon: {
        height: 24,
        width: 24
    },
    circleView: {
        alignItems: 'center'
    },
    fillText: {
        fontFamily: Fonts.medium,
        fontSize: 14,
        color: theme.black
    },
    descriptionView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 20
    },
    imgView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    svgStyle: {
        height: 50,
        width: 50
    },
    time: {
        fontFamily: Fonts.medium,
        fontSize: 12,
        color: theme.lightGrey,
        marginTop: 5
    },
    textView: {
        marginTop: 20
    },
    text: {
        fontFamily: Fonts.medium,
        fontSize: 14,
        color: theme.lightGrey,
        textAlign: 'center'
    },
    tabView: {
        marginTop: 20
    },
    tabView01: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    heading0: {
        fontFamily: Fonts.medium,
        fontSize: 18,
        color: theme.black
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
    },
    row0: {
        marginTop: 20
    },
    tab: (is) => ({
        width: '48%',
        borderWidth: is ? 1.5 : 1,
        borderColor: is ? theme.skyBlue : theme.lightBorderGrey,
        paddingHorizontal: 40,
        paddingVertical: 10,
        borderRadius: 8
    }),
    tabText: (is) => ({
        fontFamily: Fonts.medium,
        fontSize: 14,
        color: is ? theme.skyBlue : theme.lightGrey,
        textAlign: 'center'
    }),
    tab01: (is) => ({
        width: '23%',
        borderWidth: is ? 0 : 1,
        borderColor: is ? 'transparent' : theme.skyBlue,
        backgroundColor: is ? theme.skyBlue : 'transparent',
        paddingVertical: 10,
        borderRadius: 8
    }),
    tabText01: (is) => ({
        fontFamily: Fonts.medium,
        fontSize: 14,
        color: is ? theme.white : theme.skyBlue,
        textAlign: 'center'
    }),
    textView0: {
        flex: 1,
        marginRight: 20
    },
    col: {
        marginTop: 20,
    },
    heading01: {
        fontFamily: Fonts.medium,
        fontSize: 18,
        color: theme.black
    }
})