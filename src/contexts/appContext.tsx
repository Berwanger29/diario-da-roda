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
};

// Criar o contexto com valor padrão undefined
export const VehiclesContext = createContext<VehiclesContextType | undefined>(undefined);

export function VehiclesProvider({ children }: { children: ReactNode }) {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);

    // Carregar veículos do storage na inicialização
    useEffect(() => {
        const vehiclesListRaw = storage.getString('vehicles');
        if (vehiclesListRaw) {
            const vehicleIds: string[] = JSON.parse(vehiclesListRaw);
            const loadedVehicles: Vehicle[] = vehicleIds.map((id) => {
                const vehicleRaw = storage.getString(`vehicle.${id}`);
                return vehicleRaw ? JSON.parse(vehicleRaw) : null;
            }).filter((vehicle): vehicle is Vehicle => vehicle !== null); // Remove nulos
            setVehicles(loadedVehicles);
        }
    }, []);

    // Função para salvar veículo, memorizada com useCallback
    const handleSaveVehicle = useCallback((type: VehicleTypes, image: InputImageProps, nickname: string) => {
        // Validação básica
        if (!type || !nickname || !image) {
            console.error("Campos obrigatórios não preenchidos");
            return;
        }

        const vehicleId = uuid.v4() as string; // Garantir que é string
        const newVehicle: Vehicle = {
            id: vehicleId,
            type: type,
            image: image,
            vehicleNickname: nickname,
            notes: []
        };

        // Salvar veículo no storage
        storage.set(`vehicle.${vehicleId}`, JSON.stringify(newVehicle));

        // Atualizar lista de IDs no storage
        const vehiclesListRaw = storage.getString('vehicles');
        const vehiclesList: string[] = vehiclesListRaw ? JSON.parse(vehiclesListRaw) : [];
        vehiclesList.push(vehicleId);
        storage.set('vehicles', JSON.stringify(vehiclesList));

        // Atualizar estado com o novo veículo
        setVehicles((prevVehicles) => [...prevVehicles, newVehicle]);

        console.log("Veículo salvo:", newVehicle);
    }, []);

    return (
        <VehiclesContext.Provider value={{ vehicles, handleSaveVehicle }}>
            {children}
        </VehiclesContext.Provider>
    );
}