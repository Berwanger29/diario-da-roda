import { useFonts, Manrope_700Bold } from '@expo-google-fonts/manrope';
import { WorkSans_500Medium, WorkSans_400Regular, WorkSans_300Light } from '@expo-google-fonts/work-sans'
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Navigator } from './src/navigation/Navigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';

SplashScreen.preventAutoHideAsync();

export default function App() {

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

  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Navigator />
    </SafeAreaProvider>
  );
}

