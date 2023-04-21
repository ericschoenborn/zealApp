import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { Button, Input } from '@rneui/themed';

import { Ionicons } from '@expo/vector-icons';
import { logOut, getUser } from "../api/ZealAfTestRequest";

const AccountInfoScreen = ({ route, navigation }) => {
    const givenHash = route.params?.hash || null;
    const [state, setState] = useState({
        hash: givenHash,
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
    const displayInfo = () => {
        console.log(route.params);
        if (route.params?.info) {
            alert(route.params.info);
        }
    }
    useEffect(() => {
        getUser((data) => {
            if (data == null) {
                console.log('oopes');
            } else if (data[0] != null) {
                console.log('eeeh');
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
                console.log(formatedData);
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
        <View style={styles.page}>
            <View style={styles.panel}>
                {displayInfo()}
                <Text>Name: {state.user?.firstName} {state.user?.middleName} {state.user?.lastName}</Text>
                <Text>Email: {state.user?.email}</Text>
                <Text>Phone: {state.user?.phone}</Text>
                <Text>D.O.B.: {state.user?.dob}</Text>
                <Text>Pronouns: {state.user?.pronouns}</Text>
                <Button
                    buttonStyle={styles.buttons}
                    title="Update"
                    onPress={() => {
                        navigation.navigate("Update Account", { hash: state.hash, user: state.user });
                    }}
                />
                <Button
                    buttonStyle={styles.buttons}
                    title="Change Password"
                    onPress={() => {
                        navigation.navigate("Password Reset", { hash: state.hash });
                    }}
                />
                <Button
                    buttonStyle={styles.buttons}
                    title="Log Out"
                    onPress={() => {
                        localStorage.clear();
                        logOutUser();
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        padding: 10,
    },
    buttons: {
        backgroundColor: '#14A99D',
        margin: 10,
        borderRadius: 10,
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

export default AccountInfoScreen;