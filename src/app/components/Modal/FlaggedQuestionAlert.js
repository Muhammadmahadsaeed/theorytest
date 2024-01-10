import React, { useImperativeHandle, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Image,
} from 'react-native';
import { theme } from '../../utils/colors';
import { Fonts } from '../../utils/fonts';
import Button from '../Buttons/Button';
import { info } from '../../utils/images';

const FlaggedQuestionAlertModal = React.forwardRef((props, ref) => {

    const [isVisible, setIsVisible] = useState(false)

    const { onYessPress, onNoPress, flaggedQuestion = [] } = props

    useImperativeHandle(ref, () => ({
        isOpen() {
            setIsVisible(true)
        },
        isClose() {
            setIsVisible(false)
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
                        <View style={styles.imgView}>
                            <Image source={info} style={styles.img} />
                        </View>
                        <Text style={styles.heading}>
                            You flagged {flaggedQuestion.length} questions.
                        </Text>
                        <Text style={styles.description}>
                            Do you want to review them?
                        </Text>
                    </View>
                    <View style={styles.footer}>
                        <Button title={"Yes"} onPress={onYessPress} />
                        <TouchableOpacity
                            style={styles.btn1}
                            activeOpacity={0.8}
                            onPress={onNoPress}>
                            <Text style={styles.btn1Text}>
                                No
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
})

export default FlaggedQuestionAlertModal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,.5)'
    },
    main: {
        // flex: 1,
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
    description: {
        fontFamily: Fonts.medium,
        fontSize: 16,
        color: theme.textBlack
    },
    imgView: {
        height: 100,
        width: 100,
        alignSelf: 'center',
    },
    img: {
        height: '100%',
        width: '100%'
    },
    footer: {
        marginHorizontal: 15,
        marginTop: 30
    },
    btn1: {
        height: 50,
        width: '100%',
        borderRadius: 8,
        backgroundColor: theme.bg,
        borderColor: theme.skyBlue,
        borderWidth: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15
    },
    btn1Text: {
        color: theme.skyBlue,
        fontSize: 16,
        fontFamily: Fonts.medium
    },
})