import { ScrollView, StyleSheet, View } from "react-native";
import { DefaultText } from "../../components/DefaultText";
import theme from "../../theme/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../../components/Header";
import { DefaultTextInput } from "../../components/DefaultTextInput";
import { useState } from "react";
import { DefaultButton } from "../../components/DefaultButton";
import { Toast } from "toastify-react-native";



export function RecoveryPassword() {

    const [email, setEmail] = useState("");

    function handleRecoveryPassword() {
        Toast.success("E-mail enviado com sucesso.", "top", 3000)
    }

    return (
        <SafeAreaView
            style={styles.container}
        >
            <Header
                title="Recuperar senha"
                variant="secondary"
                showDrawerMenuIcon={false}
                hasOptions={false}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.scrollView}
                contentContainerStyle={styles.scrollViewContent}

            >
                <DefaultTextInput
                    onChangeText={setEmail}
                    value={email}
                    text="Digite seu e-mail para recuperação de senha"
                    placeholder="Digite seu e-mail"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect={false}
                    returnKeyType="next"
                />

                <View
                    style={{
                        flex: 1
                    }}
                />

                <DefaultButton
                    label="Recuperar senha"
                    onPress={handleRecoveryPassword}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.COLORS.DARK
    },
    scrollView: {
        flex: 1,
    },
    scrollViewContent: {
        flex: 1,
        padding: theme.MEASURES.PADDING,
        gap: theme.MEASURES.PADDING / 2,
    }
})