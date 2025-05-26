import { Pressable, StyleSheet } from "react-native";

import Entypo from '@expo/vector-icons/Entypo';
import theme from "../theme/theme";
import { useNavigation } from "@react-navigation/native";

export function BackButton() {

    const navigation = useNavigation()

    return (
        <Pressable
            style={styles.container}
            onPress={()=> navigation.goBack()}
        >
            <Entypo name="chevron-left" size={25} color={theme.COLORS.PRIMARY} />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        width:50,
        height:50,
        borderRadius:10,
        // backgroundColor: theme.COLORS.PRIMARY,
    }
})