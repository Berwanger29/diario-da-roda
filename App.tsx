import { useFonts, Manrope_700Bold } from '@expo-google-fonts/manrope';
import { WorkSans_500Medium, WorkSans_400Regular, WorkSans_300Light } from '@expo-google-fonts/work-sans'
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { Navigator } from './src/navigation/Navigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import { IconContext } from 'phosphor-react-native';
import theme from './src/theme/theme';
import { VehiclesProvider } from './src/contexts/appContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DefaultLoading } from './src/components/DefaultLoading';
import { getLoginState } from './src/helpers/loginStorage';
import { AuthProvider } from './src/contexts/AuthContext';



SplashScreen.preventAutoHideAsync();

export default function App() {


  const [authState, setAuthState] = useState(false);

  const [loaded, error] = useFonts({
    Manrope_700Bold,
    WorkSans_500Medium,
    WorkSans_400Regular,
    WorkSans_300Light
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  // useEffect(() => {
  //   const res = getLoginState()
  //   if (res) {
  //     setAuthState(true)
  //   }
  // }, []);

  if (!loaded && !error) {
    return null;
  }


  // if (!authState) {
  //   return <DefaultLoading />
  // }



  return (
    <SafeAreaProvider>
      <GestureHandlerRootView
        style={{
          flex: 1
        }}
      >
        <AuthProvider>
          <VehiclesProvider>
            <IconContext.Provider
              value={{
                size: 24,
                weight: 'fill',
                color: theme.COLORS.LIGHT_400
              }}
            >
              <Navigator />
            </IconContext.Provider>
          </VehiclesProvider>
        </AuthProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

