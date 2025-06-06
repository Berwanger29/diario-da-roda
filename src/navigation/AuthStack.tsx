import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Login } from "../screens/Auth/Login";
import { Welcome } from "../screens/Auth/Welcome";
import { CreateAccount } from "../screens/Auth/CreateAccount";
import { RecoveryPassword } from "../screens/Auth/RecoveryPasswoor";



const { Navigator, Screen } = createNativeStackNavigator();


export function AuthStack() {
    return (
        <Navigator
            initialRouteName="Welcome"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Screen
                name="Welcome"
                component={Welcome}
            />
            <Screen
                name="Login"
                component={Login}
            />
            <Screen
                name="CreateAccount"
                component={CreateAccount}
            />

            <Screen
                name="RecoveryPassword"
                component={RecoveryPassword}
            />
        </Navigator>
    )
}