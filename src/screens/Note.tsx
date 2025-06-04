import { Alert, Pressable, ScrollView, StyleSheet, View } from "react-native";
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
import { Header } from "../components/Header";
import moment from "moment";
import { formatCurrency } from "../helpers/formatCurrency";

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
        Alert.alert("Excluir nota", "Você tem certeza que deseja excluir essa nota?", [
            {
                text: "Cancelar",
                style: "cancel"
            },
            {
                text: "Excluir",
                style: "destructive",
                onPress: () => {
                    removeNoteFromVehicle(vehicleId, noteId);
                    Toast.success("Nota excluída com sucesso!");
                    navigation.goBack();
                }
            }
        ]);
    }


    function handleNavigateToEditNote() {
        navigation.navigate('FormNewNote', {
            vehicleId: vehicleId,
            noteId: noteId,
            toEdit: true,
        });
    }

    function handleBottomSheetMenu() {
        bottomSheetRef.current?.expand();
    }

    useFocusEffect(useCallback(() => {
        getNote();
        bottomSheetRef.current?.close();
    }, []));

    if (!noteState) {
        return <DefaultLoading />;
    }

    return (

        <SafeAreaView style={styles.safeAreaView}>
            <Header
                title={noteState.title}
                showDrawerMenuIcon={false}
                variant="secondary"
                hasOptions={true}
                optionsProps={{
                    onPress: handleBottomSheetMenu
                }}
            />
            <ScrollView
                style={styles.container}

            >
                <View style={styles.content}>
                    <DefaultText
                        text={noteState?.description}
                        fontSize="L"
                    />
                    <View
                        style={styles.footer}
                    >
                        {
                            noteState.price ?
                                <DefaultText
                                    text={formatCurrency(noteState.price)}
                                    weight="BOLD"
                                />
                                :
                                <DefaultText
                                    text=""
                                />
                        }
                        {
                            noteState.createdAt ?
                                <DefaultText
                                    text={String(moment(noteState.createdAt).format('DD/MM/YYYY'))}
                                    color="LIGHT_400"
                                    weight="LIGHT"
                                    fontSize="S"
                                />
                                :
                                <DefaultText
                                    text=""
                                />
                        }
                    </View>
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
                        onPress: handleNavigateToEditNote
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
    content: {
        backgroundColor: theme.COLORS.DARK_100,
        borderRadius: theme.MEASURES.BORDER_RADIUS,
        padding: theme.MEASURES.PADDING / 1.5,
        gap: theme.MEASURES.PADDING,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
});
