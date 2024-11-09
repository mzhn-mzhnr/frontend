import { apiFetch } from "@/lib/fetch";
import { RegisterData } from "@/lib/forms/register";
import { SignInData } from "@/lib/forms/sign-in";
import { User } from "./user";

export type AuthCredentials = SignInData;
export type { RegisterData };

export interface AuthResult {
  accessToken: string;
  refreshToken: string;
}
export type { User };

export async function auth(credentials: AuthCredentials) {
  return await apiFetch<AuthResult>("/api/login", credentials, {
    method: "POST",
  });
}

export async function logout() {
  await apiFetch("/api/logout");
}

export async function me() {
  return await apiFetch<User>("/api/profile");
}

export async function register(data: RegisterData) {
  return await apiFetch<void>("/api/register", data, {
    method: "POST",
  });
}
