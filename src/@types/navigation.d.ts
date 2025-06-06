export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Welcome: undefined;
      Login: undefined;
      CreateAccount: undefined;
      RecoveryPassword: undefined;
      Account: undefined;
      MyDrawer: {
        screen?: string
      };
      EditVehicle:{
        vehicleId: string
      }
      FormNewNote: {
        vehicleId: string,
        noteId?: noteId,
        toEdit?: boolean
      };
      NewVehicle: {
        vehicleId?: string
        toEdit?: boolean
      };
      Note: {
        noteId: string,
        vehicleId: string
      };
      VehicleNotes: {
        vehicleId: string
      };
      Vehicle: {
        vehicleId: string
      };
      Settings: undefined;
      Success: {
        vehicleId?: string,
      }
    }
  }
}
