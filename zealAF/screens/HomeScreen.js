import {
    TouchableHighlight,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { Message } from 'rsuite';
import 'rsuite/styles/index.less';
import { useIdleTimer } from 'react-idle-timer';
import { getMerchandise, getMerchandiseData } from "../api/ZealAfTestRequest";
import { Button } from '@rneui/themed';

const HomeScreen = ({ route, navigation }) => {
    const getHash = () => {
        const hash = JSON.parse(localStorage.getItem('hash'));
        if (hash) {
            console.log(hash);
            var oneHour = 60 * 60 * 1000;
            const nows = new (Date);
            if ((nows - new Date(hash.now)) > oneHour) {
                console.log('clear');
                localStorage.clear();
            } else {
                console.log(`hash`);
                return hash.hash;
            }
        }
    }
    const [state, setState] = useState({
        loginHash: getHash(),
        merchandise: null,
        selected: null,
    });
    const updateStateObject = (vals) => {
        setState({
            ...state,
            ...vals,
        });
    };
    useEffect(() => {
        getMerchandise((data) => {
            if (data == null) {
                console.log('oopes');
            } else if (data[0] != null) {
                console.log('eeeh');
                console.log(data)
                updateStateObject({ merchandise: data })
            } else {
                const userData = data[1];
                console.log(userData);
                // const formatedData = {
                //     firstName: userData['firstName'],
                //     middleName: userData['middleName'],
                //     lastName: userData['lastName'],
                //     email: userData['email'],
                //     dob: userData['dob'],
                //     phone: userData['phone'],
                //     pronouns: userData['pronouns']
                // }
                // console.log(formatedData);
                //updateStateObject({ user: formatedData });
            }
        })
    }, []);
    useEffect(() => {
        if (route.params?.loginHash) {
            var now = new (Date);
            const hash = route.params.loginHash;
            localStorage.setItem('hash', JSON.stringify({ hash, now }));
            updateStateObject({ loginHash: route.params.loginHash })
        }
    }, [route.params?.loginHash]);

    useEffect(() => {
        if (route.params?.logOut) {
            updateStateObject({ loginHash: null, loginTime: null })
        }
    }, [route.params?.logOut]);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                UserAccountStatus()
            ),
        });
    });
    const UserAccountStatus = () => {
        if (state.loginHash != null) {
            return (
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("Account Info", { hash: state.loginHash });
                    }}
                >
                    <MaterialIcons name="account-circle" size={24} color="white" />
                </TouchableOpacity>
            );
        }
        // const onIdle = () => {
        //     console.log('fires after 10 minutes');
        //     updateStateObject({ loginHash: null, loginTime: null })
        //     getRemainingTime = null;
        //     //insert any custom logout logic here
        // }

        // var { getRemainingTime } = useIdleTimer({
        //     onIdle,
        //     timeout: 10 * 1000, //10 minute idle timeout
        // })

        return (
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Login");
                }}
            >
                <Entypo name="login" size={24} color="white" />
            </TouchableOpacity>
        );
    }
    const getMerchData = (id) => {
        getMerchandiseData((data) => {
            if (data == null) {
                console.log('oopes');
            } else if (data[0] == null) {
                console.log('eeeh');
                console.log(data[1])
                updateStateObject({ selected: data[1] })
            }
        }, id);
    }
    const renderItem = ({ index, item }) => {
        console.log(`myId: ${state.selected} yours: ${item[0]}`);
        if (state.selected && item[0] == state.selected.id) {
            return (
                <TouchableHighlight
                    onPress={() => { updateStateObject({ selected: null }); localStorage.clear() }}
                >
                    <View style={styles.listButton}>
                        <Text style={{ fonstSize: '30 px' }}>Name: {state.selected.name}</Text>
                        <Text style={{ fonstSize: '20 px' }}>Desc: {state.selected.description}</Text>
                        <View style={styles.row}>
                            <Text style={{ fonstSize: '18 px' }}>Cost: {state.selected.cost}$</Text>
                            <Text style={{ fonstSize: '18 px' }}>Remaining: {state.selected.quantity}</Text>
                        </View>
                        <View style={styles.row}>
                            <Button
                                buttonStyle={styles.button}
                                title="Close"
                                onPress={() => { updateStateObject({ selected: null }) }}
                            />
                            <Button
                                buttonStyle={[styles.button, styles.right]}
                                title="Purchase"
                                onPress={() => {
                                    if (state.loginHash) {
                                        alert("Sorry, this is out of order");
                                    } else {
                                        alert("Please login to purchase")
                                    }
                                }}
                            />
                        </View>
                    </View>
                </TouchableHighlight>
            )
        } else {
            return (
                <TouchableHighlight
                    onPress={() => {
                        console.log(item)
                        getMerchData(item[0])
                    }}
                >
                    <View style={styles.listButton}>
                        <Text style={{ fonstSize: '30 px' }}>End: {item[1]}</Text>
                    </View>
                </TouchableHighlight>
            )
        }
    }

    return (
        <View>
            <Message type="success" closable>
                This is Success Messages
            </Message>
            <Text>Work has Started</Text>
            <SafeAreaView style={{ flex: 1 }}>
                <FlatList
                    extraData={state}
                    data={state.merchandise}
                    renderItem={renderItem}
                />
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    listButton: {
        backgroundColor: '#DDDDDD',
        padding: 10,
        margin: 10,
    },
    row: {
        flexDirection: "row",
        width: '100%',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#14A99D',
        margin: 10,
        borderRadius: 10,
    },
    date: {
        fontStyle: "italic",
        textAlign: "right",
        fonstSize: 8,
    },
    list: {
        Height: "50%",
    },
});

export default HomeScreen;

// popup idea
// import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';
// <Popup trigger={<button> Trigger</button>} position="right center">
//                 <div>Popup content here !!</div>
//             </Popup>