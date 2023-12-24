import React, { useEffect, useState, useMemo } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Dimensions,
    FlatList,
    TouchableOpacity,
    Text
} from 'react-native';
import WrapperContainer1 from '../../components/Wrapper/WrapperContainer1';
import SearchInput from '../../components/SearchBar/SearchInput';
import { theme } from '../../utils/colors';
import { useSelector } from 'react-redux';
import { searchByNameLocation } from '../../services/api';
import { Loading } from '../../components/Loading/Loading';
import { isObjEmpty } from '../../helper/helper';
import CategoryList from '../home/CategoryList';
import { Fonts } from '../../utils/fonts';
import DoctorList from '../home/DoctorList';

const SearchScreen = ({ }) => {

    const { currentLocation } = useSelector(state => state.userReducer)

    const [text, setText] = useState('')
    const [location, setLocation] = useState({})
    const [dataList, setDataList] = useState({})
    const [optionIndex, setOptionIndex] = useState(0);
    const [loading, setLoading] = useState(false)
    const [selectedKey, setSelectedKey] = useState('all')


    useEffect(() => {
        if (text.length) getSearch()
    }, [text]);

    const getSearch = async (text) => {
        try {
            let response = await searchByNameLocation({
                "tag": text,
                "type": "all",
                "latlng": `${currentLocation.lat},${currentLocation.lng}`
            })
            if (response?.result) {
                setDataList(response?.result)
            }
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }

    const onSearch = async (e) => {
        setText(e || '');
        if (e.length > 3) {
            getSearch(e);
            setLoading(true);
        } else {
            setLoading(false);
        }
    }

    return (
        <WrapperContainer1>
            <View style={styles.innerContainer}>
                <SearchInput
                    customStyle={styles.inputContainer}
                    isBack={true}
                    onSearch={onSearch} />
                <View style={styles.inner}>
                    {loading ?
                        <Loading color={theme.black} size={60} />
                        :
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {!isObjEmpty(dataList) ?
                                <View style={styles.titleView}>
                                    <Text style={styles.title}>
                                        Categories
                                    </Text>
                                </View>
                                :
                                null
                            }
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}>
                                {dataList?.categories?.map((el, index) => (
                                    <CategoryList key={index} data={el} />
                                ))}
                            </ScrollView>
                            {(!isObjEmpty(dataList)) ?
                                <View style={styles.titleView}>
                                    <Text style={styles.title}>
                                        Our Services
                                    </Text>
                                </View>
                                :
                                null
                            }
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}>
                                {dataList?.services?.map((el, index) => (
                                    <DoctorList key={index} data={el} tag={'tag'} />
                                ))}
                            </ScrollView>
                        </ScrollView>
                    }
                </View>
            </View>
        </WrapperContainer1>
    )
}

export default SearchScreen

const styles = StyleSheet.create({
    innerContainer: {
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 15,
    },
    inputContainer: {
        height: 50,
        borderColor: theme.searchFieldBg,
        borderWidth: 1.5,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginHorizontal: 10,
        paddingVertical: 3,
    },
    inner: {
        flex: 1,
        marginTop: 10
    },
    titleView: {
        marginTop: 10,
        marginBottom: 5
    },
    title: {
        fontSize: 18,
        color: theme.black,
        fontFamily: Fonts.bold
    },
})