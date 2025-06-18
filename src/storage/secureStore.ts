import * as SecureStore from 'expo-secure-store';

export async function saveSession(session: string) {
  await SecureStore.setItemAsync('session', JSON.stringify(session));
}

export async function getSession() {
  const sessionStr = await SecureStore.getItemAsync('session');
  return sessionStr ? JSON.parse(sessionStr) : null;
}

export async function deleteSession() {
  await SecureStore.deleteItemAsync('session');
}
