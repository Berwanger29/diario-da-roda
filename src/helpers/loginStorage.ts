import { storage } from "../storage/mmkvStorage";


export const saveLoginState = (tokens: { accessToken: string, refreshToken: string }): void => {
    storage.set("user.tokens", JSON.stringify(tokens));
};


export const getLoginState = (): boolean => {
  const tokens = getLoginTokens();
  return !!(tokens?.accessToken && tokens?.refreshToken);
};


export const getLoginTokens = (): { accessToken: string, refreshToken: string } | null => {
    const stored = storage.getString("user.tokens");
    return stored ? JSON.parse(stored) : null;
};


export const clearLoginState = (): void => {
    storage.delete("user.tokens");
};





