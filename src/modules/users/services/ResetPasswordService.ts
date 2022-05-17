import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import {isAfter, addHours} from 'date-fns'
import UsersRepository from "../typeorm/repositories/UsersRepository";
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository'
import { hash } from "bcryptjs";

interface IRequest {
    token: string;
    password: string;
}

class ResetPasswordService {
    public async execute({token, password}: IRequest ): Promise<void>{
        const usersRepository = getCustomRepository(UsersRepository);
        const userTokenRespository = getCustomRepository(UserTokensRepository);

        const tokenExists = await userTokenRespository.findByToken(token)

        if (!tokenExists) {
            throw new AppError('Token de usuario nao existe')
        }

        const user = await usersRepository.findById(tokenExists.user_id)

        if (!user) {
            throw new AppError('Usuario nao existe')
        }

        const tokenCreatetAt = tokenExists.created_at
        const compareDate = addHours(tokenCreatetAt, 2)

        if (isAfter(Date.now(), compareDate)) {
            throw new AppError('Token expirado')
        }
        const hashedPassword = await hash(password, 8)

        user.password = hashedPassword

        await usersRepository.save(user)
    }
}

export default ResetPasswordService