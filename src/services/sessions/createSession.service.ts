import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import AppDataSource from '../../data-source';
import { User } from '../../entities/users.entity';
import { AppError } from '../../errors/app.error';
import { IUserLogin } from '../../interfaces/users';
import 'dotenv/config';

const createSessionService = async ( { email, password }: IUserLogin ): Promise<string> => {
    const userRepository = AppDataSource.getRepository(User);

    const findUser = await userRepository.findOneBy({ email: email });    
    if( !findUser ) {
        throw new AppError( 'User or password invalid!', 403 );
    };

    const passwordMatch = await compare( password, findUser.password );
    if ( !passwordMatch ) {
        throw new AppError( 'User or password invalid!', 403 );        
    };

    if ( !findUser.isActive ) {
        throw new AppError( 'Inactive user!', 400 );
    };
    
    const token = jwt.sign( {}, String( process.env.SECRET_KEY ), {
            subject: String(findUser.id),
            expiresIn: '24h'
        }
    );
    
    return token;
};

export { createSessionService };