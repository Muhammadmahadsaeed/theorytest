import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Platform,
    ScrollView,
    useWindowDimensions
} from 'react-native';
import RenderHtml from 'react-native-render-html';
import WrapperContainer1 from '../../components/Wrapper/WrapperContainer1';
import CustomHeaderWithBgImg from '../../components/Headers/CustomHeaderWithBgImg';
import Button from '../../components/Buttons/Button';
import { Fonts } from '../../utils/fonts';
import { theme } from '../../utils/colors';
import { CalenderIcon } from '../../utils/images';
import NewsCard from './NewsCard';
import ShareModal from '../../components/Modal/ShareModal';
import moment from 'moment';
import { getNews } from '../../services/api';
import { Loading } from '../../components/Loading/Loading';
import { EmptyList } from '../../components/Exception/EmptyList';
import TextModal from '../../components/Modal/TextModal';
import { isObjEmpty } from '../../helper/helper';

const NewsScreen = ({ route }) => {

    const { params } = route || {}

    const shareModalRef = useRef()
    const textModalRef = useRef()

    const { width } = useWindowDimensions();

    const [news, setNews] = useState([])
    const [currentNews, setCurrentNews] = useState(params || {})
    const [loading, setLoading] = useState(true)

    const onShareClick = () => {
        shareModalRef.current.isOpen()
    }

    useEffect(() => {
        getAllNews()
    }, [])

    useEffect(() => {
        console.log("news change hoi==========");
    }, [currentNews])

    const getAllNews = async () => {
        try {
            let response = await getNews({})
            if (response?.result?.data?.length > 0) {
                if (!params?.path) {
                    setCurrentNews(response?.result?.data[0])
                }
                setNews(response?.result?.data)
            }

        } catch (error) {

        } finally {
            setLoading(false)
        }
    }

    const onNewsChange = (item) => {
        setCurrentNews(item)
    }

    const onReadMore = () => {
        textModalRef.current.isOpen(currentNews)
    }


    return (
        <WrapperContainer1>
            <CustomHeaderWithBgImg
                isLeft={true}
                text={"News"}
                type={true}
                image={currentNews?.image}
                isRight={true}
                path={params?.path}
                onShareClick={onShareClick} />
            <View style={styles.container}>
                <View style={{ flex: 0.8}}>
                    {isObjEmpty(currentNews) ?
                        <Loading size={40} color={theme.black} />
                        :
                        <View style={styles.card}>
                            <View style={styles.cardInner}>
                                <Text style={styles.label}>
                                    {currentNews?.title}
                                </Text>
                                <View style={styles.row}>
                                    <View style={styles.icon}>
                                        <CalenderIcon />
                                    </View>
                                    <Text style={styles.dateText}>
                                        {moment(currentNews?.date, 'YYYY-MM-DD').format('DD/MM/YYYY')}
                                    </Text>
                                </View>
                                <View style={styles.description}>
                                    <RenderHtml
                                        contentWidth={width}
                                        source={{ html: currentNews?.description }}
                                    />
                                </View>
                            </View>
                            <View style={styles.footer}>
                                <Button title={"Read More"} onPress={onReadMore} />
                            </View>
                        </View>
                    }
                </View>
                <View style={{ flex: 1 }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.headingView}>
                            <Text style={styles.heading}>
                                Latest
                            </Text>
                        </View>
                        {!!!news.length && loading && (
                            <Loading size={40} color={theme.black} />
                        )}
                        {!!news.length && !loading && news.map((el, index) => (
                            <NewsCard data={el} key={index} goToChat={onNewsChange} />
                        ))}
                        {!!!news.length && !loading && (
                            <EmptyList text={"There is no news"} />
                        )}

                    </ScrollView>
                </View>
            </View>
            <ShareModal ref={shareModalRef} />
            <TextModal ref={textModalRef} />
        </WrapperContainer1>
    )
}

export default NewsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        flex: 1,
        width: '100%',
        backgroundColor: theme.bg,
        position: 'absolute',
        top: -25,
        zIndex: 1,
        width: '90%',
        alignSelf: 'center',
        borderRadius: 16,
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    cardInner: {
        paddingHorizontal: 20,
        marginTop: 20,
        // marginBottom: 70
    },
    label: {
        fontSize: 20,
        fontFamily: Fonts.bold,
        color: theme.text,

    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5
    },
    icon: {
        height: 16,
        width: 16
    },
    dateText: {
        flex: 1,
        marginLeft: 10,
        fontFamily: Fonts.medium,
        fontSize: 12,
        color: theme.gray
    },
    description: {
        flex: 1,
        height: 100,
        overflow: 'hidden',
        marginBottom: 25
    },
    footer: {
        width: '50%',
        alignSelf: 'center',
        position: 'absolute',
        bottom: -20
    },
    headingView: {
        paddingHorizontal: 15
    },
    heading: {
        fontSize: 18,
        fontFamily: Fonts.bold,
        color: theme.text
    }
})