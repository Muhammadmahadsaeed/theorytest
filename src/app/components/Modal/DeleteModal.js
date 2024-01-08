import React, { useState, useImperativeHandle } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { Fonts } from '../../utils/fonts';
import Button from '../Buttons/Button';
import { theme } from '../../utils/colors';


const DeleteModal = React.forwardRef(({ navigation }, ref) => {

    const [isVisible, setIsVisible] = useState(false)
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()
    const { userData } = useSelector(state => state.userReducer)


    const mapDispatchToProps = (value) => {
        dispatch({ type: 'update_redux', payload: value });
    };

    useImperativeHandle(ref, () => ({
        isOpen() {
            setIsVisible(true)
        }
    }))

    const closeModal = () => {
        setIsVisible(false)
    }

    const deleteAccount = async () => {
       
    }

    return (
        <Modal
            visible={isVisible}
            transparent={true}
            onRequestClose={() => setIsVisible(false)}
            style={styles.modal}>
            <View style={styles.container}>
                <View style={styles.main}>
                    <Text style={styles.heading}>
                        Are you sure?
                    </Text>
                    <Text style={styles.para}>
                        After confirmation, all your account data will be permanently deleted and lost forever
                    </Text>
                    <Button
                        title={"Delete"}
                        loading={loading}
                        onPress={() => deleteAccount()} />
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.btn}
                        onPress={() => setIsVisible(false)}>
                        <Text style={styles.btnText}>
                            Cancel
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

        </Modal>
    )
})


export default DeleteModal

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
    heading: {
        fontFamily: Fonts.medium,
        fontSize: 22,
        color: theme.black,
        textAlign: 'center'
    },
    para: {
        fontFamily: Fonts.regular,
        fontSize: 16,
        color: theme.grayShade1,
        marginVertical: 25,
        textAlign: 'center'
    },
    btn: {
        backgroundColor: theme.white,
        borderWidth: 1,
        borderColor: theme.skyBlue,
        height: 60,
        width: '100%',
        alignSelf: 'center',
        borderRadius: 16,
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