import React, { useEffect, useState, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { custom_marker, custom_pin } from '../../utils/images';

const MapComponent = ({ location, markers = [], getAddress }) => {

    const [position, setPosition] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
    })
    const [isCalloutVisible, setCalloutVisible] = useState(false);

    const mapView = useRef()

    useEffect(() => {
        const newPosition = {
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          };
          setPosition(newPosition); 
    }, [location])

    const onRegionChange = (region) => {
        getAddress(region);
    }

    const handleMarkerPress = (data) => {
        setCalloutVisible(!isCalloutVisible)
    };
// console.log("postiico============",position);
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.markerFixed} pointerEvents='none'>
                <Image source={custom_pin} style={styles.img} />
            </View>
            <MapView
                ref={mapView}
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                // pointerEvents="none"
                onRegionChangeComplete={onRegionChange}
                region={{ ...position }}
                >
                {markers.length > 0 && markers.map(marker => (
                    
                    <Marker
                        key={marker.id}
                        coordinate={{
                            latitude: marker.latitude,
                            longitude: marker.longitude
                        }}
                        title={marker?.name}
                        description={marker?.seller_address}
                        onPress={() => {
                            handleMarkerPress(marker)
                        }}
                    >
                        <View style={styles.icon1}>
                            <Image source={custom_marker} style={styles.img} />
                        </View>
                    </Marker>
                ))}
            </MapView>
        </View>
    )
}


export default MapComponent


const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject
    },
    markerFixed: {
        height: 40,
        width: 40,
        zIndex: 3,
        left: '50%',
        marginLeft: -24,
        marginTop: -48,
        position: 'absolute',
        top: '50%'
    },
    icon1: {
        height: 40,
        width: 40,
    },
    img: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain'
    }
})

