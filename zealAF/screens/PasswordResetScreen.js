import {
    StyleSheet,
    TouchableOpacity,
    View
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { Input } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';
import { updatePassword } from "../api/ZealAfTestRequest";
import { RemovableError } from "../components/RemovableError";
import { setConfirm, setPassword } from "../helpers/HelperFunctions";
import { PanelCenter } from "../components/PanelCenter";
import { BaseButton } from "../components/BaseButton";

const PasswordResetScreen = ({ route, navigation }) => {
    const givenHash = route.params.hash;
    const initialField = useRef(null);
    const [state, setState] = useState({
        hash: givenHash,
        password: '',
        passwordMask: '',
        confirm: '',
        confirmMask: '',
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
                        navigation.navigate("Account Info");
                    }}
                >
                    <Ionicons name="chevron-back" size={24} color="white" />
                </TouchableOpacity>
            ),
        });
    });

    function validate(value) {
        return value.length < 1 ? 'Required' : '';
    }

    const updateUserPassword = () => {
        updatePassword((data) => {
            console.log(data);
            if (data[0] == null) {
                navigation.navigate("Account Info", { hash: state.hash, info: 'Password updated!' });
            } else {
                const errors = data[0];
                updateStateObject({ removableError: errors.join(',') })
            }
        }, state.hash, state.password, state.confirm);
    }

    return (
        <PanelCenter>
            <Input
                style={styles.input}
                placeholder="New Password"
                ref={initialField}
                value={state.passwordMask}
                autoCorrect={false}
                errorStyle={styles.inputError}
                errorMessage={validate(state.password)}
                onChangeText={(val) => setPassword(state.password, val, updateStateObject)}
            />
            <Input
                style={styles.input}
                placeholder="Confirm Password"
                value={state.confirmMask}
                autoCorrect={false}
                errorStyle={styles.inputError}
                errorMessage={validate(state.confirm)}
                onChangeText={(val) => setConfirm(state.confirm, val, updateStateObject)}
            />
            <BaseButton
                title="Update"
                onPress={() => {
                    updateUserPassword();
                }}
            />
            {RemovableError(state.removableError, updateStateObject)}
        </PanelCenter>
    );
};

const styles = StyleSheet.create({
    input: {
        padding: 10,
    },
});

export default PasswordResetScreen;