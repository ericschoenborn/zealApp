import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import HomeScreen from "./screens/HomeScreen";
import LogInScreen from './screens/LogInScreen';
import NewAccountScreen from './screens/NewAccountScreen';
import RecoverAccountScreen from './screens/RecoverAccountScreen';
import PasswordResetScreen from './screens/PasswordResetScreen';
import AccountInfoScreen from './screens/AccountInfoScreen';
import UpdateAccountScreen from './screens/UpdateAccountScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={navStyling}>
        <Stack.Screen name="Zeal Areal Fitness" component={HomeScreen} />
        <Stack.Screen name="Login" component={LogInScreen} />
        <Stack.Screen name="New Account" component={NewAccountScreen} />
        <Stack.Screen name="Account Recovery" component={RecoverAccountScreen} />
        <Stack.Screen name="Password Reset" component={PasswordResetScreen} />
        <Stack.Screen name="Account Info" component={AccountInfoScreen} />
        <Stack.Screen name="Update Account" component={UpdateAccountScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const navStyling = {
  headerStyle: {
    backgroundColor: "#14A99D",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
  },
};
