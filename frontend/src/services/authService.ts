import api from "./api";

export const registerUser = (data: { firstName: string, lastName: string, email: string; password: string }) =>
  api.post('/auth/register', data);

export const loginUser = (data: { email: string; password: string }) =>
  api.post<{ data: string }>('/auth/login', data);