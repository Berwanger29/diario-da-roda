export type VehicleNote = {
    id: string;
    title: string;
    description: string;
    price?:number | null;
    vehicleId: string;
    createdAt: Date;
    updatedAt: Date;
}