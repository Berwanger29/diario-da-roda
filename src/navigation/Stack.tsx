import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from '../screens/Auth/Login';
import { FormNewNote } from '../screens/FormNewNote';
import { MyDrawer } from './MyDrawer';
import { Note } from '../screens/Note';
import { Vehicle } from '../screens/Vehicle';

import theme from '../theme/theme';
import { Success } from '../screens/Success';
import { NewVehicle } from '../screens/NewVehicle';
import { EditVehicle } from '../screens/EditVehicle';

const { Navigator, Screen } = createNativeStackNavigator();

export function StackScreens() {
    return (
        <Navigator
            initialRouteName='MyDrawer'


            screenOptions={{
                headerShown: false,
                contentStyle: {
                    backgroundColor: theme.COLORS.DARK
                }
            }}
        >
            <Screen
                component={MyDrawer}
                name='MyDrawer'
            />
            <Screen
                component={Note}
                name='Note'
            />
            <Screen
                name='EditVehicle'
                component={EditVehicle}
            />
            <Screen
                component={FormNewNote}
                name="FormNewNote"
                options={{
                    animation: 'default'
                }}
            />
            <Screen
                component={Vehicle}
                name='Vehicle'
            />
            <Screen
                name='Success'
                component={Success}
            />
        </Navigator>
    )
}