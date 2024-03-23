import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    I18nManager
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import HeaderWithBackButton from '../../components/Headers/HeaderWithBackButton';
import { theme } from '../../utils/colors';
import { Fonts } from '../../utils/fonts';
import { ForwardEnIcon,  } from '../../utils/images';
import WrapperContainer1 from '../../components/Wrapper/WrapperContainer1';


const HelpCenter = ({ }) => {

    const [data, setData] = useState([{
        id: 1,
        title: 'WANT US TO CALL YOU',
        description: 'Let us know when would be the best time to contact you',
        // icon: call18
    }, {
        id: 2,
        title: 'CALL 800227344837',
        text1: 'Mon-Fri: 8:30 a.m to 8:00 p.m',
        text2: 'Sat: 10:30 a.m to 4:00 p.m',
        // icon: call18
    }, {
        id: 3,
        title: 'FACEBOOK',
        description: '800 Caregiver',
        // icon: fb1
    }, {
        id: 4,
        title: 'TWITTER',
        description: '@800caregiver',
        // icon: tw2
    }])

    return (
        <WrapperContainer1>
            <HeaderWithBackButton text={"Help Center"} />
            <View style={styles.innerContainer}>
                {data.map((item, index) => {
                    return (
                        <View style={styles.row} key={index}>
                            <View style={styles.icon}>
                                {/* <Image source={item.icon} style={styles.img} /> */}
                            </View>
                            <View style={{ flex: 1, marginHorizontal: 10, alignItems: 'flex-start' }}>
                                <Text style={styles.title}>
                                    {item.title}
                                </Text>
                                {item.description ?
                                    <Text style={[styles.des, { marginVertical: 5 }]}>
                                        {item.description}
                                    </Text>
                                    :
                                    null
                                }
                                {item.text1 ?
                                    <Text style={[styles.des, { marginVertical: 5 }]}>
                                        {item.text1}
                                    </Text>
                                    :
                                    null
                                }
                                {item.text1 ?
                                    <Text style={styles.des}>
                                        {item.text2}
                                    </Text>
                                    :
                                    null
                                }
                            </View>
                            <View style={styles.arrowSvg}>
                                <ForwardEnIcon svgStyle={{}} />
                            </View>
                        </View>
                    )
                })}
            </View>
        </WrapperContainer1>
    )
}

export default HelpCenter

const styles = ({
    container: {
        height: hp('100%'),
        backgroundColor: theme.bg,
    },
    innerContainer: {
        flex: 1,
        marginTop: 20,
        paddingHorizontal: 15,

    },
    row: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
    img: {
        height: '100%',
        width: '100%',
        tintColor: theme.black
    },
    icon: {
        height: 25,
        width: 25,
        marginRight: 10,
        justifyContent: 'center'
    },
    title: {
        fontSize: 18,
        fontFamily: Fonts.medium,
        color: theme.black
    },
    des: {
        fontSize: 14,
        fontFamily: Fonts.medium,
        color: theme.black,
    },
    arrowSvg: {
        height: 20,
        width: 20
    }
})