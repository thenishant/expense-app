import {StyleSheet, View} from 'react-native';
import CardSection from "./screens/sections/CardSection";

export default function App() {
    return (
        <View style={styles.fullsScreen}>
            <CardSection/>
        </View>
    )
}

const styles = StyleSheet.create({
    fullsScreen: {backgroundColor: '#f1faee', flex: 1}
});
