import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { Button, Input } from '@rneui/themed';

import { Ionicons } from '@expo/vector-icons';

import { postTest } from '../api/ZealAfTestRequest';
import { RemovableError } from "../components/RemovableError";

const LogInScreen = ({ route, navigation }) => {
    const initialField = useRef(null);
    const [state, setState] = useState({
        email: '',
        password: '',
        passwordMask: '',
        removableError: '',
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

    function validate(value) {
        return value.length < 1 ? "Required" : "";
    }

    function loginUser() {
        if (validate(state.email).length > 0 || validate(state.password).length > 0) {
            updateStateObject({ removableError: "Missing required fields", password: "", passwordMask: "" })
            return false;
        }
        postTest((data) => {
            console.log(data);
            if (data[0]) {
                const loginHash = data[1];
                navigation.navigate("Zeal Areal Fitness", { loginHash });
            } else {
                updateStateObject({ removableError: data[1], password: "", passwordMask: "" })
            }
        }, state.email, state.password);
    }

    const updatePassword = (val) => {
        if (val.length > 0) {
            const newPass = `${state.password}${val.slice(-1)}`;
            const newMask = `${val.slice(0, -1)}*`;
            updateStateObject({ password: newPass, passwordMask: newMask })
        } else {
            updateStateObject({ password: "", passwordMask: "" })
        }
    }
    return (
        <View style={styles.page}>
            <View style={styles.panel}>
                <Input
                    style={styles.input}
                    placeholder="Email"
                    ref={initialField}
                    value={state.email}
                    autoCorrect={false}
                    errorStyle={styles.inputError}
                    errorMessage={validate(state.email)}
                    onChangeText={(val) => updateStateObject({ email: val })}
                />
                <Input
                    style={styles.input}
                    placeholder="Password"
                    value={state.passwordMask}
                    autoCorrect={false}
                    errorStyle={styles.inputError}
                    errorMessage={validate(state.password)}
                    onChangeText={(val) => updatePassword(val)}
                />
                {RemovableError(state.removableError, updateStateObject)}
                <Button
                    buttonStyle={styles.buttons}
                    title="Login"
                    onPress={() => {
                        loginUser()
                    }}
                />
                <Button
                    buttonStyle={styles.buttons}
                    title="Fogot Password"
                    onPress={() => {
                        navigation.navigate("Account Recovery");
                    }}
                />
                <Button
                    buttonStyle={styles.buttons}
                    title="Create Account"
                    onPress={() => {
                        navigation.navigate("New Account");
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
        alignItems: 'center',
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

export default LogInScreen;