import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from '../screens/Login';
import theme from '../theme/theme';
import { FormNewNote } from '../screens/FormNewNote';
import { MyDrawer } from './MyDrawer';
import { Note } from '../screens/Note';
import { Vehicle } from '../screens/Vehicle';

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
            {/* <Screen
                component={Login}
                name="Login"
            /> */}

            <Screen
                component={MyDrawer}
                name='MyDrawer'
            />
            <Screen
                component={Vehicle}
                name='Vehicle'
            />
            <Screen
                component={Note}
                name='Note'
            />
            <Screen
                component={FormNewNote}
                name="FormNewNote"
                options={{
                    animation: 'default'
                }}
            />
        </Navigator>
    )
}