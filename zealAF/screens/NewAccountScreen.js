import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    SafeAreaView
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { Button, Input } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';
import { createUser } from "../api/ZealAfTestRequest";

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
        createResponse: '',
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
        console.log(`password: ${state.password}`)
        console.log(`conf: ${state.confirm}`)
        if (state.password != state.confirm) {
            updateStateObject({ createResponse: 'Passwords do not match' })
        }

        if (state.email.length < 3) {
            updateStateObject({ createResponse: 'Email is required' })

        }

        if (state.password.length < 3) {
            updateStateObject({ createResponse: 'Password is required' })

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
            console.log(data)
            if (data == null) {
                navigation.navigate("Zeal Areal Fitness", { info: 'Account created!' });
            } else if (data[0] != null) {
                updateStateObject({ createResponse: data })
            } else {
                const userData = data[1];
                console.log(userData);
            }
        }, formatedData)
    }
    function validate(value) {
        return value.length < 1 ? "Requireted" : "";
    }
    const createResponse = () => {
        if (state.createResponse.length > 0) {
            return <Text>{state.createResponse}</Text>
        }
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
    if (isLoaded) return <View><Text>Loading ...</Text></View>
    return (
        <View>
            <SafeAreaView style={{ flex: 1 }}>
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
                    errorStyle={styles.inputError}
                    errorMessage={validate(state.middleName)}
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
                    errorStyle={styles.inputError}
                    errorMessage={validate(state.pronouns)}
                    onChangeText={(val) => updateStateObject({ pronouns: val })}
                />

            </SafeAreaView>
            {createResponse()}
            <Button
                buttonStyle={styles.buttons}
                title="Create"
                onPress={() => {
                    create();
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

export default NewAccountScreen;