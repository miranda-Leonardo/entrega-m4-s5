import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const ensureAuthMiddleware = async ( req: Request, res: Response, next: NextFunction ) => {
    let token = req.headers.authorization;

    if( !token ) {
        return res.status(401).json({ message: 'Invalid token' });
    };

    token = token.split(' ')[1];
    
    jwt.verify( token, String(process.env.SECRET_KEY), ( error: any, decoded: any ) => {
        if( error ) {
            return res.status(401).json({ message: error.message });
        };

        req.user = {
            id: decoded.sub as string
        };

        return next();
    });
};

export { ensureAuthMiddleware };