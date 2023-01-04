import AppDataSource from "../../data-source";
import { User } from "../../entities/users.entity";
import { IUserResponse } from "../../interfaces/users";
import { listUsersSerializer } from "../../serializers/user.serializer";

const listUsersService = async (): Promise<IUserResponse[] | undefined> => {
    const userRepository = AppDataSource.getRepository(User);
    
    const users = await userRepository.find();

    const listUsers = await listUsersSerializer.validate( users, {
        stripUnknown: true
    });

    return listUsers;
};

export { listUsersService };