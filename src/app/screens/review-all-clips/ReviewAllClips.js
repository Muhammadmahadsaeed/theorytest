import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    FlatList
} from 'react-native';
import * as Progress from 'react-native-progress';
import Video from 'react-native-video';
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import WrapperContainer1 from '../../components/Wrapper/WrapperContainer1';
import HeaderWithBackButton from '../../components/Headers/HeaderWithBackButton';
import data from '../../services/video.json'
import ClipList from './ClipList';
import { theme } from '../../utils/colors';
import { Loading } from '../../components/Loading/Loading';
import VideoError from './VideoError';

const ReviewAllClips = ({ navigation, route }) => {

    const { toggle } = route?.params || {}

    const [videos, setVideos] = useState(data)
    const [currentVideo, setCurrentVideo] = useState(videos[0].videoUrl)
    const [autoPlay, setAutoPlay] = useState(toggle?.autoPlay || false)
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [loading, setLoading] = useState(true)
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isError, setIsError] = useState(false)

    const player = useRef()

    const onChangeVideo = (item, index) => {
        // setCurrentVideo(item.videoUrl)
        setCurrentIndex(index)
        // player.current.loadAsync({ uri: item.videoUrl }, {}, false);
    }

    const handlePlaybackProgress = (status) => {
            const currentProgress = status.currentTime / status.playableDuration;
        console.log(currentProgress);
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

    const singleTap = Gesture.Tap().onStart((event) => {
        console.log(event);
        // setShowControls(!showControls);
        // Simulate show/hide controls behavior here
    });

    // console.log(progress);
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <WrapperContainer1>
                <HeaderWithBackButton text={"All Clips"} />
                <View style={styles.innerContainer}>
                    <GestureDetector gesture={Gesture.Exclusive(singleTap)}>
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
                                onLoadStart={(e) => setLoading(true)}
                                onProgress={handlePlaybackProgress}
                            />
                            {loading &&
                                <View style={styles.overlay}>
                                    <Loading size={40} color={theme.white} />
                                </View>
                            }
                            {isError &&
                                <View style={styles.overlay}>
                                    <VideoError />
                                </View>
                            }
                        </View>
                    </GestureDetector>
                    <Progress.Bar
                        style={styles.progressView}
                        height={14}
                        progress={progress}
                        unfilledColor={theme.disableGray}
                        color={theme.skyBlue}
                        animationType="timing"
                        width={null} />
                    <View style={styles.listView}>
                        <FlatList
                            data={videos}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => <ClipList data={item} index={index} onChangeVideo={onChangeVideo} />}
                        />
                    </View>
                </View>
            </WrapperContainer1>
        </GestureHandlerRootView>
    )
}

export default ReviewAllClips

const styles = StyleSheet.create({
    innerContainer: {
        flex: 1
    },
    videoView: {
        height: '30%',
        width: '100%',
        zIndex: -100
    },
    overlay: {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        position: 'absolute',
        backgroundColor: 'rgb(0,0,0)',
        zIndex: 1000
    },
    progressView: {
        height: 14,
        borderRadius: 0
    },
    progressBar: {
        height: 5,
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
    }
})