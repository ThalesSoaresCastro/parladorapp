import {
    Response, 
    Request, 
    NextFunction
} from 'express';

import jwt from 'jsonwebtoken';

interface TokenPayload{
    id:string;
    iat:number;
    exp:number;
}

export default function authMiddleware(
    req: Request, res: Response, next: NextFunction){

        const {authorization} = req.headers;
        
        if(!authorization){
            res.status(401).json({message: "Unauthorized user" });
            return;
        }

        const token = authorization.replace('Bearer', '').trim();

        try{
            //criando token de autenticação
            const secret:string = process.env.SECRET!;
            const data = jwt.verify(token, secret);

            const { id } = data as TokenPayload;

            req.userId = id;
            
            return next();

        }catch{
            res.status(401).json({message: "Unauthorized user" });
            return;
        }
}