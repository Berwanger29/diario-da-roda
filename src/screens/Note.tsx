import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import theme from "../theme/theme";
import { DefaultText } from "../components/DefaultText";
import { BackButton } from "../components/BackButton";
import { DefaultIcon } from "../components/DefaultIcon";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useCallback, useContext, useState } from "react";
import { VehiclesContext } from "../contexts/appContext";
import { Vehicle } from "../@types/vehicle";
import { DefaultLoading } from "../components/DefaultLoading";
import { VehicleNote } from "../@types/vehicleNote";

interface RouteParams {
    vehicleId: string;
    noteId: string;
}

export function Note() {

    const navigation = useNavigation();
    const route = useRoute();
    const { vehicleId, noteId } = route.params as RouteParams;
    const [noteState, setNoteState] = useState<VehicleNote | null>(null);
    const { findNoteById, removeNoteFromVehicle } = useContext(VehiclesContext);

    function getNote() {
        console.log("id do veículo dentro da tela Note: ", vehicleId)
        const res = findNoteById(vehicleId, noteId);
        setNoteState(res);
    }

    function handleDeleteNote() {
        removeNoteFromVehicle(vehicleId, noteId);
        navigation.goBack();
    }

    useFocusEffect(useCallback(() => {
        getNote();
    }, []));

    if (!noteState) {
        return <DefaultLoading />;
    }

    return (
        <SafeAreaView
            style={styles.safeAreaView}
        >
            <ScrollView
                style={styles.container}
            >
                <View
                    style={styles.header}
                >
                    <BackButton />
                    <Pressable
                        onPress={handleDeleteNote}
                    >
                        <DefaultIcon
                            name="DotsThree"
                            weight="bold"
                            size={30}
                        />
                    </Pressable>
                </View>

                <View
                    style={styles.content}
                >
                    <DefaultText
                        text={noteState?.title}
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
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: theme.MEASURES.PADDING
    },
    content: {
        backgroundColor: theme.COLORS.DARK_100,
        borderRadius: theme.MEASURES.BORDER_RADIUS,
        padding: theme.MEASURES.PADDING / 1.5
    }
})