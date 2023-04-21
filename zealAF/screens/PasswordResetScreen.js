import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { Button, Input } from '@rneui/themed';

import { Ionicons } from '@expo/vector-icons';
import { updatePassword } from "../api/ZealAfTestRequest";

const PasswordResetScreen = ({ route, navigation }) => {
    const givenHash = route.params.hash;
    const initialField = useRef(null);
    const [state, setState] = useState({
        hash: givenHash,
        newPass: "",
        confirmPass: "",
        error: "",
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
        return isNaN(value) ? "Must be a number" : "";
    }

    const updateUserPassword = () => {
        updatePassword((data) => {
            console.log(data);
            if (data[0] == null) {
                navigation.navigate("Account Info", { hash: state.hash, info: 'Password updated!' });
            } else {
                const errors = data[0];
                updateStateObject({ error: errors.join(',') })
                console.log(`here. ${errors}`)
            }
        }, state.hash, state.newPass, state.confirmPass);
    }
    const errorMessage = () => {
        if (state.error.length > 1) {
            return <Text>{state.error}</Text>
        }
    }
    return (
        <View style={styles.page}>
            <View style={styles.panel}>
                <Input
                    style={styles.input}
                    placeholder="New Password"
                    ref={initialField}
                    value={state.newPass}
                    autoCorrect={false}
                    errorStyle={styles.inputError}
                    errorMessage={validate(state.newPass)}
                    onChangeText={(val) => updateStateObject({ newPass: val })}
                />
                <Input
                    style={styles.input}
                    placeholder="Confirm Password"
                    value={state.confirmPass}
                    autoCorrect={false}
                    errorStyle={styles.inputError}
                    errorMessage={validate(state.confirmPass)}
                    onChangeText={(val) => updateStateObject({ confirmPass: val })}
                />
                <Button
                    buttonStyle={styles.buttons}
                    title="Update"
                    onPress={() => {
                        updateUserPassword();
                    }}
                />
                {errorMessage()}
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

export default PasswordResetScreen;