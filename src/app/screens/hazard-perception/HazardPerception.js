import React, { useState, useRef, useCallback, useMemo } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    ScrollView
} from 'react-native';
import WrapperContainer1 from '../../components/Wrapper/WrapperContainer1';
import HeaderWithBackButton from '../../components/Headers/HeaderWithBackButton';
import { ForwardEnIcon, VideoIcon, VideoPlayerIcon } from '../../utils/images';
import { Fonts } from '../../utils/fonts';
import { theme } from '../../utils/colors';
import VideoModal from '../../components/Modal/VideoModal';

const HazardPerception = ({ navigation }) => {

    const videoModalRef = useRef()

    const [list, setList] = useState([
        {
            id: 1,
            name: "Start Test",
            short_name: "mock_test",
            description: "Take a mock test to how you score",
            icon: <VideoIcon />
        },
        {
            id: 1,
            name: "Review All Clips",
            description: "Review all the clips and see your score",
            short_name: 'review_clips',
            icon: <VideoIcon />,
            link: "review-clips"
        },
        {
            id: 1,
            name: "View Instructions",
            description: "View instructions on how to take the test",
            icon: <VideoPlayerIcon />
        }
    ])

    const onClick = (item) => {
        if(item.short_name == 'mock_test'){
            videoModalRef.current.isOpen()
        }else{
            navigation.navigate(item.link)
        }
    }

    return (
        <WrapperContainer1>
            <HeaderWithBackButton text={"Hazard Perception"} />
            <View style={styles.innerContainer}>
                {list.map((el, index) => (
                    <TouchableOpacity
                        style={[styles.row, { ...el?.css }]}
                        key={index}
                        activeOpacity={0.95}
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
                        <View style={styles.icon}>
                            <ForwardEnIcon />
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
            <VideoModal ref={videoModalRef} />
        </WrapperContainer1>
    )
}

export default HazardPerception

const styles = StyleSheet.create({
    innerContainer: {
        flex: 1,
        paddingHorizontal: 15,
        marginTop: 30
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