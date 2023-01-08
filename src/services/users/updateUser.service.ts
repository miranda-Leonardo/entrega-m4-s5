import AppDataSource from '../../data-source';
import { User } from '../../entities/users.entity';
import { AppError } from '../../errors/app.error';
import { IUserResponse, IUserUpdate } from '../../interfaces/users';

const updateUserService = async ( userData: IUserUpdate, paramsId: string, userId: string ): Promise<IUserResponse> => {
    if( !Object.keys(userData).length ) {
        throw new AppError( 'You cannot update this data!', 401 );
    };

    if( Object.keys(userData).includes('isAdm' || 'id' || 'isActive') ) {
        throw new AppError( 'You cannot update this data!', 401 );
    };

    const userRepository = AppDataSource.getRepository(User);

    const findUser = await userRepository.findOneBy({ id: userId });
    if( !findUser?.isAdm && ( userId !== paramsId ) ) {
        throw new AppError( "You don't have admin permission!", 401 );
    };

    const findUserParams = await userRepository.findOneBy({ id: paramsId });
    if( !findUserParams ) {
        throw new AppError( 'User not exists!', 404 );
    };

    await userRepository.update({ id: paramsId }, userData);
    const userResponse = Object.assign(findUserParams, userData);

    return userResponse;
};

export { updateUserService };