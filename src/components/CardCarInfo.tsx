import { StyleSheet, TouchableOpacity, View } from "react-native";
import theme from "../theme/theme";
import { DefaultText } from "./DefaultText";
import { Image } from "expo-image";
import { InputImageProps } from "../screens/NewVehicle";
import { formatCurrency } from "../helpers/formatCurrency";

type Props = {
    imageUri: InputImageProps["uri"];
    totalAmountSpend?: number;
    onPress?: () => void;
}

export function CardCarInfo({ imageUri, totalAmountSpend, onPress }: Props) {

    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={1}
            onPress={() => { }}
        >
            <View
                style={styles.imageContiner}
            >
                <Image
                    source={imageUri}
                    style={styles.image}
                />
            </View>

            {typeof totalAmountSpend === 'number' &&
                <View style={styles.bar}>
                    <DefaultText text={`${formatCurrency(totalAmountSpend)} gastos`} />
                </View>
            }


        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.COLORS.DARK_100,
        borderRadius: theme.MEASURES.BORDER_RADIUS,
        overflow: "hidden",
    },
    imageContiner: {
        flex: 1,
        maxHeight: 180,
    },
    image: {
        width: "100%",
        height: "100%",
    },
    bar: {
        flexDirection: "row",
        flex: 1,
        height: 60,
        alignItems: "center",
        justifyContent: "space-around",
    }
})