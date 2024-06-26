import AppDataSource from '../../data-source';
import { User } from '../../entities/users.entity';
import { AppError } from '../../errors/app.error';
import { IUserRequest, IUserResponse } from '../../interfaces/users';
import { responseUserSerializer } from '../../serializers/user.serializer';

const createUserService = async (userData: IUserRequest): Promise<IUserResponse> => {
    const userRepository = AppDataSource.getRepository(User);

    const findUser = await userRepository.findOneBy({ email: userData.email })
    if (findUser) {
        throw new AppError( 'User already exists!', 409 );
    };

    const createdUser = userRepository.create(userData);
    await userRepository.save(createdUser);

    const userResponse = await responseUserSerializer.validate( createdUser, { stripUnknown: true } );

    return userResponse;
};

export { createUserService };