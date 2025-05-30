import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../components/Header";
import { ScrollView, StyleSheet, View } from "react-native";
import { DefaultText } from "../components/DefaultText";
import theme from "../theme/theme";
import { AddButton } from "../components/Addbutton";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { CardNote } from "../components/CardNote";
import { CardCarInfo } from "../components/CardCarInfo";
import { CardAdBanner } from "../components/CardAdBanner";
import { useCallback, useContext, useState } from "react";
import { Vehicle } from "../@types/vehicle";
import { VehiclesContext } from "../contexts/appContext";
import { DefaultLoading } from "../components/DefaultLoading";

interface RouteParams {
  vehicleId: string;
}


export function VehicleNotes() {
    const route = useRoute();
    const { vehicleId } = route.params as RouteParams;
    const [vehicleState, setVehicleState] = useState<Vehicle | null>(null);
    const { findById } = useContext(VehiclesContext);

    function getVehicle() {
        const res = findById(vehicleId);
        setVehicleState(res);
        console.log(res)
    }

    useFocusEffect(useCallback(() => {
        console.log("id do veículo -> ", vehicleId)
        getVehicle();
    }, []));

    if (!vehicleState) {
        return <DefaultLoading />;
    }

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <Header
                title={vehicleState?.vehicleNickname}
                hasFilter
            />
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.scrollViewContentContainer}
            >
                <CardCarInfo />
                <DefaultText
                    text="Anúncio"
                    fontSize="S"
                    weight="LIGHT"
                    color="LIGHT_400"
                    style={{ alignSelf: "center" }}
                />
                <CardAdBanner />
                <DefaultText
                    text="Notas"
                    fontSize="S"
                    weight="LIGHT"
                    color="LIGHT_400"
                    style={{ alignSelf: "center" }}
                />
                <CardNote />
                <CardNote />
                <CardNote />
                <CardNote />
            </ScrollView>

            <AddButton />
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: theme.COLORS.DARK,
    },
    container: {
        flex: 1,
        padding: theme.MEASURES.PADDING,
    },
    scrollViewContentContainer: {
        gap: 15
    }
})