import {
    StyleSheet,
    TouchableOpacity,
    View
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { Button, Input } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';
import { updatePassword } from "../api/ZealAfTestRequest";
import { RemovableError } from "../components/RemovableError";
import { setConfirm, setPassword } from "../helpers/HelperFunctions";

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
        <View style={styles.page}>
            <View style={styles.panel}>
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
                <Button
                    buttonStyle={styles.buttons}
                    title="Update"
                    onPress={() => {
                        updateUserPassword();
                    }}
                />
                {RemovableError(state.removableError, updateStateObject)}
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