import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    FlatList,
    Image
} from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import Video from 'react-native-video';
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import WrapperContainer1 from '../../components/Wrapper/WrapperContainer1';
import data from '../../services/video.json'
import { theme } from '../../utils/colors';
import { Loading } from '../../components/Loading/Loading';
import VideoError from '../../components/VideoError/VideoError';
import { CrossRoundIcon, red_flag } from '../../utils/images';
import AlertBottomSheetComponent from '../../components/BottomSheet/AlertBottomSheetComponent';

const HazardPractice = ({ navigation, route }) => {

    const { toggle } = route?.params || {}

    const [videos, setVideos] = useState(data)
    const [currentVideo, setCurrentVideo] = useState(videos[0])
    const [autoPlay, setAutoPlay] = useState(toggle?.autoPlay || false)
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [loading, setLoading] = useState(true)
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isError, setIsError] = useState(false)
    const [isBuffer, setIsBuffer] = useState(false)

    const player = useRef()
    const bottomSheetRef = useRef(null);

    const snapPoints = useMemo(() => ['42%'], []);

    const handleSheetChanges = useCallback((index) => {
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

    const handlePlaybackProgress = (status) => {
        const currentProgress = ((status.currentTime / status.seekableDuration) * 100);
        setProgress(currentProgress)
        // if (status.didJustFinish && autoPlay) {
        //     playNextVideo();
        // }
        // if (status.isLoaded) {
        //     console.log(status);
        //     setProgress(currentProgress);
        // }
        // if (!status.isLoaded) {
        //     setLoading(false)
        //     setIsError(true)
        // }
    };

    const playNextVideo = () => {
        if (currentIndex < videos.length - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }
    };

    const onVideoTap = (item) => {
        
        const updatedMarkers = [...videos]
        const currentMarker = item?.markers || []
        const updatedVideo = updatedMarkers.map((el) => {
            if (el.id == item.id) {
                return {
                    ...el,
                    markers: [...currentMarker, parseFloat(progress).toFixed(2)]
                }
            } else {
                return {...el}
            }
        })
        setCurrentVideo(updatedVideo[currentIndex])
        setVideos(updatedVideo)
    };

    useEffect(() => {
        console.log("click===", currentVideo);

    },[videos])


    const onClose = (index) => {
        bottomSheetRef.current?.snapToIndex(index);
    }

    const onConfirm = () => {
        handleClosePress()
        navigation.goBack()
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <WrapperContainer1>
                <View style={styles.header}>
                    <TouchableOpacity 
                    style={styles.btn}
                    activeOpacity={0.8}
                    onPress={() => onClose(0)}>
                        <CrossRoundIcon />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity 
                    activeOpacity={1}
                    style={styles.innerContainer}
                    onPress={() => onVideoTap(videos[currentIndex])}>
                        <View style={styles.videoView}>
                            <Video
                                ref={player}
                                style={styles.backgroundVideo}
                                source={{
                                    uri: videos[currentIndex].videoUrl,
                                }}
                                resizeMode='cover'
                                onError={() => setIsError(true)}
                                onReadyForDisplay={() => {
                                    setLoading(false)
                                    setIsError(false)
                                }}
                                onEnd={() => console.log("video end====")}
                                onBuffer={(e) => {
                                    console.log(e);
                                    setIsBuffer(e.isBuffering)}
                                }
                                onLoadStart={(e) => setLoading(true)}
                                onProgress={handlePlaybackProgress}
                            />
                            {loading &&
                                <View style={styles.overlay(false)}>
                                    <Loading size={40} color={theme.white} />
                                </View>
                            }
                             {!loading && isBuffer &&
                                <View style={styles.overlay(isBuffer)}>
                                    <Loading size={50} color={theme.red} />
                                </View>
                            }
                            {isError &&
                                <View style={styles.overlay}>
                                    <VideoError />
                                </View>
                            }
                        </View>
                </TouchableOpacity>
                <View style={styles.progressView}>
                    <View style={[styles.progressBar, { width: (progress + 1) + '%' }]} />
                    {currentVideo?.markers?.map((point, index) => (
                        <View key={index} style={[styles.marker(index), {left: point + '%'}]}>
                            <Image source={red_flag} style={styles.img} />
                        </View>
                    ))}
                </View>
                <BottomSheet
                ref={bottomSheetRef}
                index={-1}
                backdropComponent={renderBackdrop}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}>
                <AlertBottomSheetComponent
                    onCancel={handleClosePress}
                    onConfirm={onConfirm} />
            </BottomSheet>
            </WrapperContainer1>
        </GestureHandlerRootView>
    )
}

export default HazardPractice

const styles = StyleSheet.create({
    header: {
        height: 65,
        backgroundColor: 'rgba(1, 1, 1, 0.7)',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingHorizontal: 15
    },
    btn: {
        backgroundColor: theme.white,
        borderRadius: 100,
        width: 40,
        height: 40,
        padding: 6,
        justifyContent: 'center',
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(1, 1, 1, 0.7)'
    },
    videoView: {
        height: '40%',
        width: '100%',
        zIndex: -100
    },
    overlay: (is) => ({
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        position: 'absolute',
        backgroundColor: is ? 'rgba(0,0,0,0.4)' : 'rgb(0,0,0)',
        zIndex: 1000
    }),
    progressView: {
        // position: 'absolute',
        // bottom: 0,
        // zIndex: 100,
        height: 20,
        borderRadius: 0,
        backgroundColor: theme.borderGrey
    },
    progressBar: {
        height: 20,
        backgroundColor: theme.skyBlue
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: -100,
    },
    listView: {
        flex: 1,
        marginTop: 40
    },
    marker: (index) => ({
        position: 'absolute',
        zIndex: 1000,
        height: 30,
        width: 30,
        top: -30,
    }),
    img: {
        height: '100%',
        width: '100%'
    }
})