import Geocoder from 'react-native-geocoding';
import { GoogleMapsAPI1 } from "../services/constants";

Geocoder.init(GoogleMapsAPI1)

function decodeAddressByLocation(lat, lng) {
    return new Promise((resolve, reject) => {
        Geocoder.from(lat, lng)
            .then((response) => {
                const address = response.results[0].formatted_address;
                let address_components = response.results[0].address_components
                let city, state, country, countryCode, town;
                for (let i = 0; i < address_components.length; i++) {
                    for (let j = 0; j < address_components[i].types.length; j++) {
                        switch (address_components[i].types[j]) {
                            case "sublocality":
                                town = address_components[i].long_name;
                                break;
                            case "locality":
                                city = address_components[i].long_name;
                                break;
                            case "administrative_area_level_1":
                                state = address_components[i].long_name;
                                break;
                            case "country":
                                country = address_components[i].long_name;
                                countryCode = address_components[i].short_name;
                                break;

                        }
                    }
                }
                let currentPostion = {
                    lat: lat,
                    lng: lng,
                    town: town,
                    city: city,
                    state: state,
                    country: country,
                    countryCode: countryCode,
                    address: address
                }
                resolve(currentPostion)
            },
                (error) => {
                    reject("Server Error")
                }
            )
            .catch((err) => reject(err))

    })
}

function decodeAddressBySearch(response) {
    return new Promise((resolve, reject) => {
        const address = response.formatted_address;
        let address_components = response.address_components
        let city, state, country, countryCode, town;
        for (let i = 0; i < address_components.length; i++) {
            for (let j = 0; j < address_components[i].types.length; j++) {
              
                switch (address_components[i].types[j]) {
                    case "sublocality":
                        town = address_components[i].long_name;
                        break;
                    case "locality":
                        city = address_components[i].long_name;
                        break;
                    case "administrative_area_level_1":
                        state = address_components[i].long_name;
                        break;
                    case "country":
                        country = address_components[i].long_name;
                        countryCode = address_components[i].short_name;
                        break;

                }
            }
        }
        let currentPostion = {
            lat: response?.geometry?.location.lat,
            lng: response?.geometry?.location.lng,
            town: town,
            city: city,
            state: state,
            country: country,
            countryCode: countryCode,
            address: address
        }
        resolve(currentPostion)

    })
}

export {
    decodeAddressByLocation,
    decodeAddressBySearch
}