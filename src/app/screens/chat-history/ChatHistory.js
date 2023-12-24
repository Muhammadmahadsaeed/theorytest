import React, { useState } from 'react';
import {
    View,
    FlatList,
    StyleSheet
} from 'react-native';
import WrapperContainer from '../../components/Wrapper/WrapperContainer';
import ChatHeader from '../../components/Headers/ChatHeader';
import SearchInput from '../../components/SearchBar/SearchInput';
import ChatHistoryList from './ChatHistoryList';
import withAuth from '../../utils/withAuth';

const ChatHistory = ({ navigation }) => {

    const goToChat = () => {
        navigation.navigate('chat-screen')
    }

    return (
        <WrapperContainer>
            <ChatHeader text={"Chat"} />
            <View style={styles.innerContainer}>
                <SearchInput />
                <FlatList
                    data={[...Array(10).keys()]}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <ChatHistoryList data={item} goToChat={goToChat} />}
                />
            </View>
        </WrapperContainer>
    )
}

export default withAuth(ChatHistory)

const styles = StyleSheet.create({
    innerContainer: {
        flex: 1
    }
})