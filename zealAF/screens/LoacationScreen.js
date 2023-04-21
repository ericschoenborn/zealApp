import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
} from "react-native";
import React, { useEffect, useState } from "react";
import GoogleMap from 'google-map-react';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

const LocationScreen = ({ route, navigation }) => {
    const GoogleMapConfig = {
        key: "AIzaSyC_4VNhymJHcZwEJa-W458jZSifJUA508M",
        libraries: 'places',
    };

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("Zeal Areal Fitness");
                    }}
                >
                    <Ionicons name="chevron-back" size={24} color="white" />
                </TouchableOpacity>
            ),
        });
    });
    const MapPin = () => <FontAwesome name="map-marker" size={24} color="red" />;
    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <View style={{ flex: 1, maxWidth: 500, backgroundColor: 'white', minWidth: 300, alignItems: 'center' }}>
                <GoogleMap
                    yesIWantToUseGoogleMapApiInternals
                    bootstrapURLKeys={GoogleMapConfig}
                    defaultZoom={14}
                    defaultCenter={{
                        lat: 42.94232,
                        lng: -85.6854,
                    }}
                ><MapPin
                        lat={42.94232}
                        lng={-85.6854}
                    />
                </GoogleMap>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
    },
    page: {
        flex: 1,
        alignItems: 'center'
    },
    panel: {
        flex: 1,
        maxWidth: 500,
        backgroundColor: 'white',
        minWidth: 300,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default LocationScreen;