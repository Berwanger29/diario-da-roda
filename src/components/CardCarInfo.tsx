import { StyleSheet, TouchableOpacity, View } from "react-native";
import theme from "../theme/theme";
import { DefaultText } from "./DefaultText";
import { Image } from "expo-image";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import image from "../assets/onix_1.png";
import { InputImageProps } from "../screens/NewVehicle";
import { use, useCallback, useContext, useState } from "react";
import { VehiclesContext } from "../contexts/appContext";
import { Vehicle } from "../@types/vehicle";
import { DefaultLoading } from "./DefaultLoading";
import { Toast } from "toastify-react-native";

type Props = {
    imageUri: InputImageProps["uri"];
    onPress?: () => void;
}

export function CardCarInfo({ imageUri, onPress }: Props) {

    const blurHash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

    return (
        <TouchableOpacity
            style={styles.container}
            // activeOpacity={theme.CONSTANTS.activeOpacity}
            // onPress={onPress}
            activeOpacity={1}
            onPress={()=>{}}
        >
            <View
                style={styles.imageContiner}
            >
                <Image
                    source={imageUri}
                    placeholder={blurHash}
                    style={styles.image}
                />
            </View>
            <View
                style={styles.bar}
            >
                <DefaultText
                    text="18/19"
                    weight="BOLD"
                />
                <DefaultText
                    text="91.028km"
                    weight="BOLD"
                />
                <DefaultText
                    text="102cv"
                    weight="BOLD"
                />
            </View>
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