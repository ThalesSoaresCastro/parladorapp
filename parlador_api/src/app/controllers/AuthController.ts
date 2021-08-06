import{
    Request,
    Response,
}from 'express';
import{ getRepository } from 'typeorm';
import bcrypt from'bcryptjs';

import User from '@models/User';
import jwt from 'jsonwebtoken'; 

interface NewUser{
    id?:string;
    name?:string;
    email:string;
    password?:string;
    created_at:Date;
}

class AuthController{

    async authenticate(req: Request, res: Response){

        const repository = getRepository(User);

        //verificando se email já existe
        const {email, password} = req.body;

        const user = await repository.findOne({ where: { email } });

        if(!user){
            res.status(401).json({message: "Unauthorized user" });
            return;
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword){
            res.status(401).json({message: "Unauthorized user" });
            return;
        }

        //criando token de autenticação
        const secret:string = process.env.SECRET!;
        const token = jwt.sign({ id: user.id }, secret, { expiresIn:'1d' } );

        //excluindo password para envio dos dados
        const userData:NewUser = user; 
        delete userData.password;

        return res.status(200).json({
            message:'Sucess login',
            data:{
                user: userData,
                token:token,
            }
        });

    }
}

export default new AuthController();