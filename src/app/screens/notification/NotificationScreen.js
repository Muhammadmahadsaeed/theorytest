import React, { useState } from 'react';
import {
    View,
    FlatList,
    StyleSheet
} from 'react-native';
import WrapperContainer from '../../components/Wrapper/WrapperContainer';
import HeaderWithBackButton from '../../components/Headers/HeaderWithBackButton';
import NotificationList from './NotificationList';

const NotificationScreen = ({ navigation }) => {
    return (
        <WrapperContainer>
            <HeaderWithBackButton text={"Notification"} />
            <View style={styles.innerContainer}>
                <FlatList
                    data={[...Array(10).keys()]}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <NotificationList data={item} />}
                />
            </View>
        </WrapperContainer>
    )
}

export default NotificationScreen

const styles = StyleSheet.create({
    innerContainer: {
        flex: 1,
    }
})