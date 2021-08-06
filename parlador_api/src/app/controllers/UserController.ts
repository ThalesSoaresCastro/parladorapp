import{
    Request,
    Response,
}from 'express';

import{ getRepository } from 'typeorm';

import User  from '../models/User';

interface NewUser{
    id:string;
    name:string;
    password?:string;
    created_at:Date;
}

class UserController{

    //-----------------------------------------------------------
    async store(req: Request, res: Response){

        const repository = getRepository(User);

        //verificando se email já existe
        const {name, email, password} = req.body;

        const userExists = await repository.findOne({ where: { email } });
        
        if(userExists){
            res.status(409).json({message: "User exists" });
            return;
        }

        //pegando a data atual para salvar no banco
        const datenow = new Date().toISOString();
        
        const user = repository.create({
                                name:name, 
                                email:email, 
                                password:password,
                                created_at:datenow});
        
        try{
            await repository.save(user).catch(
                res => console.log(res)
            );
            
            //retirando password para enviar o user como retorno da requisição
            const user_return:NewUser = user;
            delete user_return.password;

            res.status(201).json({message:"Created user",data:user_return});
        }catch{
            res.status(500).json({message:"Error to save user", data:{}});
        }
    }
}

export default new UserController();