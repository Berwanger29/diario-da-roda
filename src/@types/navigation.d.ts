export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Login: undefined;
      Account: undefined;
      MyDrawer: {
        screen?: string
      };
      NewVehicle: undefined;
      VehicleNotes: {
        vehicleId: string
      };

      FormNewNote: {
        vehicleId: string
      };
      Vehicle: undefined;
      Note: {
        noteId: string,
        vehicleId: string
      };
      Settings: undefined;
    }
  }
}
