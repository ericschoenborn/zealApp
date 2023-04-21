import {
    StyleSheet,
    TouchableOpacity,
    View
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { Button, Input } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';
import { updateUser } from "../api/ZealAfTestRequest";
import { RemovableError } from "../components/RemovableError";
import { RemovableInfo } from "../components/RemovableInfo";

const UpdateAccountScreen = ({ route, navigation }) => {
    const initialField = useRef(null);
    const givenHash = route.params?.hash || null;
    const givenUser = route.params?.user || null;
    const [state, setState] = useState({
        hash: givenHash,
        firstName: givenUser?.firstName || '',
        middleName: givenUser?.middleName || '',
        lastName: givenUser?.lastName || '',
        email: givenUser?.email || '',
        phone: givenUser?.phone || '',
        dob: givenUser?.dob || '',
        pronouns: givenUser?.pronouns || '',
        removableError: '',
        removableInfo: '',
    });
    const updateStateObject = (vals) => {
        setState({
            ...state,
            ...vals,
        });
    };
    const update = () => {
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
                const returnData = {
                    firstName: state.firstName,
                    middleName: state.middleName,
                    lastName: state.lastName,
                    email: state.email,
                    dob: state.dob,
                    phone: state.phone,
                    pronouns: state.pronouns
                }
                navigation.navigate("Account Info", { hash: state.hash, user: returnData, info: 'Account info updated!' });
            } else if (data[0] != null) {
                if (Array.isArray(data)) {
                    var formated = data.join(" ");
                    console.log(formated)
                    updateStateObject({ removableError: formated })
                } else {
                    updateStateObject({ removableInfo: data })
                }
            }
        }, state.hash, formatedData)
    }
    function validate(value) {
        return value.length < 1 ? "Required" : "";
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
        <View style={styles.page}>
            <View style={styles.panel}>
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
                {RemovableError(state.removableError, updateStateObject)}
                {RemovableInfo(state.removableInfo, updateStateObject)}
                <Button
                    buttonStyle={styles.buttons}
                    title="Update"
                    onPress={() => {
                        update();
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

export default UpdateAccountScreen;