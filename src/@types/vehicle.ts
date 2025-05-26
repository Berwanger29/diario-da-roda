import { VehicleNote } from "./vehicleNote";


type Vehicle = {
    id: string;
    name: string;
    brand: string;
    model: string;
    year: number;
    mileage: number;
    power: number;
    image: string;
    notes:VehicleNote[]
}