import React, { useState, useRef, useCallback, useMemo } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import HeaderWithBackButton from '../../components/Headers/HeaderWithBackButton';
import WrapperContainer1 from '../../components/Wrapper/WrapperContainer1';
import { theme } from '../../utils/colors';
import { Fonts } from '../../utils/fonts';
import { ClockWatchIcon, QuestionIcon, ReviewIcon, SearchFileIcon } from '../../utils/images';
import TheoryTestBottomSheet from '../../components/BottomSheet/TheoryTestBottomSheet';

const TheoryTestScreen = ({ }) => {

    const bottomSheetRef = useRef(null);

    const [list, setList] = useState([
        {
            id: 1,
            name: 'Mock Test',
            description: 'Challenge yourself with a practice test',
            icon: <ClockWatchIcon />
        },
        {
            id: 2,
            name: "Practive Revision Question",
            description: 'Review questions sorted by topics',
            icon: <ReviewIcon />
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

    const snapPoints = useMemo(() => ['55%'], []);

    // callbacks
    const handleSheetChanges = useCallback((index) => {
        // console.log('handleSheetChanges', index);
    }, []);


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

    return (
        <WrapperContainer1>
            <HeaderWithBackButton text={"Theory Test"} />
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
                            <Text style={styles.description}>
                                {el.description}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
            <BottomSheet
                ref={bottomSheetRef}
                index={-1}
                backdropComponent={renderBackdrop}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}>
                <TheoryTestBottomSheet selectedItem={selectedItem} />
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
        borderWidth: 2,
        borderColor: theme.skyBlue,
        marginBottom: 15,
        borderRadius: 8,
        padding: 10
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
        fontSize: 16,
        color: theme.skyBlue
    },
    description: {
        fontFamily: Fonts.medium,
        fontSize: 12,
        color: theme.grayShade1
    }
})