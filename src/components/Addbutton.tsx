import { Pressable, View } from "react-native";
import theme from "../theme/theme";
import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation } from "@react-navigation/native";

type Props = {
    vehicledId: string
}

export function AddButton({ vehicledId }: Props) {

    const navigation = useNavigation();

    const circleDimensions = 60

    return (
        <Pressable
            onPress={() => navigation.navigate("FormVehicle", {
                vehicleId: vehicledId
            })}
            style={{
                width: circleDimensions,
                height: circleDimensions,
                borderRadius: circleDimensions / 2,
                position: "absolute",
                right: 30,
                bottom: 40,
                backgroundColor: theme.COLORS.PRIMARY,

            }}
        >
            <View
                style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    backgroundColor: theme.COLORS.PRIMARY,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Entypo name="plus" size={36} color={theme.COLORS.LIGHT} />
            </View>
        </Pressable>
    )
}