export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Welcome: undefined;
      Login: undefined;
      CreateAccount: undefined;
      Account: undefined;
      MyDrawer: {
        screen?: string
      };
      NewVehicle: {
        vehicleId?: string
      };
      VehicleNotes: {
        vehicleId: string
      };

      FormNewNote: {
        vehicleId: string,
        noteId?: noteId,
        toEdit?: boolean
      };
      Vehicle: {
        vehicleId: string
      };
      Note: {
        noteId: string,
        vehicleId: string
      };
      Settings: undefined;
    }
  }
}
