import { StyleSheet, View } from "react-native";

import React from "react";

export const PanelScroll = ({ children }) => {
    return <View style={styles.page}>
        <View style={styles.panel}>
            {children}
        </View>
    </View>;
};

const styles = StyleSheet.create({
    page: {
        flex: 1,
        alignItems: 'center'
    },
    panel: {
        flex: 1,
        maxWidth: 800,
        backgroundColor: 'white',
        minWidth: 400,
        alignItems: 'center',
        overflow: 'scroll',
        overflowX: 'hidden'
    },
});