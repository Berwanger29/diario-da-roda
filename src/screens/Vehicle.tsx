import { ScrollView, StyleSheet, View } from "react-native";
import theme from "../theme/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { DefaultText } from "../components/DefaultText";
import { BackButton } from "../components/BackButton";
import { Header } from "../components/Header";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useCallback, useContext, useRef, useState } from "react";
import { VehiclesContext } from "../contexts/appContext";
import { Vehicle as VehicleTpe } from "../@types/vehicle";
import { Toast } from "toastify-react-native";
import { DefaultLoading } from "../components/DefaultLoading";
import { Image } from "expo-image";
import { DefaultBottomSheet } from "../components/DefaultBottomSheet";
import BottomSheet from "@gorhom/bottom-sheet";

export function Vehicle() {

    const route = useRoute();
    const navigation = useNavigation();

    const { vehicleId } = route.params as { vehicleId: string };
    const { findById } = useContext(VehiclesContext);

    const bottomSheetRef = useRef<BottomSheet>(null);

    const [vehicleState, setVehicleState] = useState<VehicleTpe | null>(null);

    function handleBottomSheetMenu() {
        if (bottomSheetRef.current) {
            bottomSheetRef.current.expand();
        } else {
            console.error("bottomSheetRef.current está undefined");
        }
    }

    function handleEditVehicle() {
        navigation.navigate('MyDrawer', {
            screen:'NewVehicle',
            params: {
                vehicleId: vehicleState!.id
            }   
        });
    }

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
                hasOptions
                variant="secondary"
                optionsProps={{
                    onPress: handleBottomSheetMenu
                }}
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
                    <View
                        style={styles.imageContainer}
                    >
                        <Image
                            source={vehicleState.image}
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                        />
                    </View>

                    <DefaultText
                        text="Carro XYZ"
                    />
                </View>
            </ScrollView>
            <DefaultBottomSheet
                ref={bottomSheetRef}
                options={[
                    {
                        iconName: "PencilSimpleLine",
                        label: "Editar",
                        onPress: handleEditVehicle
                    },
                ]}
            />
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
    },
    imageContainer: {
        width: "100%",
        height: 300,
        borderRadius: theme.MEASURES.BORDER_RADIUS,
        overflow: "hidden",
    }
})