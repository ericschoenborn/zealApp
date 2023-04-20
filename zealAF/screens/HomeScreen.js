import {
    TouchableHighlight,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    SafeAreaView,
} from "react-native";
import { Image } from "react-native-elements";
import React, { useEffect, useState } from "react";
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import 'rsuite/styles/index.less';
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
    const GoogleMapConfig = {
        key: "AIzaSyC_4VNhymJHcZwEJa-W458jZSifJUA508M",
        libraries: 'places',
    };
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
    const logo = require('../assets/zeal.png');
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
        <View style={{ flex: 1, alignItems: 'center' }}>
            <View style={{ flex: 1, maxWidth: 500, backgroundColor: 'white', minWidth: 300, alignItems: 'center' }}>
                <Button
                    buttonStyle={[styles.button, styles.right]}
                    title="Go To Map"
                    onPress={() => {
                        navigation.navigate("Location", { hash: state.loginHash });
                    }}
                />
                <Image
                    style={{ height: 50, width: 120 }}
                    source={logo}
                />
                <SafeAreaView style={{ flex: 1 }}>
                    <FlatList
                        extraData={state}
                        data={state.merchandise}
                        renderItem={renderItem}
                    />
                </SafeAreaView>
            </View>
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
    container: {
        flex: 1,
        paddingTop: 22,
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fonSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    }
});

export default HomeScreen;