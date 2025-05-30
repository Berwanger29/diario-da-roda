import { createContext, ReactNode, useState, useEffect, useCallback } from "react";
import { storage } from "../storage/mmkvStorage";
import uuid from 'react-native-uuid';
import { Vehicle } from "../@types/vehicle";
import { InputImageProps } from "../screens/NewVehicle";
import { VehicleTypes } from "../@types/vehicleTypes";

// Definir a tipagem do contexto
export type VehiclesContextType = {
    vehicles: Vehicle[];
    handleSaveVehicle: (type: VehicleTypes, image: InputImageProps, nickname: string) => void;
    retrieveVehicles: () => void;
    findById: (vehicleId: string) => Vehicle | null;
    deleteAllVehicles: () => void; // Nova função adicionada
};


const defaultContext: VehiclesContextType = {
    vehicles: [],
    handleSaveVehicle: (type: VehicleTypes, image: InputImageProps, nickname: string) => {
        console.warn('handleSaveVehicle called without provider; this is a no-op.');
    },
    retrieveVehicles: () => {
        console.warn('retrieveVehicles called without provider; this is a no-op.');
    },
    findById: () => {
        console.warn('findById called without provider; this is a no-op.');
        return null;
    },
    deleteAllVehicles: () => {
        console.warn('deleteAllVehicles called without provider; this is a no-op.');
    }
};



export const VehiclesContext = createContext<VehiclesContextType>(defaultContext);

export function VehiclesProvider({ children }: { children: ReactNode }) {

    const [vehicles, setVehicles] = useState<Vehicle[]>([]);

    const handleSaveVehicle = useCallback((type: VehicleTypes, image: InputImageProps, nickname: string) => {
        if (!type || !nickname || !image) {
            console.error("Campos obrigatórios não preenchidos");
            return;
        }

        const vehicleId = uuid.v4() as string;
        const newVehicle: Vehicle = {
            id: vehicleId,
            type: type,
            image: image,
            vehicleNickname: nickname,
            notes: [],
        };

        storage.set(`vehicle.${vehicleId}`, JSON.stringify(newVehicle));

        const vehiclesListRaw = storage.getString('vehicles');
        const vehiclesList: string[] = vehiclesListRaw ? JSON.parse(vehiclesListRaw) : [];
        vehiclesList.push(vehicleId);
        storage.set('vehicles', JSON.stringify(vehiclesList));

        setVehicles((prevVehicles) => [...prevVehicles, newVehicle]);

        console.log("Veículo salvo:", newVehicle);
    }, []);

    const retrieveVehicles = useCallback(() => {
        const vehiclesListRaw = storage.getString('vehicles');
        if (vehiclesListRaw) {
            const vehicleIds: string[] = JSON.parse(vehiclesListRaw);
            const loadedVehicles: Vehicle[] = vehicleIds
                .map((id) => {
                    const vehicleRaw = storage.getString(`vehicle.${id}`);
                    return vehicleRaw ? JSON.parse(vehicleRaw) : null;
                })
                .filter((vehicle): vehicle is Vehicle => vehicle !== null);
            setVehicles(loadedVehicles);
        } else {
            setVehicles([]);
        }
    }, []);

    const findById = useCallback((vehicleId: string): Vehicle | null => {
        const vehicleRaw = storage.getString(`vehicle.${vehicleId}`);
        return vehicleRaw ? JSON.parse(vehicleRaw) : null;
    }, []);

    const deleteAllVehicles = useCallback(() => {
        const vehiclesListRaw = storage.getString('vehicles');
        if (vehiclesListRaw) {
            const vehicleIds: string[] = JSON.parse(vehiclesListRaw);

            vehicleIds.forEach((id) => storage.delete(`vehicle.${id}`));
        }
        storage.delete('vehicles');
        setVehicles([]);

        console.log("Todos os registros foram deletados.");
    }, []);



    useEffect(() => {
        const vehiclesListRaw = storage.getString('vehicles');
        if (vehiclesListRaw) {
            const vehicleIds: string[] = JSON.parse(vehiclesListRaw);
            const loadedVehicles: Vehicle[] = vehicleIds
                .map((id) => {
                    const vehicleRaw = storage.getString(`vehicle.${id}`);
                    return vehicleRaw ? JSON.parse(vehicleRaw) : null;
                })
                .filter((vehicle): vehicle is Vehicle => vehicle !== null);
            setVehicles(loadedVehicles);
        }
    }, []);

    useEffect(() => {
        retrieveVehicles();
    }, [retrieveVehicles]);


    return (
        <VehiclesContext.Provider value={{ vehicles, handleSaveVehicle, retrieveVehicles, findById, deleteAllVehicles }}>
            {children}
        </VehiclesContext.Provider>
    );
}