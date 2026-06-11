export type UserRole =
    | 'SUPER_ADMIN'
    | 'BLOCK_ADMIN';

export interface AuthUser {
    id: string;
    email: string;
    role: UserRole;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    admin: AuthUser;
}