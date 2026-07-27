import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { privateApi, publicApi } from "../api/axios.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const tokenRef = useRef(null);

  const updateToken = useCallback((token) => {
    tokenRef.current = token;
    setAccessToken(token);
  }, []);

  const refresh = useCallback(async () => {
    const { data } = await publicApi.post("/auth/refresh");
    updateToken(data.accessToken);
    return data.accessToken;
  }, [updateToken]);

  useEffect(() => {
    const requestInterceptor = privateApi.interceptors.request.use((config) => {
      if (tokenRef.current) {
        config.headers.Authorization = `Bearer ${tokenRef.current}`;
      }
      return config;
    });

    const responseInterceptor = privateApi.interceptors.response.use(
      (response) => response,
      async (error) => {
        const original = error.config;

        if (error.response?.status === 401 && original && !original._retry) {
          original._retry = true;
          try {
            const newToken = await refresh();
            original.headers.Authorization = `Bearer ${newToken}`;
            return privateApi(original);
          } catch {
            updateToken(null);
            setUser(null);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      privateApi.interceptors.request.eject(requestInterceptor);
      privateApi.interceptors.response.eject(responseInterceptor);
    };
  }, [refresh, updateToken]);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const token = await refresh();
        const { data } = await privateApi.get("/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(data.user);
      } catch {
        updateToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, [refresh, updateToken]);

  const login = async (email, password) => {
    const { data } = await publicApi.post("/auth/login", { email, password });
    updateToken(data.accessToken);
    setUser(data.user);
    return data.user;
  };

  const signup = async (name, email, password) => {
    await publicApi.post("/auth/register", { name, email, password });
    return login(email, password);
  };

  const logout = async () => {
    try {
      await publicApi.post("/auth/logout");
    } finally {
      updateToken(null);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, accessToken, loading, login, signup, logout, privateApi }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
