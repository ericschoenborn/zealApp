import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
} from "react-native";
import React, { useEffect, useState } from "react";
import GoogleMap from 'google-map-react';
import { Ionicons } from '@expo/vector-icons';

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
    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <View style={{ flex: 1, maxWidth: 500, backgroundColor: 'white', minWidth: 300, alignItems: 'center' }}>
                <GoogleMap
                    yesIWantToUseGoogleMapApiInternals
                    bootstrapURLKeys={GoogleMapConfig}
                    defaultZoom={16}
                    defaultCenter={{
                        lat: 40.854885,
                        lng: -88.081807,
                    }}
                />
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