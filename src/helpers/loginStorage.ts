import { storage } from "../storage/mmkvStorage";

export const saveLoginState = (isLoggedIn: boolean): void => {
    storage.set("user.loggedIn", JSON.stringify(isLoggedIn));
};

export const getLoginState = (): boolean => {
    const stored = storage.getString("user.loggedIn");
    return stored ? JSON.parse(stored) === true : false;
};

export const clearLoginState = (): void => {
    storage.delete("user.loggedIn");
};
