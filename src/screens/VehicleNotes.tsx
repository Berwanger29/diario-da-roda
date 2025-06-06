import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../components/Header";
import { Alert, FlatList, ScrollView, StyleSheet, View } from "react-native";
import { DefaultText } from "../components/DefaultText";
import theme from "../theme/theme";
import { AddButton } from "../components/Addbutton";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { CardNote } from "../components/CardNote";
import { CardCarInfo } from "../components/CardCarInfo";
import { CardAdBanner } from "../components/CardAdBanner";
import { Vehicle } from "../@types/vehicle";
import { VehiclesContext } from "../contexts/appContext";
import { DefaultLoading } from "../components/DefaultLoading";
import { EmptyList } from "../components/EmptyList";
import BottomSheet from '@gorhom/bottom-sheet';
import { DefaultBottomSheet, DefaultBottomSheetRefProps } from "../components/DefaultBottomSheet";
import { Toast } from "toastify-react-native";
import { VehicleNote } from "../@types/vehicleNote";


interface RouteParams {
    vehicleId: string;
}

export function VehicleNotes() {

    const navigation = useNavigation();
    const { findById, deleteVehicleById } = useContext(VehiclesContext);
    const route = useRoute();
    const { vehicleId } = route.params as RouteParams;

    const [vehicleState, setVehicleState] = useState<Vehicle | null>(null);
    const [totalAmountSpend, setTotalAmountSpend] = useState(0);


    const bottomSheetRef = useRef<BottomSheet & DefaultBottomSheetRefProps>(null);

    function getVehicle() {
        const res = findById(vehicleId);
        setVehicleState(res);
    }

    function handleEditVehicle() {
        navigation.navigate("EditVehicle", { vehicleId });
    }

    function handleDeleteVehicle() {
        Alert.alert("Excluir nota", "Você tem certeza que deseja excluir o veículo e todas as suas anotações. Esta ação não poderá ser desfeita.", [
            {
                text: "Cancelar",
                style: "cancel"
            },
            {
                text: "Excluir",
                style: "destructive",
                onPress: () => {
                    deleteVehicleById(vehicleId,);
                    Toast.success("Nota excluída com sucesso!");
                    navigation.goBack();
                }
            },
        ]);
    }

    function handleBottomSheetMenu() {
        if (bottomSheetRef.current) {
            bottomSheetRef.current.expand();
        } else {
            console.error("bottomSheetRef.current está undefined");
        }
    }

    function getTotalAmountSpendFromNotes() {
        if (vehicleState?.notes) {
            const notes = vehicleState?.notes;

            const total = notes.reduce((acc, e) => acc + e.price!, 0)

            setTotalAmountSpend(total)
        }
    }

    useEffect(() => {
        getTotalAmountSpendFromNotes()
    }, [vehicleState]);


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
                    onPress: handleBottomSheetMenu
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
                    totalAmountSpend={totalAmountSpend}
                // onPress={() => navigation.navigate("Vehicle", { vehicleId: vehicleState.id })}
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
                    // data={filteredNotes?.length > 0 ? filteredNotes : vehicleState.notes}
                    renderItem={({ item }) => (
                        <CardNote
                            key={item.id}
                            noteId={item.id}
                            vehicleId={vehicleId}
                            title={item.title}
                            description={item.description}
                            price={item.price}
                            date={item.createdAt}
                        />
                    )}
                    scrollEnabled={false}
                    style={styles.flatListContainer}
                    contentContainerStyle={styles.flatListContentContainer}
                    ListEmptyComponent={() => <EmptyList />}
                />
            </ScrollView>
            <AddButton
                vehicledId={vehicleState.id}
            />
            <DefaultBottomSheet
                ref={bottomSheetRef}
                options={[
                    {
                        iconName: "PencilSimpleLine",
                        label: "Editar veículo",
                        onPress: handleEditVehicle
                    },
                    // {
                    //     iconName: "Funnel",
                    //     label: "Filtrar",
                    //     onPress: () => { }
                    // },
                    {
                        iconName: "Trash",
                        label: "Excluir veículo",
                        onPress: handleDeleteVehicle
                    },

                ]}
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