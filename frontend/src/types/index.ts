export type UserRole = 'admin' | 'asset_manager' | 'department_head' | 'employee';

export interface User {
  id: number;
  email: string;
  full_name?: string;
  role: UserRole;
  is_active: boolean;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}
