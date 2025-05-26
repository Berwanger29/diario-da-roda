import { NavigationContainer } from '@react-navigation/native';
import { MyDrawer } from './MyDrawer';
import { StackScreens } from './Stack';

export function Navigator() {
    return (
        <NavigationContainer>
            <StackScreens />
        </NavigationContainer>
    );
}
