import {
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { Input } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';
import { createUser } from "../api/ZealAfTestRequest";
import { RemovableError } from "../components/RemovableError";
import { PanelScroll } from "../components/PanelScroll";
import { BaseButton } from "../components/BaseButton";

const NewAccountScreen = ({ route, navigation }) => {
    const initialField = useRef(null);
    const [state, setState] = useState({
        email: '',
        password: '',
        passwordMask: '',
        confirm: '',
        confirmMask: '',
        firstName: '',
        middleName: '',
        lastName: '',
        phone: '',
        dob: '',
        pronouns: '',
        removableError: '',
    });
    const updateStateObject = (vals) => {
        setState({
            ...state,
            ...vals,
        });
    };
    const displayInfo = () => {
        if (route.params?.info) {
            alert(route.params.info);
        }
    }
    const create = () => {
        if (state.password != state.confirm) {
            updateStateObject({ removableError: 'Passwords do not match' });
            return;
        }

        if (state.email.length < 3) {
            updateStateObject({ removableError: 'Email is required' })
            return;
        }

        if (state.password.length < 3) {
            updateStateObject({ removableError: 'Password is required' })
            return;
        }

        const formatedData = {
            email: state.email,
            password: state.password,
            comPass: state.confirm,
            firstName: state.firstName,
            middleName: state.middleName,
            lastName: state.lastName,
            dob: state.dob,
            phone: state.phone,
            pronouns: state.pronouns
        }
        createUser((data) => {
            if (data == null) {
                navigation.navigate("Zeal Areal Fitness", { info: 'Account created!' });
            } else if (data[0] != null) {
                console.log(data)
                var formated = data.join(" ");
                updateStateObject({ removableError: formated })
            }
        }, formatedData)
    }
    function validate(value) {
        return value.length < 1 ? "Required" : "";
    }

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
    const updatePassword = (val) => {
        if (val.length > 0) {
            const newPass = `${state.password}${val.slice(-1)}`;
            const newMask = `${val.slice(0, -1)}*`;
            updateStateObject({ password: newPass, passwordMask: newMask })
        } else {
            updateStateObject({ password: "", passwordMask: "" })
        }
    }
    const updateConfirm = (val) => {
        if (val.length > 0) {
            const newPass = `${state.confirm}${val.slice(-1)}`;
            const newMask = `${val.slice(0, -1)}*`;
            updateStateObject({ confirm: newPass, confirmMask: newMask })
        } else {
            updateStateObject({ confirm: "", confirmMask: "" })
        }
    }
    return (
        <PanelScroll>
            {displayInfo()}
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
            <Input
                style={styles.input}
                placeholder="Confirm"
                value={state.confirmMask}
                autoCorrect={false}
                errorStyle={styles.inputError}
                errorMessage={validate(state.confirm)}
                onChangeText={(val) => updateConfirm(val)}
            />
            <Input
                style={styles.input}
                placeholder="First Name"
                ref={initialField}
                value={state.firstName}
                autoCorrect={false}
                errorStyle={styles.inputError}
                errorMessage={validate(state.firstName)}
                onChangeText={(val) => updateStateObject({ firstName: val })}
            />
            <Input
                style={styles.input}
                placeholder="Middle Name"
                value={state.middleName}
                autoCorrect={false}
                onChangeText={(val) => updateStateObject({ middleName: val })}
            />
            <Input
                style={styles.input}
                placeholder="Last Name"
                value={state.lastName}
                autoCorrect={false}
                errorStyle={styles.inputError}
                errorMessage={validate(state.lastName)}
                onChangeText={(val) => updateStateObject({ lastName: val })}
            />
            <Input
                style={styles.input}
                placeholder="Phone"
                value={state.phone}
                autoCorrect={false}
                errorStyle={styles.inputError}
                errorMessage={validate(state.phone)}
                onChangeText={(val) => updateStateObject({ phone: val })}
            />
            <Input
                style={styles.input}
                placeholder="D.O.B"
                value={state.dob}
                autoCorrect={false}
                errorStyle={styles.inputError}
                errorMessage={validate(state.dob)}
                onChangeText={(val) => updateStateObject({ dob: val })}
            />
            <Input
                style={styles.input}
                placeholder="Pronouns"
                value={state.pronouns}
                autoCorrect={false}
                onChangeText={(val) => updateStateObject({ pronouns: val })}
            />
            {RemovableError(state.removableError, updateStateObject)}
            <BaseButton
                title="Create"
                onPress={() => {
                    create();
                }}
            />
        </PanelScroll>
    );
};

const styles = StyleSheet.create({
    input: {
        padding: 10,
    },
});

export default NewAccountScreen;