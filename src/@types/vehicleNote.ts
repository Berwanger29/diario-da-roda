export type VehicleNote = {
    id: string;
    title: string;
    description: string;
    price?:number;
    vehicleId: string;
    createdAt: Date;
    updatedAt: Date;
}