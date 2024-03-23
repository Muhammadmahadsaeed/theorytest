import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native'
import { theme } from '../../utils/colors';
import { AvatarIcon, SearchColorFullIcon } from '../../utils/images';
import { Fonts } from '../../utils/fonts';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const HomeHeader = ({ }) => {

    const navigation = useNavigation()
    const { currentLocation } = useSelector(state => state.userReducer);

    const goToLocation = () => {
        navigation.navigate('location', {
            route: 'home'
        })
    }

    const goToSearch = () => {
        navigation.navigate('search')
    }

    return (
        <View style={styles.headerTop}>
            <TouchableOpacity
                activeOpacity={0.95}
                style={styles.menuBtn}
                onPress={() => navigation.navigate('Profile')}>
                <AvatarIcon svgStyle={styles.menuIcon} />
            </TouchableOpacity>
         
            <View style={styles.right}>
                {/* <TouchableOpacity
                    style={styles.bellIcon}
                    activeOpacity={0.95}
                    onPress={() => navigation.navigate('notification')}>
                    <AlarmIcon />
                </TouchableOpacity> */}
                <TouchableOpacity
                    style={styles.searchIcon}
                    activeOpacity={0.8}
                    onPress={() => goToSearch()}>
                    <SearchColorFullIcon />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default HomeHeader

const styles = ({
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60,
        paddingHorizontal: 15,
        backgroundColor: theme.bg
    },
    menuBtn: {
        height: 55,
        width: 55,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    menuIcon: {
        height: 40,
        width: 40
    },
    centerView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.buttonBg,
        padding: 5,
        borderRadius: 10
    },
    locationDes: {
        fontSize: 14,
        fontFamily: Fonts.medium,
        color: theme.textWhite,
        marginHorizontal: 3
    },
    markerIcon: {
        height: 22,
        width: 20,
    },
    arrowIcon: {
        height: 20,
        width: 20,
    },
    right: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bellIcon: {
        height: 40,
        width: 40,
        marginRight: 15
    },
    searchIcon: {
        height: 40,
        width: 40
    }
})