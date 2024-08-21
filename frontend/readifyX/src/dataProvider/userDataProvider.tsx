import { deleteUser, findAllUsers, findUserById, saveUser, updateUser } from "../config/apiMethods";
import { IDataProvider, UserRequest, UserResponse } from "../interfaces";


const userDataProvider: IDataProvider<UserRequest , UserResponse> = {

    getList: async  (): Promise<UserResponse[]> =>{
        return await findAllUsers();
    },
    getOne: async (id: string): Promise<UserResponse> =>{
        return await findUserById(id);
    },
    create: async (data: UserRequest): Promise<void> =>{
        await saveUser(data);
    },
    update: async (id: string, data: UserRequest): Promise<void> =>{
        await updateUser(id , data);
    },
    delete: async (id: string): Promise<void> =>{
        await deleteUser(id);
    }
};
export default userDataProvider;