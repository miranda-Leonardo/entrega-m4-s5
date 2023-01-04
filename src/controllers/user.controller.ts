import { Request, Response } from 'express';
import { IUserRequest } from '../interfaces/users';
import { createUserService } from '../services/users/createUser.service';
import { deleteUserService } from '../services/users/deleteUser.service';
import { listUsersService } from '../services/users/listUsers.service';
import { updateUserService } from '../services/users/updateUser.service';

const createUserController = async ( req: Request, res: Response ) => {
    const userData: IUserRequest = req.body;
    const newUser = await createUserService( userData );
    return res.status(201).json(newUser);
};

const listUsersController = async ( req: Request, res: Response ) => {
    const users = await listUsersService();
    return res.json(users);
};

const updateUserController = async ( req: Request, res: Response ) => {
    const userData: IUserRequest = req.body;
    const paramsId: string = req.params.id;
    const userId: string = req.user.id;
    const updatedUser = await updateUserService( userData, paramsId, userId );
    return res.json(updatedUser);
};

const deleteUserController =async ( req: Request, res: Response ) => {
    const paramsId: string = req.params.id;
    const deletedUser = await deleteUserService( paramsId );
    return res.status(204).json(deletedUser);
}

export { createUserController, listUsersController, updateUserController, deleteUserController };