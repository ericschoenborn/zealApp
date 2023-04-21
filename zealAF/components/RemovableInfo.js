import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { Button } from '@rneui/themed';
import { FontAwesome } from '@expo/vector-icons';

export const RemovableInfo = (text, update) => {
    if (text && text.length > 1) {
        return (
            <Button
                buttonStyle={styles.button}
                containerStyle={styles.buttonContainer}
                onPress={() => {
                    update({ removableInfo: '' });
                }}
            >
                {text}
                <FontAwesome name="remove" size={24} color="white" />
            </Button>
        )
    }
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#02f0e9',
        margin: 0,
        padding: 5,
        justifyContent: 'space-between',
        flex: 1
    },
    buttonContainer: {
        width: '100%',
        margin: 0
    }
});

