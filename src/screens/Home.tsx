import { StyleSheet, View } from "react-native";
import { DefaultText } from "../components/DefaultText";
import theme from "../theme/theme";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Header } from "../components/Header";
import { AddButton } from "../components/Addbutton";
import { useNavigation } from "@react-navigation/native";




export function Home() {

    const insets = useSafeAreaInsets()
    const navigation = useNavigation()

    return (
        <SafeAreaView
            style={styles.container}
        >
            <View 
                style={{
                    position: "absolute",
                    bottom: insets.bottom + 10,
                    right: insets.right + 30,
                    zIndex: 1,
                }}
            >
                <AddButton
                    onPress={() => navigation.navigate("FormVehicle")}
                />
            </View>
            <Header />
            {
                true && <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <DefaultText
                        text="Adicionar um veículo"
                    />
                </View>
            }

            {
                false && null
            }

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.COLORS.DARK,
        paddingHorizontal: theme.MEASURES.PADDING,
    }
})