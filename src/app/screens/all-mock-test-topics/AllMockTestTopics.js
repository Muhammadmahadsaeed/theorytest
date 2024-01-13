import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    ScrollView
} from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import WrapperContainer1 from '../../components/Wrapper/WrapperContainer1';
import HeaderWithBackButton from '../../components/Headers/HeaderWithBackButton';
import { theme } from '../../utils/colors';
import { Fonts } from '../../utils/fonts';
import AllMockTestTopicList from './AllMockTestTopicsList';
import TheoryTestBottomSheet from '../../components/BottomSheet/TheoryTestBottomSheet';
import questionArray from '../../services/section.json'
import groupArray from '../../services/groups.json'

const AllMockTestTopic = ({ navigation }) => {

    const [list, setList] = useState([])
    const [selectedItem, setSelectedItem] = useState({})

    const bottomSheetRef = useRef(null);

    useEffect(() => {
        formatQuestions()
    }, [])

    const findNameByTags = (item) => {
        const category = groupArray.find(category => item.some(tag => category.tags.includes(tag)))
        return category ? category.name : null;
    }


    const formatQuestions = () => {
        const mergedQuestions = [];

        questionArray.forEach(item => {
            const categoryName = findNameByTags(item.tags);
            const categoryIndex = mergedQuestions.findIndex(category => category.name == categoryName);

            if (categoryIndex === -1) {
                mergedQuestions.push({ name: categoryName, questions: [item] });
            } else {
                mergedQuestions[categoryIndex].questions.push(item);
            }
        });
        setList(mergedQuestions);
    }

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
        handleSnapPress(0)
    }

    const onContinue = (config, questLeng) => {
        bottomSheetRef.current?.close();
        let questions =
            questLeng == 'all' ?
                selectedItem :
                { ...selectedItem, questions: selectedItem?.questions?.slice(0, questLeng) }
    
        navigation.replace('revision-question-by-topic', {
            result: questions,
            config
        })
    }

    return (
        <WrapperContainer1>
            <HeaderWithBackButton text={"Select Categories to Practise"} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.innerContainer}>
                    {list.map((el, index) => (
                        <AllMockTestTopicList key={index} data={el} onClick={onClick} />
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

export default AllMockTestTopic

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