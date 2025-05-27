import { ScrollView, StyleSheet, View } from "react-native";
import theme from "../theme/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { DefaultText } from "../components/DefaultText";
import { SelectableTag } from "../components/SelectableTag";
import { IconName } from "../@types/iconName";
import { useState } from "react";

type InputVehicleTypeProps = 'CAR' | 'MOTORCYLE' | 'TRUCK' | null

//[X] - tipo de veículo (carro, moto, caminhão)
//[] - imagem 
//[] - apelido do veículo
//[] - ano
//[] - marca
//[] - nome do modelo

const vehicles = [
    {
        type: 'carro',
        iconName: 'Car'
    },
    {
        type: 'moto',
        iconName: 'Motorcycle'
    },
    {
        type: 'caminhão',
        iconName: 'Truck'
    }
]



export function NewVehicle() {

    const [vehicleType, setVehicleType] = useState<InputVehicleTypeProps>();
    const [isSelected, setIsSelected] = useState(false);

    function handleVehicleTypeChange(type: InputVehicleTypeProps) {
        setVehicleType(type);
    }

    return (
        <SafeAreaView
            style={styles.safeAreaContainer}
        >
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.scrollViewContentContainerStyle}
            >
                {/* [X] - tipo de veículo (carro, moto, caminhão) */}
                <View
                    style={styles.inputContainer}
                >
                    <DefaultText
                        text="Selecione o tipo do seu vecíulo"
                        weight="MEDIUM"
                        fontSize="L"
                    />
                    {
                        vehicles.map((e) => (
                            <SelectableTag
                                key={e.type}
                                label={e.type}
                                iconName={e.iconName as IconName}
                                isSelected={isSelected && vehicleType === e.type}
                                onPress={() => {
                                    setIsSelected(true);
                                    handleVehicleTypeChange(e.type as InputVehicleTypeProps);
                                }}
                            />
                        ))
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: theme.COLORS.DARK,
    },
    container: {
        flex: 1,
    },
    scrollViewContentContainerStyle: {
        padding: theme.MEASURES.PADDING
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: theme.COLORS.LIGHT_400,
        borderStyle: 'solid',
    }
})