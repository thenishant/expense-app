import {Pressable, StyleSheet, Text, View} from "react-native";
import {GlobalStyles} from "../../constansts/styles";

function Button({children, onPress, mode, style}) {
    return (<View style={style}>
        <Pressable onPress={onPress} style={({pressed}) => pressed && styles.pressed}>
            <View style={[styles.button, mode === 'flat' && styles.flat]}>
                <Text style={[styles.buttonText, mode === 'flat' && styles.flatText]}>{children}</Text>
            </View>
        </Pressable>
    </View>)
}

export default Button

const styles = StyleSheet.create({
    button: {
        borderRadius: 4, padding: 8, backgroundColor: GlobalStyles.colors.primary500, marginTop: 8
    }, flat: {
        backgroundColor: 'transparent'
    }, buttonText: {
        color: "white", textAlign: 'center', fontSize: 17
    }, flatText: {
        color: GlobalStyles.colors.primary700,
    }, pressed: {
        opacity: 0.75, backgroundColor: 'transparent', borderRadius: 4,
    }
});