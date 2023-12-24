import React, { useImperativeHandle, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Modal,
    FlatList
} from 'react-native';
import { theme } from '../../utils/colors';
import { Fonts } from '../../utils/fonts';
import { FBIcon, InstaIcon, MessengerIcon, TwitterIcon, WhatsappIcon } from '../../utils/images';
import ShareModalList from './ShareModalList';

const ShareModal = React.forwardRef((props, ref) => {

    const [isVisible, setIsVisible] = useState(false)
    const [socialList, setSocialList] = useState([{
        id: 1,
        name: 'Facebook',
        icon: <FBIcon />
    }, {
        id: 1,
        name: 'Twitter',
        icon: <TwitterIcon />
    }, {
        id: 1,
        name: 'Instagram',
        icon: <InstaIcon />
    }, {
        id: 1,
        name: 'Whatsapp',
        icon: <WhatsappIcon />
    }, {
        id: 1,
        name: 'Messenger',
        icon: <MessengerIcon />
    },])

    const { } = props

    useImperativeHandle(ref, () => ({
        isOpen() {
            setIsVisible(true)
        }
    }))

    return (
        <Modal
            visible={isVisible}
            transparent={true}
            onRequestClose={() => setIsVisible(false)}>
            <View style={styles.container}>
                <View style={styles.main}>
                    <View style={styles.headingView}>
                        <Text style={styles.heading}>
                            Share
                        </Text>
                    </View>

                    <FlatList
                        data={socialList}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => <ShareModalList data={item} />}
                    />
                    <View style={styles.footer}>
                        <TouchableOpacity
                            style={styles.btn1}
                            activeOpacity={0.8}
                            onPress={() => setIsVisible(false)}>
                            <Text style={styles.btn1Text}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.btn2}
                            activeOpacity={0.8}>
                            <Text style={styles.btn2Text}>
                                Confirm
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
})

export default ShareModal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,.5)'
    },
    main: {
        backgroundColor: theme.bg,
        borderRadius: 16,
        paddingVertical: 15,
        width: '90%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    headingView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    heading: {
        fontFamily: Fonts.bold,
        fontSize: 20,
        color: theme.text
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 15,
        marginTop: 30
    },
    btn1: {
        width: '48%',
        backgroundColor: theme.bg,
        borderColor: theme.borderPurple,
        borderWidth: 1,
        borderRadius: 16,
        justifyContent:'center',
        alignItems:'center',
        paddingVertical: 10
    },
    btn1Text: {
        color: theme.buttonBgDark,
        fontSize: 16,
        fontFamily: Fonts.medium
    },
    btn2: {
        width: '48%',
        backgroundColor: theme.buttonBg,
        borderRadius: 16,
        justifyContent:'center',
        alignItems:'center',
        paddingVertical: 10,
        marginLeft: 10
    },
    btn2Text: {
        color: theme.textWhite,
        fontSize: 16,
        fontFamily: Fonts.medium,
      
    }
})