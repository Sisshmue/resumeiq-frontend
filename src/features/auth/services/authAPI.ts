import { api } from "../../../shared/services/api";
import type { LoginRequest, RegisterRequest, AuthResponse } from "../types/authType";

export const registerUser = async(data: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post("/api/auth/register", data);
    return response.data;
}

export const loginUser = async(data: LoginRequest): Promise<AuthResponse>=>{
    const response = await api.post('/api/auth/login', data);
    return response.data;
}