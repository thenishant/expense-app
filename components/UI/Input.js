import {StyleSheet, Text, TextInput, View} from "react-native";
import {GlobalStyles} from "../../constansts/styles";

function Input({label, style, textInputConfig, inValid}) {

    const inputStyles = [styles.input]

    if (textInputConfig && textInputConfig.multiline) {
        inputStyles.push(styles.inputMultiline)
    }

    if (inValid) inputStyles.push(styles.invalidInput)

    return (<View style={[styles.inputContainer, style]}>
        <Text style={[styles.label, inValid && styles.invalidLabel]}>{label}</Text>
        <TextInput style={inputStyles} {...textInputConfig}/>
    </View>)
}

export default Input

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4, marginVertical: 8
    }, label: {
        fontSize: 14, color: GlobalStyles.colors.black700, marginBottom: 4
    }, input: {
        backgroundColor: GlobalStyles.colors.primary100,
        color: GlobalStyles.colors.primary700,
        padding: 6,
        borderRadius: 6,
        fontSize: 18
    }, inputMultiline: {
        minHeight: 100, textAlignVertical: "top"
    }, invalidLabel: {
        color: GlobalStyles.colors.error500
    }, invalidInput: {
        backgroundColor: GlobalStyles.colors.error50
    }
});
