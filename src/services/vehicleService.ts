import { CreateVehicleSchemaDTO } from "../@types/vehicle";
import { api } from "./axios";

export async function getVehicles() {
    const { data } = await api.get('/vehicle/');

    return data;
}

export async function createNewVehicle({ image, type, vehicleNickname }: CreateVehicleSchemaDTO) {

}