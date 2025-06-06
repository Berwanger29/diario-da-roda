import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { DefaultText } from "../../components/DefaultText";
import theme from "../../theme/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../../components/Header";
import { DefaultTextInput } from "../../components/DefaultTextInput";
import { useContext, useState } from "react";
import { DefaultButton } from "../../components/DefaultButton";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../contexts/AuthContext";



export function Login() {

    const navigation = useNavigation()
    const { login } = useContext(AuthContext)

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleLogin() {
        login()
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

                <Pressable
                    onPress={() => navigation.navigate("RecoveryPassword")}
                >
                    <DefaultText
                        text="Esqueci minha senha"
                        fontSize="S"
                        weight="BOLD"
                        style={{
                            textAlign: "center",
                            marginTop: theme.MEASURES.PADDING / 2,
                            color: "#999"
                        }}
                    />
                </Pressable>

                <View
                    style={{
                        flex: 1
                    }}
                />
                <DefaultButton
                    label="Entrar"
                    onPress={handleLogin}
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