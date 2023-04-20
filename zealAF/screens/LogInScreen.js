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

const LogInScreen = ({ route, navigation }) => {
    const initialField = useRef(null);
    const [state, setState] = useState({
        email: "",
        password: "",
        passwordMask: "",
        loginError: "",
        loginHash: "aaaa",
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
        return value.length < 1 ? "Requireted" : "";
    }

    function loginUser() {
        if (validate(state.email).length > 0 || validate(state.password).length > 0) {
            updateStateObject({ loginError: "Missing required fields", password: "", passwordMask: "" })
            return false;
        }
        postTest((data) => {
            console.log(data);
            if (data[0]) {
                const loginHash = data[1];
                navigation.navigate("Zeal Areal Fitness", { loginHash });
            } else {
                updateStateObject({ loginError: data[1], password: "", passwordMask: "" })
            }
        }, state.email, state.password);
    }
    const loginErrorMessage = () => {
        if (state.loginError.length > 1) {
            return <Text>{state.loginError}</Text>
        }
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
        <View>
            <Text>Username and password required</Text>
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
            {loginErrorMessage()}
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
});

export default LogInScreen;