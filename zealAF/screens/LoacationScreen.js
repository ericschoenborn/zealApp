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
    const [state, setState] = useState({
        hash: route.params?.hash || null,
    });
    const updateStateObject = (vals) => {
        setState({
            ...state,
            ...vals,
        });
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
    listButton: {
        backgroundColor: '#DDDDDD',
        padding: 10,
        margin: 10,
    },
    row: {
        flexDirection: "row",
        width: '100%',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#14A99D',
        margin: 10,
        borderRadius: 10,
    },
    date: {
        fontStyle: "italic",
        textAlign: "right",
        fonstSize: 8,
    },
    list: {
        Height: "50%",
    },
    container: {
        flex: 1,
        paddingTop: 22,
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fonSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    }
});

export default LocationScreen;