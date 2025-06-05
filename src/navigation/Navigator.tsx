import { NavigationContainer } from '@react-navigation/native';
import { MyDrawer } from './MyDrawer';
import { StackScreens } from './Stack';
import ToastManager from 'toastify-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';
import { AuthStack } from './AuthStack';

export function Navigator() {

    const insets = useSafeAreaInsets();
    const [isUserAuthnenticated, setIsUserAuthnenticated] = useState(true);

    return (
        <>
            <NavigationContainer>
                {
                    isUserAuthnenticated ?
                        <AuthStack />
                        :
                        <StackScreens />
                }
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
