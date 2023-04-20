import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { Button, Input } from '@rneui/themed';

import { Ionicons } from '@expo/vector-icons';
import { updateUser } from "../api/ZealAfTestRequest";

const UpdateAccountScreen = ({ route, navigation }) => {
    const initialField = useRef(null);
    const givenHash = route.params?.hash || null;
    const givenUser = route.params?.user || null;
    const [state, setState] = useState({
        hash: givenHash,
        firstName: givenUser?.firstName || '',
        middleName: givenUser?.middleName || '',
        lastName: givenUser?.lastName || '',
        phone: givenUser?.phone || '',
        dob: givenUser?.dob || '',
        pronouns: givenUser?.pronouns || '',
        updateResponse: '',
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
    const update = () => {
        console.log(state.dob)
        const formatedData = {
            firstName: state.firstName,
            middleName: state.middleName,
            lastName: state.lastName,
            dob: state.dob,
            phone: state.phone,
            pronouns: state.pronouns
        }
        updateUser((data) => {
            console.log(data)
            if (data == null) {
                navigation.navigate("Account Info", { hash: state.hash, info: 'Account info updated!' });
            } else if (data[0] != null) {
                updateStateObject({ updateResponse: data })
            } else {
                const userData = data[1];
                console.log(userData);
            }
        }, state.hash, formatedData)
    }
    function validate(value) {
        return value.length < 1 ? "Requireted" : "";
    }
    const updateResponse = () => {
        if (state.updateResponse.length > 0) {
            return <Text>{state.updateResponse}</Text>
        }
    }
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

    return (
        <View>
            {displayInfo()}
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
            {updateResponse()}
            <Button
                buttonStyle={styles.buttons}
                title="Update"
                onPress={() => {
                    update();
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

export default UpdateAccountScreen;