import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { Input } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';
import { PanelCenter } from "../components/PanelCenter";
import { BaseButton } from "../components/BaseButton";

const RecoverAccountScreen = ({ navigation }) => {
    const initialField = useRef(null);
    const [state, setState] = useState({
        email: "",
        password: "",
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
                        navigation.navigate("Login");
                    }}
                >
                    <Ionicons name="chevron-back" size={24} color="white" />
                </TouchableOpacity>
            ),
        });
    });

    function validate(value) {
        return isNaN(value) ? "Must be a number" : "";
    }

    return (
        <PanelCenter>
            <Text>Recover Account</Text>
            <Input
                style={styles.input}
                placeholder="One Time Code"
                ref={initialField}
                value={state.email}
                autoCorrect={false}
                errorStyle={styles.inputError}
                errorMessage={validate(state.email)}
                onChangeText={(val) => updateStateObject({ email: val })}
            />
            <BaseButton
                title="Reset Password"
                onPress={() => {
                    alert('Feature comming soon')
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

export default RecoverAccountScreen;