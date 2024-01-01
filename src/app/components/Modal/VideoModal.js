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
import ToggleSwitch from 'toggle-switch-react-native'
import { theme } from '../../utils/colors';
import { Fonts } from '../../utils/fonts';
import Button from '../Buttons/Button';

const VideoModal = React.forwardRef((props, ref) => {

    const [isVisible, setIsVisible] = useState(false)
    const [toggles, setToggles] = useState({ "showLowScore": false })

    const { } = props

    useImperativeHandle(ref, () => ({
        isOpen(data) {
            setIsVisible(true)
        }
    }))

    const onCancel = () => {
        setIsVisible(false)
    }


    return (
        <Modal
            visible={isVisible}
            transparent={true}
            onRequestClose={() => setIsVisible(false)}>
            <View style={styles.container}>
                <View style={styles.main}>
                    <View style={styles.descriptionView}>
                        <View style={styles.textView}>
                            <Text style={styles.heading}>
                                Show Low Score Clips
                            </Text>
                            <Text style={styles.text}>
                                If you turn this on, you will be shown more clips that you scored low
                            </Text>
                        </View>
                        <ToggleSwitch
                            isOn={toggles["autoSkip"]}
                            onColor="green"
                            offColor={theme.lightBorderGrey}
                            size="medium"
                            onToggle={isOn => setToggles({ showLowScore: isOn })}
                        />
                    </View>
                    <View style={styles.footer}>
                        <Button title={"Start Test"} />
                        <TouchableOpacity
                            style={styles.btn1}
                            activeOpacity={0.8}
                            onPress={() => onCancel(false)}>
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

export default VideoModal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,.5)'
    },
    main: {
        paddingHorizontal: 15,
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textView: {
        flex: 1
    },
    heading: {
        fontFamily: Fonts.bold,
        fontSize: 16,
        color: theme.black
    },

    text: {
        fontFamily: Fonts.medium,
        fontSize: 14,
        color: theme.lightBorderGrey
    },

    footer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',

        marginTop: 30
    },
    btn1: {
        width: '100%',
        backgroundColor: theme.bg,
        borderColor: theme.skyBlue,
        borderWidth: 1,
        height: 50,
        borderRadius: 8,
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