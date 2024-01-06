import React, { useState, useRef, useCallback, useMemo } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    ScrollView
} from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import WrapperContainer1 from '../../components/Wrapper/WrapperContainer1';
import HeaderWithBackButton from '../../components/Headers/HeaderWithBackButton';
import { theme } from '../../utils/colors';
import { Fonts } from '../../utils/fonts';
import RevisionQuestionList from './RevisionQuestionList';
import TheoryTestBottomSheet from '../../components/BottomSheet/TheoryTestBottomSheet';

const RevisionQuestion = ({ navigation }) => {

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
    const [selectedItem, setSelectedItem] = useState({})

    const bottomSheetRef = useRef(null);

    const snapPoints = useMemo(() => ['95%'], []);

    const handleSnapPress = useCallback((index) => {
        bottomSheetRef.current?.snapToIndex(index);
    }, []);

    const handleClosePress = useCallback(() => {
        bottomSheetRef.current?.close();
    }, []);

    const renderBackdrop = useCallback(props => (
        <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            pressBehavior={"close"}
            enableTouchThrough
        />
    ), []);

    const onClick = (el) => {
        setSelectedItem(el)
        if (el.link) {
            navigation.navigate(el.link)
            return
        }
        handleSnapPress(0)
    }

    const onContinue = () => {
        bottomSheetRef.current?.close();
        // navigation.replace('question')
    }

    return (
        <WrapperContainer1>
            <HeaderWithBackButton text={"Select Categories to Practise"} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.innerContainer}>
                    {list.map((el, index) => (
                        <RevisionQuestionList key={index} data={el} onClick={onClick} />
                    ))}
                </View>
            </ScrollView>
            <BottomSheet
                ref={bottomSheetRef}
                index={-1}
                backdropComponent={renderBackdrop}
                snapPoints={snapPoints}>
                <TheoryTestBottomSheet
                    navigation={navigation}
                    selectedItem={selectedItem}
                    onCancel={handleClosePress}
                    onContinue={onContinue}
                    type={'revision'} />
            </BottomSheet>
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