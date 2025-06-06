import { createDrawerNavigator } from '@react-navigation/drawer';
import { Account } from '../screens/Account';
import { Settings } from '../screens/Settings';
import { VehicleNotes } from '../screens/VehicleNotes';


import theme from '../theme/theme';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { NewVehicle } from '../screens/NewVehicle';
import { DefaultIcon } from '../components/DefaultIcon';

import {  useContext, useEffect, useState } from 'react';
import { VehicleTypes } from '../@types/vehicleTypes';

import { VehiclesContext } from '../contexts/appContext';
import { DefaultLoading } from '../components/DefaultLoading';


const Drawer = createDrawerNavigator();


type IconColorProps = keyof typeof theme["COLORS"]


export function MyDrawer() {
  const { vehicles } = useContext(VehiclesContext);
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  function switchIcon(vehicleType: VehicleTypes, color: string) {
    switch (vehicleType) {
      case 'cars':
        return <DefaultIcon name='Car' />;
      case 'motorcycles':
        return <DefaultIcon name='Motorcycle' />;
      case 'trucks':
        return <DefaultIcon name='Truck' />;
      default:
        return <FontAwesome5 name="car" size={24} color={color} />;
    }
  }

  useEffect(() => {
    if (vehicles.length === 0) {
      setInitialRoute("NewVehicle");
    } else {
      setInitialRoute(`VehicleNotes_${vehicles[0].id}`);
    }
  }, [vehicles]);

  if (!initialRoute) {
  
    return <DefaultLoading />;
  }

  return (
    <Drawer.Navigator
      initialRouteName={initialRoute}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: theme.COLORS.DARK_100,
        drawerActiveTintColor: theme.COLORS.LIGHT,
        drawerInactiveTintColor: theme.COLORS.LIGHT_400,
        drawerStatusBarAnimation: 'slide',
        drawerStyle: {
          backgroundColor: theme.COLORS.DARK,
        },
        drawerItemStyle: {
          borderRadius: 10,
        }
      }}
    >
      <Drawer.Screen
        name="Account"
        component={Account}
        options={{
          drawerLabel: 'Conta',
          drawerIcon: ({ color }) => (
            <DefaultIcon name='UserCircle' color={color as IconColorProps} size={24} />
          ),
          drawerItemStyle: {
            marginBottom: 20,
            borderRadius: 10,
          }
        }}
      />

      {vehicles.map((vehicle) => (
        <Drawer.Screen
          key={vehicle.id}
          name={`VehicleNotes_${vehicle.id}`}
          component={VehicleNotes}
          initialParams={{ vehicleId: vehicle.id }}
          options={{
            drawerLabel: vehicle.vehicleNickname,
            drawerIcon: ({ color }) => switchIcon(vehicle.type as VehicleTypes, color),
          }}
        />
      ))}

      <Drawer.Screen
        name="NewVehicle"
        component={NewVehicle}
        options={{
          drawerLabel: 'Novo Veículo',
          drawerIcon: ({ color }) => (
            <DefaultIcon name='PlusCircle' color={color as IconColorProps} size={24} />
          ),
          drawerItemStyle: {
            marginTop: 20,
            borderRadius: 10,
          }
        }}
      />

      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          drawerLabel: 'Configurações',
          drawerIcon: ({ color }) => (
            <DefaultIcon name='Gear' color={color as IconColorProps} size={24} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
