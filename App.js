import {StatusBar} from 'expo-status-bar';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';

export default function App() {
    return (<View style={styles.appContainer}>
        <View style={styles.inputContainer}>
            <TextInput style={styles.textInput} placeholder={'Add you goal'}></TextInput>
            <Button title={'Add Goal'}></Button>
        </View>
        <View>
            <Text>Your goal...</Text>
        </View>
    </View>);
}

const styles = StyleSheet.create({
    appContainer: {
        padding: 50
    }, inputContainer: {
        flexDirection: "row", justifyContent: "space-between"
    }, textInput: {
        borderColor: '#cccccc', borderWidth: 1, width: '80%', marginRight: 8, padding: 8
    }
});
