import { TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import GoogleMap from 'google-map-react';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { PanelCenter } from "../components/PanelCenter";

const LocationScreen = ({ navigation }) => {
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
        <PanelCenter>
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
        </PanelCenter>
    );
};

export default LocationScreen;