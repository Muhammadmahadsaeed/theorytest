import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { theme, } from '../../utils/colors';
import RadioButton from '../RadioButton/RadioButton';
import Button from '../Buttons/Button';
import { Fonts } from '../../utils/fonts';
import { PlusCircleIcon } from '../../utils/images';
import { isObjEmpty } from '../../helper/helper';

const PaymentBottomSheetComponent = ({ modalData, onRadioBtnClick, onCancel, onNext, selectedPayment }) => {

    return (
        <View style={styles.container}>
            <View style={styles.headingView}>
                <Text />
                <Text style={styles.heading}>
                    Select Payment Method
                </Text>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={onCancel}>
                    <Text style={styles.para}>
                        Cancel
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.upper}>
                <BottomSheetFlatList
                    data={modalData}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) =>
                        <RadioButton
                            name={item.name}
                            onPress={() => onRadioBtnClick(item)}
                            isIcon={true}
                            selected={item.selected}
                            icon={item.icon} />}
                />
                <View style={styles.seperator} />
                <Button
                    title={"Next"}
                    selected={isObjEmpty(selectedPayment) ? true : false}
                    disable={isObjEmpty(selectedPayment) ? true : false}
                    onPress={onNext} />
            </View>
        </View>
    )
}

export default PaymentBottomSheetComponent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: theme.bg,
        borderRadius: 15
    },
    headingView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
    heading: {
        fontFamily: Fonts.bold,
        fontSize: 20,
        color: theme.textBlack
    },
    para: {
        fontFamily: Fonts.medium,
        fontSize: 14,
        color: theme.textGray
    },
    upper: {
        flex: 1,
    },
    seperator: {
        height: 10
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText: {
        fontFamily: Fonts.medium,
        fontSize: 14,
        color: theme.textGray,
        marginLeft: 10
    },

    icon: {
        height: 24,
        width: 24
    }
})