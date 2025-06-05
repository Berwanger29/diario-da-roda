import { ScrollView, StyleSheet, View } from "react-native";
import { DefaultText } from "../../components/DefaultText";
import theme from "../../theme/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../../components/Header";



export function CreateAccount() {
    return (
        <SafeAreaView
            style={styles.container}
        >
            <Header
                title="Criar conta"
                variant="secondary"
                showDrawerMenuIcon={false}
                hasOptions={false}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.scrollView}
                contentContainerStyle={styles.scrollViewContent}
            >

                <DefaultText
                    text=" Criar conta"
                    weight="BOLD"
                    fontSize="XL"
                    style={{
                        alignSelf: "center",
                    }}
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
        padding: theme.MEASURES.PADDING
    }
})