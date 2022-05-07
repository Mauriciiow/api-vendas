import AppError from "@shared/errors/AppError";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse{
    user: User;
    token: string;
}

class CreateSessionsService {
    public async execute({email, password}: IRequest ): Promise<IResponse>{
        const usersRepository = getCustomRepository(UsersRepository);
        const user = await usersRepository.findByEmail(email)
        
        if (!user) {
            throw new AppError('E-mail ou senha estao incorretos', 401)
        }

        const passwordConfrimed = await compare(password, user.password)

        if (!passwordConfrimed) {
            throw new AppError('E-mail ou senha estao incorretos', 401)
        }

        const token = sign({}, 'a5cb9c60c46e0a73f73c6f66aa73d1cd', {
            subject: user.id,
            expiresIn: '1d'
        })
        return {
            user, 
            token
        }
    }
}

export default CreateSessionsService