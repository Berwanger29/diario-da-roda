import { InputImageProps } from "../screens/NewVehicle";
import { VehicleNote } from "./vehicleNote";
import { VehicleTypes } from "./vehicleTypes";


export type Vehicle = {
    id: string;
    type: VehicleTypes
    vehicleNickname: string;
    image: InputImageProps;
    notes:VehicleNote[]
}

export type CreateVehicleSchemaDTO = {
    type: VehicleTypes;
    vehicleNickname: string;
    image: InputImageProps;
}