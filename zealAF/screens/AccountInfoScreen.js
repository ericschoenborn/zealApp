import {
    Text,
    TouchableOpacity,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { Ionicons } from '@expo/vector-icons';
import { logOut, getUser } from "../api/ZealAfTestRequest";
import { RemovableInfo } from "../components/RemovableInfo";
import { PanelCenter } from "../components/PanelCenter";
import { BaseButton } from "../components/BaseButton";

const AccountInfoScreen = ({ route, navigation }) => {
    const givenHash = route.params?.hash || null;
    const givenInfo = route.params?.info || '';
    const [state, setState] = useState({
        hash: givenHash,
        removableInfo: givenInfo,
        user: null,
    });
    const updateStateObject = (vals) => {
        setState({
            ...state,
            ...vals,
        });
    };
    const logOutUser = () => {
        logOut((data) => {
            console.log(data);
            if (data[0] == true) {
                updateStateObject({ hash: "" });
                const logOut = true;
                navigation.navigate("Zeal Areal Fitness", { logOut });
            } else {
                console.log(`Failed to logout. ${state.hash}`)
            }
        }, state.hash);
    }

    useEffect(() => {
        console.log(route.params)
        if (route.params?.info) {
            updateStateObject({ removableInfo: route.params.info, user: route.params.user });
        }
    }, [route.params?.info]);

    useEffect(() => {
        getUser((data) => {
            if (data == null) {
                console.log('oopes');
            } else {
                const userData = data[1];
                console.log(userData);
                const formatedData = {
                    firstName: userData['firstName'],
                    middleName: userData['middleName'],
                    lastName: userData['lastName'],
                    email: userData['email'],
                    dob: userData['dob'],
                    phone: userData['phone'],
                    pronouns: userData['pronouns']
                }
                updateStateObject({ user: formatedData });
            }
        }, state.hash)
    }, []);

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
        <PanelCenter>
            {RemovableInfo(state.removableInfo, updateStateObject)}
            <Text>Name: {state.user?.firstName} {state.user?.middleName} {state.user?.lastName}</Text>
            <Text>Email: {state.user?.email}</Text>
            <Text>Phone: {state.user?.phone}</Text>
            <Text>D.O.B.: {state.user?.dob}</Text>
            <Text>Pronouns: {state.user?.pronouns}</Text>
            <BaseButton
                title="Update"
                onPress={() => {
                    navigation.navigate("Update Account", { hash: state.hash, user: state.user });
                }}
            />
            <BaseButton
                title="Change Password"
                onPress={() => {
                    navigation.navigate("Password Reset", { hash: state.hash });
                }}
            />
            <BaseButton
                title="Log Out"
                onPress={() => {
                    localStorage.clear();
                    logOutUser();
                }}
            />
        </PanelCenter>
    );
};

export default AccountInfoScreen;