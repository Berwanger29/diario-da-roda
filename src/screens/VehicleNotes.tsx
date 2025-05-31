import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../components/Header";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
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
import { EmptyList } from "../components/EmptyList";

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
    }

    useFocusEffect(useCallback(() => {
        getVehicle();
    }, []));

    if (!vehicleState) {
        return <DefaultLoading />;
    }

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <Header
                title={vehicleState?.vehicleNickname}
                hasOptions
                optionsProps={{
                    onPress: () => { }
                }}
            />
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.scrollViewContentContainer}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
            >
                <CardCarInfo
                    imageUri={vehicleState.image.uri}
                />
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
                <FlatList
                    data={vehicleState.notes}
                    renderItem={({ item }) => <CardNote
                        key={item.id}
                        noteId={item.id}
                        vehicleId={vehicleId}
                        title={item.title}
                        description={item.description}
                        price={item.price}
                        date={item.createdAt}
                    />}
                    scrollEnabled={false}
                    style={styles.flatListContainer}
                    contentContainerStyle={styles.flatListContentContainer}
                    ListEmptyComponent={() => <EmptyList />}
                />
            </ScrollView>
            <AddButton
                vehicledId={vehicleState.id}
            />
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
        gap: 15,
        paddingBottom: 100
    },
    flatListContainer: {
        flex: 1,
    },
    flatListContentContainer: {
        gap: 15
    }
})