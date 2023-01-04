import { NextFunction, Request, Response } from 'express';
import AppDataSource from '../data-source';
import { User } from '../entities/users.entity';
import { AppError } from '../errors/app.error';
import { IUserResponse } from '../interfaces/users';

const ensureIsAdmMiddleware =async ( req: Request, res: Response, next: NextFunction) => {
    const { id } = req.user;

    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOneBy({ id: id });

    if( !user?.isAdm ) {
        throw new AppError( 'You are not admin', 403 );
        
    };

    return next();
};

export { ensureIsAdmMiddleware };