import React, { useState, useRef, useCallback, useMemo } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import HeaderWithBackButton from '../../components/Headers/HeaderWithBackButton';
import WrapperContainer1 from '../../components/Wrapper/WrapperContainer1';
import { theme } from '../../utils/colors';
import { Fonts } from '../../utils/fonts';
import { ClockWatchIcon, QuestionIcon, ReviewIcon, SearchFileIcon } from '../../utils/images';
import TheoryTestBottomSheet from '../../components/BottomSheet/TheoryTestBottomSheet';
import TheoryTestList from './TheoryTestList';

const TheoryTestScreen = ({ navigation }) => {

    const bottomSheetRef = useRef(null);

    const [list, setList] = useState([
        {
            id: 1,
            name: 'Mock Test',
            description: 'Challenge yourself with a practice test',
            icon: <ClockWatchIcon />,

        },
        {
            id: 2,
            name: "Practive Revision Question",
            description: 'Review questions sorted by topics',
            icon: <ReviewIcon />,
            link: 'all-mock-test-topics'
        },
        {
            id: 3,
            name: "My Questions",
            description: 'Find your questions',
            icon: <QuestionIcon />
        },
        {
            id: 3,
            name: "Search Questions",
            description: 'Search a questions',
            icon: <SearchFileIcon />
        }
    ])
    const [selectedItem, setSelectedItem] = useState({})

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
        if (el.link) {
            navigation.navigate(el.link)
            return
        }
        setSelectedItem(el)
        handleSnapPress(0)
    }

    const onContinue = (data) => {
        bottomSheetRef.current?.close();
        navigation.replace('question', { config: data })
    }

    return (
        <WrapperContainer1>
            <HeaderWithBackButton text={"Theory Test"} />
            <View style={styles.innerContainer}>
                {list.map((el, index) => (
                    <TheoryTestList key={index} data={el} onClick={onClick} />
                ))}
            </View>
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
                    type={'mock-test'} />
            </BottomSheet>
        </WrapperContainer1>
    )
}

export default TheoryTestScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
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
        marginLeft: 20
    },
    imgView: {
        height: 45,
        width: 45,
        backgroundColor: theme.white
    },
    text: {
        fontFamily: Fonts.bold,
        fontSize: 18,
        color: theme.skyBlue
    },
    description: {
        fontFamily: Fonts.medium,
        fontSize: 12,
        color: theme.grayShade1
    },
    icon: {
        height: 35,
        width: 35
    }
})