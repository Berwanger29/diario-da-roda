import axios from "axios";
import { getLoginTokens, saveLoginState, clearLoginState } from "../helpers/loginStorage";


export const api = axios.create({
    baseURL:"http://192.168.15.95:3000"
})


api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const tokens = getLoginTokens();

      if (tokens?.refreshToken) {
        try {
          const refreshResponse = await api.post("/session/refresh", {
            refresh_token: tokens.refreshToken,
          });

          const newAccessToken = refreshResponse.data?.access_token;
          const newRefreshToken = refreshResponse.data?.refresh_token;

          if (newAccessToken && newRefreshToken) {
            saveLoginState({ accessToken: newAccessToken, refreshToken: newRefreshToken });
            api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return api(originalRequest);
          } else {
            throw new Error("Falha ao renovar token");
          }
        } catch (err) {
          await clearLoginState();
          // aqui você pode acionar um logout do contexto se quiser
          return Promise.reject(err);
        }
      } else {
        await clearLoginState();
      }
    }

    return Promise.reject(error);
  }
);
