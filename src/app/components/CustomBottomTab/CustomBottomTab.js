import React, { useState } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { HomeWhiteIcon, HomeBlackIcon, AppointmentActiveIcon, AppointmentDeactiveIcon, ChatDeactiveIcon, ChatActiveIcon, UserDeactiveIcon, UsertActiveIcon } from '../../utils/images';
import { theme } from '../../utils/colors';
import { Fonts } from '../../utils/fonts';

let icon = {
    height: 25,
    width: 25
}

const CustomBottomTab = ({ state, descriptors, navigation }) => {

    const getTabBarIcon = (name, focused) => {
        let routeName = name.toLowerCase()
        if (routeName == 'home') return focused ? <HomeWhiteIcon svgStyle={icon} /> : <HomeBlackIcon svgStyle={icon} />
        else if (routeName == 'schedule') return focused ? <AppointmentActiveIcon svgStyle={icon} /> : <AppointmentDeactiveIcon svgStyle={icon} />
        else if (routeName == 'chat') return focused ? <ChatActiveIcon svgStyle={icon} /> : <ChatDeactiveIcon svgStyle={icon} />
        else return focused ? <UsertActiveIcon svgStyle={icon} /> : <UserDeactiveIcon svgStyle={icon} />
    }

    const focusedOptions = descriptors[state.routes[state.index].key].options;
    if (focusedOptions?.tabBarStyle?.display === "none") {
        return null;
    }

    return (
        <View style={styles.bottom_nav}>
            {state.routes.map((route, index) => {
                const isFocused = state.index === index;
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;
                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate({ name: route.name, merge: true });
                    }
                };

                return (
                    <TouchableOpacity
                        key={index}
                        activeOpacity={0.95}
                        onPress={onPress}
                        style={styles.btn(isFocused)}>
                        <View style={[styles.icon]}>
                            {getTabBarIcon(route.name, isFocused)}
                        </View>
                        {isFocused ?
                            <Text style={styles.btnText(isFocused)}>
                                {label}
                            </Text>
                            :
                            null
                        }
                    </TouchableOpacity>
                );
            })}
        </View>

    )
}

export default CustomBottomTab

const styles = ({
    bottom_nav: {
        height: 72,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: theme.bg,
        width: '95%',
        alignSelf: 'center',
        position: 'absolute',
        bottom: 0,
        borderRadius: 16,
        marginVertical: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,

    },
    btn_tab: {
    },
    btn: (tab) => ({
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderRadius: 10,
        paddingVertical: 5,
        backgroundColor: tab ? theme.buttonBg : theme.bg
    }),
    icon: {
        height: 25,
        width: 25,
    },
    btnText: (tab) => ({
        fontSize: 16,
        color: theme.textWhite,
        fontFamily: Fonts.medium,
        marginLeft: 5
    })

})

