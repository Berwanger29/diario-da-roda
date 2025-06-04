import { ScrollView, StyleSheet, View } from "react-native";
import theme from "../theme/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { DefaultText } from "../components/DefaultText";
import { BackButton } from "../components/BackButton";
import { Header } from "../components/Header";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useCallback, useContext, useState } from "react";
import { VehiclesContext } from "../contexts/appContext";
import { Vehicle as VehicleTpe } from "../@types/vehicle";
import { Toast } from "toastify-react-native";
import { DefaultLoading } from "../components/DefaultLoading";

export function Vehicle() {

    const route = useRoute();
    const navigation = useNavigation();

    const { vehicleId } = route.params as { vehicleId: string };
    const { findById } = useContext(VehiclesContext);

    const [vehicleState, setVehicleState] = useState<VehicleTpe | null>(null);

    useFocusEffect(useCallback(() => {
        const vehicle = findById(vehicleId);
        if (!vehicle) {
            Toast.error("Veículo não encontrado");
            navigation.goBack();
            return;
        };
        setVehicleState(vehicle);
    }, []));

    if (!vehicleState) {
        return <DefaultLoading />
    }


    return (
        <SafeAreaView
            style={styles.safeAreaView}
        >
            <Header
                title={vehicleState.vehicleNickname}
                variant="secondary"
            />
            <ScrollView
                style={{
                    flex: 1
                }}
                contentContainerStyle={styles.scrollViewContentContainer}
                showsVerticalScrollIndicator={false}
            >
                <View
                    style={styles.container}
                >

                    <DefaultText
                        text="Carro XYZ"
                    />
                </View>
            </ScrollView>
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
        padding: theme.MEASURES.PADDING
    },
    scrollViewContentContainer: {
        flex: 1,
        gap: 15,
    }
})