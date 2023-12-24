import React, { useImperativeHandle, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Modal,
    Dimensions,
    ScrollView
} from 'react-native';
import { theme } from '../../utils/colors';
import { Fonts } from '../../utils/fonts';
import { imagegallery } from '../../utils/images';

const { width, height } = Dimensions.get('screen')

const CareGiverModal = React.forwardRef((props, ref) => {

    const [isVisible, setIsVisible] = useState(false)
    const [caregiver, setCaregiver] = useState({})

    const { } = props

    useImperativeHandle(ref, () => ({
        isOpen(data) {
            setCaregiver(data)
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
                        <View style={styles.headingView}>
                            <Text style={styles.heading}>
                                {caregiver?.name}
                            </Text>
                        </View>
                        <View style={styles.imgView}>
                            <Image source={caregiver?.image ? { uri: caregiver?.image } : imagegallery} style={styles.img} />
                        </View>
                        <View style={styles.descriptionView}>
                            <Text style={styles.description}>
                                {caregiver?.description || "Description here..."}
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

export default CareGiverModal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,.5)'
    },
    main: {
        // flex: 1,
        height: '60%',
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
    descriptionView: {
        margin: 20
    },
    description: {
        fontFamily: Fonts.medium,
        fontSize: 16,
        color: theme.textBlack
    },
    imgView: {
        height: 300,
        width: '90%',
        alignSelf: 'center',
    },
    img: {
        height: '100%',
        width: '100%'
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 15,
        marginTop: 30
    },
    btn1: {
        width: '100%',
        backgroundColor: theme.bg,
        borderColor: theme.borderPurple,
        borderWidth: 1,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    },
    btn1Text: {
        color: theme.buttonBgDark,
        fontSize: 16,
        fontFamily: Fonts.medium
    },
})