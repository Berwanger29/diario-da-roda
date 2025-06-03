import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import theme from "../theme/theme";
import { DefaultText } from "../components/DefaultText";
import { BackButton } from "../components/BackButton";
import { DefaultIcon } from "../components/DefaultIcon";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useCallback, useContext, useRef, useState } from "react";
import { VehiclesContext } from "../contexts/appContext";
import { VehicleNote } from "../@types/vehicleNote";
import { Toast } from "toastify-react-native";
import { DefaultBottomSheet } from "../components/DefaultBottomSheet"; // ajuste o caminho

import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DefaultLoading } from "../components/DefaultLoading";

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

    const bottomSheetRef = useRef<BottomSheet>(null);

    function getNote() {
        const res = findNoteById(vehicleId, noteId);
        setNoteState(res);
    }

    function handleDeleteNote() {
        removeNoteFromVehicle(vehicleId, noteId);
        Toast.success("Nota removida com sucesso!");
        navigation.goBack();
    }

    function handleBottomSheetMenu() {
        bottomSheetRef.current?.expand();
    }

    useFocusEffect(useCallback(() => {
        getNote();
    }, []));

    if (!noteState) {
        return <DefaultLoading />;
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={styles.safeAreaView}>
                <ScrollView style={styles.container}>
                    <View style={styles.header}>
                        <BackButton />
                        <Pressable onPress={handleBottomSheetMenu}>
                            <DefaultIcon
                                name="DotsThree"
                                weight="bold"
                                size={30}
                            />
                        </Pressable>
                    </View>

                    <View style={styles.content}>
                        <DefaultText text={noteState?.title} />
                    </View>
                </ScrollView>


                <DefaultBottomSheet
                    ref={bottomSheetRef}
                    options={[
                        {
                            iconName: "Trash",
                            label: "Excluir",
                            onPress: handleDeleteNote
                        },
                        {
                            iconName: "PencilSimpleLine",
                            label: "Editar",
                            onPress: () => { }
                        },
                        
                    ]}
                />
            </SafeAreaView>
        </GestureHandlerRootView>
    );
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
});
