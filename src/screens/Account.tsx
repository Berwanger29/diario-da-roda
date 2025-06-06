import { Alert, SafeAreaView, StyleSheet, View } from "react-native";
import theme from "../theme/theme";
import { DefaultText } from "../components/DefaultText";
import { Header } from "../components/Header";
import { DefaultButton } from "../components/DefaultButton";
import { storage } from "../storage/mmkvStorage";
import { useContext } from "react";
import { VehiclesContext } from "../contexts/appContext";
import { clearLoginState } from "../helpers/loginStorage";
import { AuthContext } from "../contexts/AuthContext";


export function Account() {

    // const { deleteAllVehicles } = useContext(VehiclesContext)
    const { logout } = useContext(AuthContext)

    function handleLogout() {
        Alert.alert(
            "Sair da conta",
            "Você tem certeza que deseja sair da conta?",
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "Sair",
                    style: "destructive",
                    onPress: () => {
                        logout()
                    }
                }
            ]
        )
    }

    return (
        <SafeAreaView
            style={styles.safeAreaView}
        >
            <Header
                title="Conta"
            />
            <View
                style={styles.container}
            >

                <DefaultButton
                    label="Sair da conta"
                    onPress={handleLogout}
                />

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: theme.COLORS.DARK,
    },
    container: {
        flex: 1,
        padding: theme.MEASURES.PADDING,
    }
})