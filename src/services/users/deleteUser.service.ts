import AppDataSource from "../../data-source";
import { User } from "../../entities/users.entity";
import { AppError } from "../../errors/app.error";

const deleteUserService =async ( paramsId: string): Promise<object> => {
    if( paramsId.length !== 36 ) {
        throw new AppError( 'User not exists!', 404 );
    };

    const userRepository = AppDataSource.getRepository(User);

    const paramsUser = await userRepository.findOneBy({ id: paramsId });
    if( !paramsUser ) {
        throw new AppError( 'User not exists', 404 );
    };

    if( !paramsUser.isActive ) {
        throw new AppError( 'User already deleted!', 400 );
    };

    await userRepository.update( { id: paramsUser.id }, { isActive: false } );
    
    return {};
};

export { deleteUserService };