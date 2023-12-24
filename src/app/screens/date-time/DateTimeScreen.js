import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Platform,
    Dimensions
} from 'react-native';
import moment from 'moment';
import WheelPickerExpo from 'react-native-wheel-picker-expo';
import { Calendar } from 'react-native-calendars';
import WrapperContainer1 from '../../components/Wrapper/WrapperContainer1';
import HeaderWithBackButton from '../../components/Headers/HeaderWithBackButton';
import { Fonts } from '../../utils/fonts';
import { theme } from '../../utils/colors';
import { generateTimeSlots } from '../../helper/helper';
import { showFlashMessage } from '../../utils/Toast';

const today = moment().format("YYYY-MM-DD");
const { width, height } = Dimensions.get('screen')

const DateTimeScreen = ({ navigation, route }) => {

    let { params } = route || {}
    const scrollViewRef = useRef();
    const headingRef = useRef();

    const [selectedDate, setSelectedDate] = useState(new Date())
    const [isDate, setIsDate] = useState(false)
    const [selectedHourItem, setSelectedHourItem] = useState(2);
    const [hoursList, setHoursList] = useState(Array.from({ length: 10 }, (_, i) => i + 1));
    const [timeSlotList, setTimeSlotList] = useState(generateTimeSlots(params?.service_time))
    const [selectedTimeSlotItem, setSelectedTimeSlotItem] = useState('09:00 AM')
    const [calendarHeight, setCalendarHeight] = useState(0);

    const handleDateSelect = (day) => {
        setSelectedDate(day.dateString);
        setIsDate(true)
    }

    const scrollToHeading = useCallback(() => {
        if (scrollViewRef.current && headingRef.current) {
            scrollViewRef.current.measure((scrollX, scrollY, scrollWidth, scrollHeight, scrollPageX, scrollPageY) => {
                headingRef.current.measure((x, y, width, height, pageX, pageY) => {
                    const yOffset = pageY - scrollPageY + calendarHeight;
                    scrollViewRef.current.scrollTo({ y: yOffset, animated: true });
                });
            });
        }
    }, []);


    useEffect(() => {
        if (isDate) {
            // Call the function to scroll to the heading when a date is selected
            scrollToHeading();
        }
    }, [isDate, scrollToHeading]);

    const onNext = () => {
        let hours = Number(selectedHourItem.split(' ')[0])
        let endTime = moment(selectedTimeSlotItem, 'h:mm a').add(hours, 'hours').format('h:mm a')
        navigation.navigate('appointment-detail', {
            ...params,
            date: String(moment(selectedDate).format("DD/MM/YYYY")),
            startTime: selectedTimeSlotItem,
            hours,
            endTime: endTime
        })
    }

    return (
        <WrapperContainer1>
            <HeaderWithBackButton text={"Pick A Time"} />
            <View style={styles.container}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled
                    ref={scrollViewRef}
                    contentContainerStyle={{ paddingBottom: 20 }}>
                    <Calendar
                        style={styles.calender}
                        onLayout={event => {
                            const { height } = event.nativeEvent.layout;
                            setCalendarHeight(height);
                        }}
                        theme={{
                            textMonthFontFamily: Fonts.medium,
                            textMonthFontSize: 12,
                            textDayFontFamily: Fonts.medium,
                            textDayStyle: {
                                color: theme.purple,
                                fontSize: 12,
                                fontFamily: Fonts.medium,
                                textAlignVertical: 'center'
                            },
                            textDayHeaderFontSize: 12,
                            textDayHeaderFontFamily: Fonts.medium,
                            selectedDayBackgroundColor: theme.lightGreen,
                            selectedDayTextColor: theme.textWhite
                        }}
                        minDate={today}
                        onDayPress={day => handleDateSelect(day)}
                        markedDates={{
                            [selectedDate]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' }
                        }}
                    />
                    {isDate &&
                        <View ref={headingRef}>
                            <View style={styles.hoursView}>
                                <View style={styles.textView0}>
                                    <Text style={styles.text0}>
                                        How many hours per day?
                                    </Text>
                                </View>
                                <View style={styles.pickerStyle}>
                                    <WheelPickerExpo
                                        height={180}
                                        width={width - 80}
                                        backgroundColor={theme.softGray}
                                        initialSelectedIndex={3}
                                        renderItem={(props) => (
                                            <Text style={styles.itemStyle(props.label == selectedHourItem)}>
                                                {props.label}
                                            </Text>
                                        )}
                                        items={hoursList.map(name => ({ label: `${name} HOUR`, value: name }))}
                                        onChange={({ item }) => setSelectedHourItem(item.label)} />
                                </View>
                            </View>
                            <View style={styles.hoursView}>
                                <View style={styles.textView0}>
                                    <Text style={styles.text0}>
                                        What time should we come?
                                    </Text>
                                </View>
                                <View style={styles.pickerStyle}>
                                    <WheelPickerExpo
                                        height={180}
                                        width={width - 80}
                                        backgroundColor={theme.softGray}
                                        initialSelectedIndex={timeSlotList.indexOf('09:00 AM')}
                                        renderItem={(props) => (
                                            <Text style={styles.itemStyle(props.label == selectedTimeSlotItem)}>
                                                {props.label}
                                            </Text>
                                        )}
                                        items={timeSlotList.map(name => ({ label: name, value: name }))}
                                        onChange={({ item }) => setSelectedTimeSlotItem(item.label)} />
                                </View>
                            </View>
                        </View>
                    }
                </ScrollView>
                <View style={styles.footer}>
                    <TouchableOpacity
                        disabled={isDate ? false : true}
                        style={styles.btn(isDate)}
                        activeOpacity={0.95}
                        onPress={() => onNext()}>
                        <Text style={styles.btnText}>
                            Next
                        </Text>

                    </TouchableOpacity>
                </View>
            </View>
        </WrapperContainer1>
    )
}

export default DateTimeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        backgroundColor: theme.bg
    },
    calender: {
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
        marginTop: 10,
        marginHorizontal: 15,
        paddingBottom: 10
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    hoursView: {
        marginTop: 10,
        marginHorizontal: 20
    },
    textView0: {
        marginTop: 25,
        marginBottom: 15
    },
    pickerStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 180,
        backgroundColor: theme.softGray,
        borderRadius: 20
    },
    itemStyle: (is) => ({
        fontFamily: Fonts.medium,
        fontSize: 16,
        paddingVertical: 10,
        borderRadius: 10,
        color: theme.textBlack,
        backgroundColor: is ? theme.silverBorder : 'transparent',
        width: '100%',
        textAlign: 'center'
    }),
    text0: {
        fontFamily: Fonts.bold,
        fontSize: 18,
        color: theme.textBlack,
        textAlign: 'center'
    },
    label: {
        fontFamily: Fonts.medium,
        fontSize: 14,
        color: theme.textBlack
    },
    durationText: {
        fontFamily: Fonts.medium,
        fontSize: 14,
        color: theme.textGray,
        textAlign: 'center',
        marginTop: 5
    },
    footer: {
        backgroundColor: theme.bg,
        paddingHorizontal: 15,
        borderRadius: 16,
        height: 72,
        marginBottom: 20,
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
        marginHorizontal: 15
    },
    btn: (is) => ({
        backgroundColor: theme.buttonBg,
        height: 44,
        width: '100%',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 500,
        opacity: !is ? 0.5 : 1
    }),
    btnText: {
        fontFamily: Fonts.medium,
        fontSize: 16,
        color: theme.textWhite
    }
})