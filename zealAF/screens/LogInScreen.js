import {
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { Input } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';
import { postTest } from '../api/ZealAfTestRequest';
import { RemovableError } from "../components/RemovableError";
import { PanelCenter } from "../components/PanelCenter";
import { BaseButton } from "../components/BaseButton";

const LogInScreen = ({ navigation }) => {
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
        <PanelCenter>
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
            <BaseButton
                title="Login"
                onPress={() => {
                    loginUser()
                }}
            />
            <BaseButton
                title="Fogot Password"
                onPress={() => {
                    navigation.navigate("Account Recovery");
                }}
            />
            <BaseButton
                title="Create Account"
                onPress={() => {
                    navigation.navigate("New Account");
                }}
            />
        </PanelCenter>
    );
};

const styles = StyleSheet.create({
    input: {
        padding: 10,
    },
});

export default LogInScreen;