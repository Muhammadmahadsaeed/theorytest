import React from 'react';
import {
    View
} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {  theme } from '../../utils/colors';
import { Fonts } from '../../utils/fonts';
import { GoogleMapsAPI1 } from '../../services/constants';
import i18n from '../../i18n';
import { SearchGreenIcon } from '../../utils/images';

const SearchBarForAddress = ({ onSearch, customStyle }) => {

    const onChange = (value, details) => {
        onSearch(value, details)
    }

    return (
        <GooglePlacesAutocomplete
            placeholder={i18n.t('search_placeholder')}
            onPress={(data, details = null) => {
                onChange(data, details);
            }}
            renderRightButton={() => (
                <View style={styles.icon}>
                    <SearchGreenIcon svgStyle={styles.svgStyle} />
                </View>
            )}
            fetchDetails={true}
            styles={{
                container: { ...styles.locationInput, ...customStyle },
                textInputContainer: styles.textInputContainer,
                textInput: styles.inputStyle,
                description: {
                    fontSize: 12,
                    fontFamily: Fonts.medium
                },

            }}
            enablePoweredByContainer={false}
            enableHighAccuracyLocation
            query={{
                key: GoogleMapsAPI1,
                language: 'en',
                region: 'ae',
                components: 'country:ae'
            }}
            
        />
    )
}

export default SearchBarForAddress

const styles = ({
    locationInput: {
        width: '100%',
        backgroundColor: theme.searchFieldBg,
        // height: 44,
        borderRadius: 16,
    },
    textInputContainer: {
        borderRadius: 16,
        backgroundColor: theme.searchFieldBg,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    svgStyle: {
        height: 30,
        width: 30
    },
    inputStyle: {
        borderRadius: 16,
        backgroundColor: theme.searchFieldBg,
        flex: 1,
        fontFamily: Fonts.medium,
        fontSize: 14,
        color: theme.textBlack,
    }
})