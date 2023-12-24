import React, { useState, useCallback, useRef } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    Dimensions
} from 'react-native';
import SliderList from './SliderList';
import { Care01Icon, Care02Icon, Care03Icon, Care04Icon } from '../../utils/images';
import Pagination from '../../components/Pagination/Pagination';
import Button from '../../components/Buttons/Button';
import WrapperContainer1 from '../../components/Wrapper/WrapperContainer1';
import { useDispatch } from 'react-redux';

const { width, height } = Dimensions.get('window')

const GettingStartedScreen = ({ navigation }) => {


    const [slider, setSlider] = useState([
        {
            id: 1,
            image: <Care01Icon svgStyle={{
                width: width * 0.9,
                height: height * 0.6,
            }} />,
            title: 'Trained Caregivers',
            description: 'Connecting you with expert caregivers, tailored to your needs.'
        },
        {
            id: 1,
            image: <Care02Icon svgStyle={{
                width: width * 0.9,
                height: height * 0.6,
            }} />,
            title: 'Discover Seamless Care',
            description: 'Reliable, high-quality care services  because you deserve the best.'
        },
        {
            id: 1,
            image: <Care03Icon svgStyle={{
                width: width * 0.9,
                height: height * 0.6,
            }} />,
            title: 'Experience the Difference',
            description: 'Manage bookings, make payments, and communicate – all from one place.'
        },
        {
            id: 1,
            image: <Care04Icon svgStyle={{
                width: width * 0.9,
                height: height * 0.6,
            }} />,
            title: 'Let Us Serve You Better',
            description: "To connect you with the best local caregivers, '800 Caregiver' needs your location."
        }
    ])
    const [index, setIndex] = useState(0);

    const indexRef = useRef(index);

    const dispatch = useDispatch()

    const mapDispatchToProps = (value) => {
        dispatch({ type: 'update_redux', payload: value });
    };

    const onScroll = useCallback((event) => {
        const slideSize = event.nativeEvent.layoutMeasurement.width;
        const index = event.nativeEvent.contentOffset.x / slideSize;
        const roundIndex = Math.round(index);

        const distance = Math.abs(roundIndex - index);

        const isNoMansLand = 0.4 < distance;

        if (roundIndex !== indexRef.current && !isNoMansLand) {
            setIndex(roundIndex);
        }
    }, []);

    const onGettingStart = () => {
        mapDispatchToProps({isAppIntro: true})
        navigation.replace('bottom-tab')
    }



    return (
        <WrapperContainer1>
            <View style={styles.innerContaner}>
                <FlatList
                    data={slider}
                    horizontal
                    style={{ flex: 0.7 }}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    onScroll={onScroll}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <SliderList data={item} />}
                />
                <View style={styles.footer}>
                    <View style={styles.paginationWrapper}>
                        <Pagination index={index} slides={slider} />
                    </View>
                    <Button title={"Get Started!"} onPress={() => onGettingStart()} />

                </View>
            </View>
        </WrapperContainer1>
    )
}

export default GettingStartedScreen

const styles = StyleSheet.create({

    innerContaner: {
        flex: 1,
    },
    svgStyle: {
        height: height * 0.8,
        width: width * 0.1,
    },
    footer: {
        paddingHorizontal: 15,
        flex: 0.3,
        width: '100%',
        justifyContent: 'center',
    },
    paginationWrapper: {
        marginBottom: 20
    },
    seperator: {
        height: 10
    }
})