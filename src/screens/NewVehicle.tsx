import { ScrollView, StyleSheet, TextInput, View } from "react-native";
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
import { useNavigation, useRoute } from "@react-navigation/native";
import { Header } from "../components/Header";
import { VehicleTypes } from "../@types/vehicleTypes";
import { VehiclesContext, VehiclesContextType } from "../contexts/appContext";
import { DefaultTextInput } from "../components/DefaultTextInput";
import { DefaultLoading } from "../components/DefaultLoading";
import { Toast } from "toastify-react-native";




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



export function NewVehicle() {

    const vehicleNicknameMaxLength = 25;
    const mediaLibraryPermission = ImagePicker.useMediaLibraryPermissions()

    const routes = useRoute()
    const vehicleId = (routes?.params as { vehicleId?: string })?.vehicleId ?? null;
    const navigation = useNavigation()
    const { handleSaveVehicle, findById, updateVehicleInfo } = useContext<VehiclesContextType>(VehiclesContext)

    const [vehicleType, setVehicleType] = useState<VehicleTypes | null>(null);
    const [isVehicleSelected, setIsVehicleSelected] = useState(false);
    const [selectedImage, setSelectedImage] = useState<InputImageProps>();
    const [vehicleNickname, setVehicleNickname] = useState('');
    const [finishButtonDisabled, setFinishButtonDisabled] = useState(true)
    const [isLoading, setIsLoading] = useState(true)

    function isToEditVehicle() {
        if (vehicleId) {
            const res = findById(vehicleId)

            if (!res) {
                Toast.error("Veículo não encontrado")
                navigation.goBack();
                return
            }

            console.log(res.type)

            setVehicleType(res.type as VehicleTypes);
            setSelectedImage({
                fileName: res!.image!.fileName,
                uri: res!.image!.uri
            });
            setVehicleNickname(res?.vehicleNickname || '');
            setIsVehicleSelected(true);
            setIsLoading(false)
        }
    }

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

    async function handleGetImage() {
        const [status, requestPermission] = mediaLibraryPermission;

        if (!status?.granted) {
            await requestPermission()
        }

        if (status?.granted) {
            const { assets } = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ["images"],
                allowsEditing: true,
                allowsMultipleSelection: false,
                aspect: [4, 3],
                defaultTab: 'photos'
            })

            if (assets) {
                const imageSelected = assets[0]
                setSelectedImage({
                    fileName: imageSelected.fileName,
                    uri: imageSelected.uri,
                })
            }
        }
    }

    function canFinish() {
        if (isVehicleSelected && selectedImage && vehicleNickname) {
            setFinishButtonDisabled(false)
        }
    }

    function handleFinish() {
        const res = handleSaveVehicle(vehicleType!, selectedImage!, vehicleNickname)

        navigation.navigate("Success", {
            vehicleId: res.id
        })
    }

    function handleFinishEditing() {
        if (vehicleId) {
            let updatedVehicle = {
                type: vehicleType!,
                image: selectedImage!,
                vehicleNickname: vehicleNickname,
            }

            updateVehicleInfo(vehicleId!, updatedVehicle)
            Toast.success("Veículo atualizado com sucesso!")
            navigation.navigate(`VehicleNotes_${vehicleId}`)
        }
    }

    useEffect(() => {
        isToEditVehicle()
    }, [])

    useEffect(() => {
        canFinish()
    }, [selectedImage, isVehicleSelected, vehicleNickname])

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

                {/* <View
                    style={styles.inputContainer}
                >
                    <DefaultText
                        text="Apelido do veículo"
                        weight="MEDIUM"
                        fontSize="L"
                        style={styles.inputLabel}
                    />
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder="Digite o apelido do veículo"
                        placeholderTextColor={theme.COLORS.DARK_100}
                        onChangeText={(e) => handleVehicleNicknameChange(e)}
                        value={vehicleNickname}
                        maxLength={vehicleNicknameMaxLength}
                        enterKeyHint="done"
                        autoCorrect={false}
                    />
                    <DefaultText
                        text={`${vehicleNickname.length}/${vehicleNicknameMaxLength}`}
                        fontSize="S"
                        weight="LIGHT"
                        style={{
                            alignSelf: 'flex-end',
                            marginTop: theme.MEASURES.PADDING / 2,
                        }}
                    />
                </View> */}
                <DefaultButton
                    label="Finalizar"
                    iconName="FlagCheckered"
                    disabled={finishButtonDisabled}
                    onPress={vehicleId ? handleFinishEditing : handleFinish}
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