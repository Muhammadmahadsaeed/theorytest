import React, { useState, useImperativeHandle } from 'react';
import { View, Image, Modal, TouchableOpacity, StyleSheet, Text } from "react-native";
import { theme } from '../../utils/colors';
import { CrossRoundIcon, imagegallery } from '../../utils/images';
import { Fonts } from '../../utils/fonts';


const ImageModal = React.forwardRef(({ navigation }, ref) => {

    const [isVisible, setIsVisible] = useState(false)
    const [imageUrl, setImageUrl] = useState(null)

    useImperativeHandle(ref, () => ({
        isOpen(url) {
            setImageUrl(url)
            setIsVisible(true)
        }
    }))

    const closeModal = () => {
        setIsVisible(false)
    }

    return (
        <Modal
            visible={isVisible}
            transparent={true}
            onRequestClose={() => setIsVisible(false)}
            style={styles.modal}>
            <View style={styles.container}>
                <View style={styles.main}>
                    <View style={styles.imgView}>
                        <Image
                            style={styles.img}
                            source={imageUrl ? { uri: imageUrl } : imagegallery} />
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.btn}
                        onPress={() => setIsVisible(false)}>
                        <Text style={styles.btnText}>
                            Close
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

        </Modal>
    )
})


export default ImageModal

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        backgroundColor: theme.white,
    },
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center'
    },
    main: {
        backgroundColor: theme.bg,
        width: '90%',
        padding: 20,
        alignSelf: 'center',
        borderRadius: 10,
    },
    imgView: {
        height: 300,
        width: '100%',
    },
    img: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain'
    },
    btn: {
        backgroundColor: theme.white,
        borderWidth: 1,
        borderColor: theme.skyBlue,
        height: 50,
        width: '100%',
        alignSelf: 'center',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15
    },
    btnText: {
        fontFamily: Fonts.regular,
        fontSize: 17,
        color: theme.skyBlue
    }
})