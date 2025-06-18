import { ScrollView, StyleSheet, View } from "react-native";
import theme from "../../theme/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../../components/Header";
import { DefaultTextInput } from "../../components/DefaultTextInput";
import { useState } from "react";
import { DefaultButton } from "../../components/DefaultButton";
import { Toast } from "toastify-react-native";
import { api } from "../../services/axios";



export function CreateAccount() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleCreateAccount() {
        try {
            if (password !== confirmPassword) {
                Toast.error("As senhas não conferem");
                return;
            }
            setIsLoading(true);
            const response = await api.post("/users/", {
                email,
                password,
                confirmPassword
            })

            if (response.status === 201) {
                Toast.success("Verifique seu email para ativar sua conta");
            }

        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <SafeAreaView
            style={styles.container}
        >
            <Header
                title="Entrar na conta"
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
                    text="E-mail"
                    placeholder="Digite seu e-mail"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect={false}
                    returnKeyType="next"
                />

                <DefaultTextInput
                    value={password}
                    onChangeText={setPassword}
                    text="Senha"
                    placeholder="Digite sua senha"
                    secureTextEntry
                    autoCapitalize="none"
                    autoComplete="password"
                    autoCorrect={false}
                    returnKeyType="done"
                />
                <DefaultTextInput
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    text="Confirme sua senha"
                    placeholder="Digite sua senha novamente"
                    secureTextEntry
                    autoCapitalize="none"
                    autoComplete="password"
                    autoCorrect={false}
                    returnKeyType="done"
                />
                <View
                    style={{
                        flex: 1
                    }}
                />
                <DefaultButton
                    label="Entrar"
                    onPress={handleCreateAccount}
                    disabled={isLoading}
                    
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