import { StyleSheet, View } from "react-native";

import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import theme from "../../theme/theme";
import { DefaultButton } from "../../components/DefaultButton";
import { Image } from "expo-image";

import logoImage from "../../assets/images/logo.png"
import { DefaultText } from "../../components/DefaultText";
import { useNavigation } from "@react-navigation/native";


export function Welcome() {

    const insets = useSafeAreaInsets()
    const navigation = useNavigation()

    function handleNavigateToLogin() {
        navigation.navigate("Login")
    }

    function handleNavigateToCreateAccount() {
        navigation.navigate("CreateAccount")
    }


    return (

        <View
            style={styles.container}
        >
            <View
                style={[styles.upContainer, { paddingTop: insets.top  }]}
            >
                <View
                    style={styles.logoContainer}
                >
                    <View
                        style={styles.logoImageContainer}
                    >
                        <Image
                            source={logoImage}
                            style={styles.logoImage}
                        />
                    </View>

                    <DefaultText
                        text={`Bem-vindo ${'\n'}ao${'\n'} Diário da Roda`}
                        color="DARK"
                        fontSize="XXL"
                        weight="BOLD"
                        style={{
                            textAlign: "center",
                            paddingHorizontal: theme.MEASURES.PADDING,
                        }}
                    />

                </View>



                <DefaultText
                    text="Tenha todo o histórico do seu veículo na palma da sua mão"
                    weight="BOLD"
                    color="DARK"
                    fontSize="L"
                    style={{
                        textAlign: "center",
                        paddingHorizontal: theme.MEASURES.PADDING,
                    }}
                />
            </View>
            <View
                style={[styles.bottomContainer, { paddingBottom: insets.bottom + 20 }]}
            >
                <DefaultButton
                    label="Entrar"
                    onPress={handleNavigateToLogin}
                />
                <DefaultButton
                    label="Criar conta"
                    onPress={handleNavigateToCreateAccount}
                />
            </View>
        </View >

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: theme.COLORS.DARK,
    },
    upContainer: {
        flex: 1,
        backgroundColor: theme.COLORS.PRIMARY,
        paddingVertical: theme.MEASURES.PADDING * 2,
        justifyContent:"space-between",
    },
    bottomContainer: {
        gap: 20,
        backgroundColor: theme.COLORS.DARK,
        padding: theme.MEASURES.PADDING,
        paddingVertical: theme.MEASURES.PADDING * 2,
    },
    logoContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    logoImageContainer: {
        width: 150,
        height: 150,
        alignItems: "center",
        justifyContent: "center",
    },
    logoImage: {
        width: "100%",
        height: "100%",
    }
})