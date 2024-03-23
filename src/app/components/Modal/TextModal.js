import React, { useImperativeHandle, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Modal,
    useWindowDimensions,
    ScrollView
} from 'react-native';
import { theme } from '../../utils/colors';
import { Fonts } from '../../utils/fonts';

const TextModal = React.forwardRef((props, ref) => {

    const { width } = useWindowDimensions();

    const [isVisible, setIsVisible] = useState(false)
    const [description, setDescription] = useState({})

    const { currentQuestion = [] } = props

    useImperativeHandle(ref, () => ({
        isOpen(data) {
            setDescription(data)
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
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.descriptionView}>
                            <Text style={styles.description}>
                                {currentQuestion?.explanation?.text}
                            </Text>
                        </View>
                    </ScrollView>
                    <View style={styles.footer}>
                        <TouchableOpacity
                            style={styles.btn1}
                            activeOpacity={0.8}
                            onPress={() => setIsVisible(false)}>
                            <Text style={styles.btn1Text}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
})

export default TextModal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,.5)'
    },
    main: {
        // flex: 1,
        maxHeight: '50%',
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
    
    descriptionView: {
        margin: 20
    },
    description: {
        fontFamily: Fonts.medium,
        fontSize: 16,
        color: theme.black
    },
   
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 15,
        marginTop: 30
    },
    btn1: {
        borderWidth: 1,
        borderColor: theme.skyBlue,
        height: 50,
        width: '100%',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn1Text: {
        color: theme.skyBlue,
        fontSize: 16,
        fontFamily: Fonts.medium
    },
})