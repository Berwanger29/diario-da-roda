export type VehicleNote = {
    id: string;
    vehicleId: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    content: string;
    price?:number;
}