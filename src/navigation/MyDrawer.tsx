import { createDrawerNavigator } from '@react-navigation/drawer';
import { Account } from '../screens/Account';
import { Settings } from '../screens/Settings';
import { VehicleNotes } from '../screens/VehicleNotes';


import theme from '../theme/theme';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { NewVehicle } from '../screens/NewVehicle';

const Drawer = createDrawerNavigator();

const vehicles = [
  {
    id: 1,
    type: 'car',
    brand: 'Chevrolet',
    model: 'Onix',
    year: 2020,
    color: 'black',
    plate: 'ABC1D23',
    mileage: 20000,
    insurance: {
      company: 'Bradesco',
      policyNumber: '123456789',
      expirationDate: '2023-12-31',
      coverage: 'full',
      premium: 2000,
      deductible: 1000,
      claims: [
        {
          date: '2023-01-01',
          amount: 500,
          description: 'Accident',
          status: 'approved',
        },
        {
          date: '2023-06-01',
          amount: 1000,
          description: 'Theft',
          status: 'pending',
        },
      ],
    },
    maintenance: [
      {
        date: '2023-01-01',
        type: 'oil change',
        cost: 100,
        description: 'Changed oil and filter',
      },
      {
        date: '2023-06-01',
        type: 'tire rotation',
        cost: 50,
        description: 'Rotated tires',
      },
    ],
    documents: [
      {
        type: 'registration',
        number: '123456789',
        expirationDate: '2023-12-31',
        status: 'valid',
      },
      {
        type: 'insurance',
        number: '987654321',
        expirationDate: '2023-12-31',
        status: 'valid',
      },
      {
        type: 'inspection',
        number: '456789123',
        expirationDate: '2023-12-31',
        status: 'valid',
      },
    ],
    notes: [
      {
        date: '2023-01-01',
        note: 'First oil change at 10,000 km',
      },
      {
        date: '2023-06-01',
        note: 'Tire rotation at 20,000 km',
      },
    ],
    images: [
      {
        id: 1,
        url: 'https://example.com/image1.jpg',
        description: 'Front view',
      },
      {
        id: 2,
        url: 'https://example.com/image2.jpg',
        description: 'Rear view',
      },
      {
        id: 3,
        url: 'https://example.com/image3.jpg',
        description: 'Side view',
      }
    ]
  },
  {
    id: 2,
    type: 'motorcycle',
    brand: 'Honda',
    model: 'CB500F',
    year: 2020,
    color: 'black',
    plate: 'ABC1D23',
    mileage: 20000,
    insurance: {
      company: 'Bradesco',
      policyNumber: '123456789',
      expirationDate: '2023-12-31',
      coverage: 'full',
      premium: 2000,
      deductible: 1000,
      claims: [
        {
          date: '2023-01-01',
          amount: 500,
          description: 'Accident',
          status: 'approved',
        },
        {
          date: '2023-06-01',
          amount: 1000,
          description: 'Theft',
          status: 'pending',
        },
      ],
    },
    maintenance: [
      {
        date: '2023-01-01',
        type: 'oil change',
        cost: 100,
        description: 'Changed oil and filter',
      },
      {
        date: '2023-06-01',
        type: 'tire rotation',
        cost: 50,
        description: 'Rotated tires',
      },
    ],
    documents: [
      {
        type: 'registration',
        number: '123456789',
        expirationDate: '2023-12-31',
        status: 'valid',
      },
      {
        type: 'insurance',
        number: '987654321',
        expirationDate: '2023-12-31',
        status: 'valid',
      },
      {
        type: 'inspection',
        number: '456789123',
        expirationDate: '2023-12-31',
        status: 'valid',
      },
    ],
    notes: [
      {
        date: '2023-01-01',
        note: 'First oil change at 10,000 km',
      },
      {
        date: '2023-06-01',
        note: 'Tire rotation at 20,000 km',
      },
    ],
    images: [
      {
        id: 1,
        url: 'https://example.com/image1.jpg',
        description: 'Front view',
      },
      {
        id: 2,
        url: 'https://example.com/image2.jpg',
        description: 'Rear view',
      },
      {
        id: 3,
        url: 'https://example.com/image3.jpg',
        description: 'Side view',
      }
    ]
  }
]

export function MyDrawer() {

  function switchIcon(vehicleType: string, color: string) {
    switch (vehicleType) {
      case 'car':
        return <FontAwesome5 name="car" size={24} color={color} />;
      case 'motorcycle':
        return <FontAwesome5 name="motorcycle" size={24} color={color} />;
      case 'truck':
        return <FontAwesome5 name="truck" size={24} color={color} />;
      default:
        return <FontAwesome5 name="car" size={24} color={color} />;
    }

  }
  return (
    <Drawer.Navigator
      initialRouteName='Account'
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
            <MaterialCommunityIcons name="account" color={color} size={24} />
          ),
        }}
      />

      {
        vehicles.map((vehicle) => (
          <Drawer.Screen
            key={vehicle.id}
            name={`${vehicle.model}`}
            component={VehicleNotes}
            options={{
              drawerLabel: vehicle.model,
              drawerIcon: ({ color }) => (
                switchIcon(vehicle.type, color)
              ),
            }}
          />
        ))
      }

      <Drawer.Screen
        name="NewVehicle"
        component={NewVehicle}
        options={{
          drawerLabel: 'Novo Veículo',
          drawerIcon: ({ color }) => (
            <FontAwesome name="plus-circle" size={24} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          drawerLabel: 'Configurações',
          drawerIcon: ({ color }) => (
            <Ionicons name="settings" size={24} color={color} />
          ),
        }}
      />

    </Drawer.Navigator>
  );
}