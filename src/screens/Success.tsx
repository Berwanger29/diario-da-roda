import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import theme from "../theme/theme";

import AnimationSuccess from "../assets/animations/AnimationSuccess.json"
import LottieView from "lottie-react-native";
import { useNavigation, useRoute, CommonActions } from "@react-navigation/native";
import { DefaultText } from "../components/DefaultText";

export function Success() {

    const navigation = useNavigation();
    const routes = useRoute()
    const { vehicleId } = routes.params as { vehicleId?: string }

    useEffect(() => {
        console.log("Vehicle ID:", vehicleId);
        setTimeout(() => {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        {
                            name: "MyDrawer",
                            state: {
                                routes: [
                                    { name: `VehicleNotes_${vehicleId}` },
                                ],
                            },
                        },
                    ],
                })
            );
        }, 1500);
    }, []);

    return (
        <SafeAreaView
            style={styles.container}
        >
            <DefaultText
                text="Veículo cadastrado com sucesso!"
                weight="BOLD"
                fontSize="XL"
                style={{
                    textAlign: 'center',
                }}
            />
            <LottieView
                source={AnimationSuccess}
                autoPlay
                loop={false}
                style={{
                    width: 300,
                    height: 300,
                }}
            />
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.COLORS.DARK,
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.MEASURES.PADDING
    }
})