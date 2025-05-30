import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import theme from "../theme/theme";
import { DefaultText } from "../components/DefaultText";
import { BackButton } from "../components/BackButton";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { Vehicle } from "../@types/vehicle";
import { VehiclesContext } from "../contexts/appContext";
import { DefaultTextInput } from "../components/DefaultTextInput";
import { DefaultButton } from "../components/DefaultButton";
import { VehicleNote } from "../@types/vehicleNote";

export function FormVehicle() {

    const navigation = useNavigation()
    const route = useRoute()
    const { vehicleId } = route.params as { vehicleId: string }

    const { findById, addNoteToVehicle } = useContext(VehiclesContext)

    const [vehicleState, setVehicleState] = useState<Vehicle | null>(null);
    const [noteTitle, setNoteTitle] = useState('');
    const [noteDescription, setNoteDescription] = useState('');
    const [notePrice, setNotePrice] = useState<number | null>();

    function getVehicle() {
        const res = findById(vehicleId)
        setVehicleState(res)
    }

    function handleSaveForm() {

        let newNote: Omit<VehicleNote, 'id' | 'createdAt' | 'updatedAt' | 'vehicleId'> = {
            title: noteTitle,
            description: noteDescription,
            price: notePrice
        }

        addNoteToVehicle(vehicleState!.id, newNote)
        navigation.goBack()
    }

    useEffect(() => {
        getVehicle()
    }, [])

    return (
        <SafeAreaView
            style={styles.container}
        >
            <ScrollView
                style={styles.scrollViewContainer}
                contentContainerStyle={styles.contetContainerStyle}
            >
                <BackButton />
                <DefaultText
                    text="Adicionar anotação"
                    weight="BOLD"
                    fontSize="XL"
                    color="LIGHT"
                    style={{
                        marginVertical: theme.MEASURES.PADDING / 2,
                    }}
                />
                <DefaultTextInput
                    text="Título"
                    placeholder={`"Manutenção"`}
                    onChangeText={setNoteTitle}
                    charMax={50}
                    charAmount={noteTitle.length}
                    value={noteTitle}
                />

                <DefaultTextInput
                    text="Descrição"
                    placeholder={`"Conserto do para-choque"`}
                    onChangeText={setNoteDescription}
                    value={noteDescription}
                    charMax={255}
                    charAmount={noteDescription.length}
                />

            </ScrollView>
            <DefaultButton
                label="Salvar"
                iconName="FloppyDisk"
                onPress={handleSaveForm}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.COLORS.DARK,
        paddingHorizontal: theme.MEASURES.PADDING,
    },
    scrollViewContainer: {
        flex: 1
    },
    contetContainerStyle: {
        gap: 10
    }
})