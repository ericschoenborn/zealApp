import { StyleSheet, View } from "react-native";
import React from "react";
import { Button } from '@rneui/themed';

export const BaseButton = ({ title, onPress }) => {
    return <Button
        buttonStyle={styles.button}
        title={title}
        onPress={onPress}
    />;
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#14A99D',
        margin: 10,
        borderRadius: 10,
    },
});