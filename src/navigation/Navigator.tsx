import { NavigationContainer } from '@react-navigation/native';
import { MyDrawer } from './MyDrawer';
import { StackScreens } from './Stack';
import ToastManager from 'toastify-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function Navigator() {

    const insets = useSafeAreaInsets();

    return (
        <>
            <NavigationContainer>
                <StackScreens />
            </NavigationContainer>
            <ToastManager
                position="top"
                duration={2000}
                showProgressBar={false}
                topOffset={insets.top + 10}
            />
        </>
    );
}
