import React, { useState, useRef, useCallback, useMemo } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    FlatList
} from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import WrapperContainer1 from '../../components/Wrapper/WrapperContainer1';
import HeaderWithBackButton from '../../components/Headers/HeaderWithBackButton';
import data from '../../services/video.json'
import ClipList from './ClipList';

const ReviewAllClips = ({ navigation }) => {

    const [videos, setVideos] = useState(data)
    const [currentVideo, setCurrentVideo] = useState(videos[0].videoUrl)

    const player = useRef()

    const onChangeVideo = (item) => {
        console.log(item);
        setCurrentVideo(item.videoUrl)
        player.current.loadAsync({ uri: item.videoUrl }, {}, false);
    }

    return (
        <WrapperContainer1>
            <HeaderWithBackButton text={"All Clips"} />
            <View style={styles.innerContainer}>
                <View style={styles.videoView}>
                    <Video
                        ref={player}
                        style={styles.backgroundVideo}
                        source={{
                            uri: currentVideo,
                        }}
                        useNativeControls={true}
                        resizeMode={ResizeMode.COVER}
                        shouldPlay
                        isMuted
                        isLooping={false}
                        // onLoad={() => setVideoLoading(false)}
                    // onPlaybackStatusUpdate={status => setStatus(() => status)}
                    />

                </View>
                <View style={styles.listView}>
                    <FlatList
                        data={videos}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => <ClipList data={item} onChangeVideo={onChangeVideo} />}
                    />
                </View>
            </View>
        </WrapperContainer1>
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
        backgroundColor: 'blue'
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    listView: {
        flex: 1,
        marginTop: 40
    }
})