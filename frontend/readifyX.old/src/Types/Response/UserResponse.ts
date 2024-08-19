
export interface UserResponse {
    id: string;
    username: string,
    email: string,
    roles: string[],
    createdAt: Date,
    updatedAt: Date
}