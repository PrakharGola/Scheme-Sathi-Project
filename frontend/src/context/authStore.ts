import { create } from "zustand";
import { setAuthToken, api } from "../utils/api";

interface User {
  id: string;
  name: string;
  phone: string;
  role: "USER" | "ADMIN";
  language: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  login: (phone: string, password: string) => Promise<void>;
  register: (
    name: string,
    phone: string,
    password: string,
    language: string
  ) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  async login(phone, password) {
    const res = await api.post("/auth/login", { phone, password });
    setAuthToken(res.data.token);
    set({ user: res.data.user, token: res.data.token });
  },
  async register(name, phone, password, language) {
    const res = await api.post("/auth/register", {
      name,
      phone,
      password,
      language
    });
    setAuthToken(res.data.token);
    set({ user: res.data.user, token: res.data.token });
  },
  logout() {
    setAuthToken(null);
    set({ user: null, token: null });
  }
}));
