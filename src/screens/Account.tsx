import { SafeAreaView, StyleSheet, View } from "react-native";
import theme from "../theme/theme";
import { DefaultText } from "../components/DefaultText";
import { Header } from "../components/Header";
import { DefaultButton } from "../components/DefaultButton";
import { storage } from "../storage/mmkvStorage";


export function Account() {

    function handleDeleteAllVehicles(){
        storage.clearAll()
        console.log('deletado')
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
                    label="Deletar todos os veículos"
                    onPress={handleDeleteAllVehicles}
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