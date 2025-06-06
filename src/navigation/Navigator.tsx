import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { MyDrawer } from './MyDrawer';
import { StackScreens } from './Stack';
import ToastManager from 'toastify-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCallback, useContext, useEffect, useState } from 'react';
import { AuthStack } from './AuthStack';
import { getLoginState } from '../helpers/loginStorage';
import { VehiclesContext } from '../contexts/appContext';
import { AuthContext } from '../contexts/AuthContext';
import { DefaultLoading } from '../components/DefaultLoading';

export function Navigator() {


    const { isLoggedIn, isLoading } = useContext(AuthContext);
    const insets = useSafeAreaInsets();

    if (isLoading) {
        return <DefaultLoading />;
    }

    return (
        <>
            <NavigationContainer>
                {
                    isLoggedIn ?
                        <StackScreens />
                        :
                        <AuthStack />
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
