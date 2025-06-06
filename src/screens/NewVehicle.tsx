import { Pressable, ScrollView, StyleSheet, TextInput, View } from "react-native";
import theme from "../theme/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { DefaultText } from "../components/DefaultText";
import { SelectableTag } from "../components/SelectableTag";
import { IconName } from "../@types/iconName";
import { use, useContext, useEffect, useState } from "react";
import { DefaultButton } from "../components/DefaultButton";
import * as ImagePicker from 'expo-image-picker';
import { Image } from "expo-image";
import { storage } from "../storage/mmkvStorage";
import uuid from 'react-native-uuid';
import { DrawerActions, useNavigation, useRoute } from "@react-navigation/native";
import { Header } from "../components/Header";
import { VehicleTypes } from "../@types/vehicleTypes";
import { VehiclesContext, VehiclesContextType } from "../contexts/appContext";
import { DefaultTextInput } from "../components/DefaultTextInput";
import { DefaultLoading } from "../components/DefaultLoading";
import { Toast } from "toastify-react-native";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';




export type InputImageProps = {
    fileName: string | null | undefined;
    uri: string;
}


//[X] - tipo de veículo (carro, moto, caminhão)
//[X] - imagem 
//[X] - apelido do veículo

//-----FIPE-----
//[] - marca
//[] - modelo
//[] - ano

const vehicleTypeOption = [
    {
        type: 'Carro',
        iconName: 'Car',
        fipeName: 'cars'
    },
    {
        type: 'Moto',
        iconName: 'Motorcycle',
        fipeName: 'motorcyles'
    },
    {
        type: 'Caminhão',
        iconName: 'Truck',
        fipeName: 'trucks'
    }
]

type RouteParams = {
    vehicleId?: string;
    toEdit?: boolean;
};


export function NewVehicle() {

    const vehicleNicknameMaxLength = 25;
    const mediaLibraryPermission = ImagePicker.useMediaLibraryPermissions()


    const route = useRoute();
    const { vehicleId, } = (route.params || {}) as RouteParams;
    const navigation = useNavigation()
    const { handleSaveVehicle } = useContext<VehiclesContextType>(VehiclesContext)

    const [vehicleType, setVehicleType] = useState<VehicleTypes | null>(null);
    const [isVehicleSelected, setIsVehicleSelected] = useState(false);
    const [selectedImage, setSelectedImage] = useState<InputImageProps>();
    const [vehicleNickname, setVehicleNickname] = useState('');
    const [finishButtonDisabled, setFinishButtonDisabled] = useState(true)
    const [isLoading, setIsLoading] = useState(true)


    function handleVehicleTypeChange(type: VehicleTypes) {
        setVehicleType(type);
    }

    function handleVehicleNicknameChange(nickname: string) {
        if (nickname.length <= vehicleNicknameMaxLength) {
            setVehicleNickname(nickname);
        } else {
            return
        }
    }

    function resetForm() {
        setVehicleType(null);
        setSelectedImage(undefined);
        setVehicleNickname('');
        setIsVehicleSelected(false);
        setFinishButtonDisabled(true);
    }


    async function handleGetImage() {
        const [status, requestPermission] = mediaLibraryPermission;

        if (status === null || !status.granted) {
            const permission = await requestPermission();
            if (!permission.granted) return;
        }

        const { assets } = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            allowsMultipleSelection: false,
            aspect: [4, 3],
            quality: 1,
        });

        if (assets && assets.length > 0) {
            const imageSelected = assets[0];
            setSelectedImage({
                fileName: imageSelected.fileName ?? uuid.v4().toString(),
                uri: imageSelected.uri,
            });
        }
    }

    function handleFinish() {
        if (!vehicleType || !selectedImage || !vehicleNickname) return;

        const res = handleSaveVehicle(vehicleType, selectedImage, vehicleNickname);
        navigation.navigate("Success", {
            vehicleId: res.id
        });
    }


    function handleToggleDrawer() {
        navigation.dispatch(DrawerActions.openDrawer());
    }


    useEffect(() => {
        if (vehicleId) {
            setIsLoading(true);
        } else {
            setIsLoading(false);
        }
    }, [vehicleId]);


    useEffect(() => {
        if (vehicleId) {
            setFinishButtonDisabled(false);
            return;
        }

        const canFinish = isVehicleSelected && selectedImage && vehicleNickname;
        setFinishButtonDisabled(!canFinish);
    }, [selectedImage, isVehicleSelected, vehicleNickname, vehicleId]);



    if (isLoading && vehicleId) {
        return <DefaultLoading />
    }

    return (
        <SafeAreaView
            style={styles.safeAreaContainer}
        >
            <Header
                title={vehicleId ? 'Editar' : 'Novo veículo'}
                showDrawerMenuIcon={vehicleId ? false : true}
            />

            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.scrollViewContentContainerStyle}
                showsVerticalScrollIndicator={false}
            >
                {/* [X] - tipo de veículo (carro, moto, caminhão) */}
                <View
                    style={styles.inputContainer}
                >
                    <DefaultText
                        text="Selecione o tipo do seu vecíulo"
                        weight="MEDIUM"
                        fontSize="L"
                        style={styles.inputLabel}
                    />
                    {
                        vehicleTypeOption.map((e) => (
                            <SelectableTag
                                key={e.type}
                                label={e.type}
                                iconName={e.iconName as IconName}
                                isSelected={isVehicleSelected && vehicleType === e.type}
                                onPress={() => {
                                    setIsVehicleSelected(true);
                                    handleVehicleTypeChange(e.type as VehicleTypes);
                                }}
                            />
                        ))
                    }
                </View>

                <View
                    style={styles.inputContainer}
                >
                    <DefaultText
                        text="Selecione uma imagem"
                        weight="MEDIUM"
                        fontSize="L"
                        style={styles.inputLabel}
                    />
                    {
                        selectedImage &&
                        <View
                            style={styles.imagePreviewContainer}
                        >
                            <Image
                                style={styles.imagePreview}
                                source={selectedImage.uri}
                            />
                        </View>
                    }
                    <DefaultButton
                        label={'Selecionar imagem'}
                        iconName="Image"
                        onPress={handleGetImage}
                    />
                </View>
                <DefaultTextInput
                    text="Apelido do veículo"
                    placeholder="Digite o apelido do veículo"
                    charMax={25}
                    charAmount={vehicleNickname.length}
                    onChangeText={(e) => handleVehicleNicknameChange(e)}
                    value={vehicleNickname}
                />

                <DefaultButton
                    label="Finalizar"
                    iconName="FlagCheckered"
                    disabled={finishButtonDisabled}
                    onPress={handleFinish}
                />
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
        padding: theme.MEASURES.PADDING,
        gap: theme.MEASURES.PADDING * 2,
    },
    inputContainer: {
        // borderWidth: 1,
        borderColor: theme.COLORS.LIGHT_400,
        borderStyle: 'solid',
    },
    inputLabel: {
        marginBottom: theme.MEASURES.PADDING / 2,
    },
    imagePreviewContainer: {
        height: 300,
        width: "100%",
        borderRadius: theme.MEASURES.BORDER_RADIUS,
        overflow: "hidden",
        marginBottom: theme.MEASURES.PADDING / 2
    },
    imagePreview: {
        width: "100%",
        height: "100%"
    },
    textInputStyle: {
        color: theme.COLORS.DARK_100,
        height: 50,
        padding: theme.MEASURES.PADDING / 2,
        fontSize: theme.FONT_SIZE.M,
        fontFamily: theme.FONTS.REGULAR,
        borderRadius: theme.MEASURES.BORDER_RADIUS,
        backgroundColor: theme.COLORS.LIGHT,
    }
})