import React, { useState, useRef } from 'react';
import {
    View,
    FlatList,
    StyleSheet
} from 'react-native';
import HeaderWithBackButton from '../../components/Headers/HeaderWithBackButton';
import Messages from './Messages';
import InputBox from './InputBox';
import WrapperContainer1 from '../../components/Wrapper/WrapperContainer1';

const ChatScreen = ({ }) => {


    const [getData, setData] = useState([{
        senderId: 1,
        message: "I want to know something about the services?",
        timestamp: ""
    }, {
        receiverId: 2,
        message: "Certainly! How Can we Help You Today? Certainly! How Can we Help You Today?",
        timestamp: ""
    }, {
        senderId: 1,
        message: "Hello",
        timestamp: ""
    },
    {
        senderId: 1,
        message: "I want to know something about the services?",
        timestamp: ""
    }, {
        receiverId: 2,
        message: "Certainly! How Can we Help You Today? Certainly! How Can we Help You Today?",
        timestamp: ""
    }, 
    ])

    const InputBoxRef = useRef();
    const flatListRef = useRef(null)

    return (
        <WrapperContainer1>
            <HeaderWithBackButton rightIcon={"info"} text={"Question"} />
            <View style={styles.innerContainer}>
                <FlatList
                    ref={flatListRef}
                    style={{ flex: 1 }}
                    showsVerticalScrollIndicator={false}
                    data={getData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <Messages
                            key={index}
                            myId={1}
                            message={item}
                        />
                    )}
                />
                <InputBox ref={InputBoxRef} />
            </View>

        </WrapperContainer1>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    innerContainer: {
        flex: 1,
        marginHorizontal: 15
    }
})