import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { Button, Input } from '@rneui/themed';

import { Ionicons } from '@expo/vector-icons';

const RecoverAccountScreen = ({ route, navigation }) => {
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
        <View style={styles.page}>
            <View style={styles.panel}>
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
                <Button
                    buttonStyle={styles.buttons}
                    title="Reset Password"
                    onPress={() => {
                        alert('Feature comming soon')
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

export default RecoverAccountScreen;