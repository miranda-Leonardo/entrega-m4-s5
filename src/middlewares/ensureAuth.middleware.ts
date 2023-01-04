import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../errors/app.error';
import 'dotenv/config';

const ensureAuthMiddleware = async ( req: Request, res: Response, next: NextFunction ) => {
    let token = req.headers.authorization;

    if( !token ) {
        throw new AppError( 'Invalid token', 401 );
    };

    token = token.split(' ')[1];

    jwt.verify( token, String( process.env.SECRETE_KEY ), ( error: any, decoded: any ) => {
        if( error ) {
            throw new AppError( error.message, 401 );
        };

        req.user = {
            id: decoded.sub
        };

        return next();
    });
};

export { ensureAuthMiddleware };