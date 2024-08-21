export interface LoginRequest{
    username: string;
    password: string;
}

export interface RegisterRequest{
    username: string;
    email: string;
    password: string;
}

export interface JwtResponse {
    accessToken: string;
    refreshToken: string;
}

export interface UserRequest{
    username: string;
    email: string;
    roles: ERole[];
    password: string | null | undefined;
}

export interface UserResponse{
    id: string
    username: string;
    email: string;
    roles: ERole[];
    createdAt: Date;
    updatedAt: Date;
}

export enum ERole {
    ROLE_USER = 'ROLE_USER',
    ROLE_AUTHOR = 'ROLE_AUTHOR',
    ROLE_READER = 'ROLE_READER',
    ROLE_ADMINISTRATOR = 'ROLE_ADMINISTRATOR'
}

export interface IDataProvider<TRequest, TResponse> {
  getList(): Promise<TResponse[]>;
  getOne(id: string): Promise<TResponse>;
  create(data: TRequest): Promise<void>;
  update(id: string, data: TRequest): Promise<void>;
  delete(id: string): Promise<void>;
}