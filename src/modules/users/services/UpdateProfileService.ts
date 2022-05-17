import AppError from "@shared/errors/AppError";
import User from "../typeorm/entities/User";
import { getCustomRepository } from "typeorm";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import {compare, hash} from 'bcryptjs'

interface IRequest{
    user_id: string;
    name: string;
    email: string;
    password: string;
    old_password: string;
}

class UpdateProfileService{
    public async update({user_id, name, email, password, old_password}:IRequest): Promise<User | undefined>{
        const usersRepository = getCustomRepository(UsersRepository)

        const user = await usersRepository.findById(user_id)

        if (!user) {
            throw new AppError('Usuario nao encontrado')
        }

        const userUpdateEmail = await usersRepository.findByEmail(email)

        if (userUpdateEmail && userUpdateEmail.id !== user_id) {
            throw new AppError('Ja existe um usuario com este email')
        }

        if (password && !old_password) {
            throw new AppError('Digite a antiga senha')
        }

        if (password && old_password) {
            const chekOldPassword = await compare(old_password, user.password)
            
            if (!chekOldPassword) {
                throw new AppError('Senha antiga esta incorreta')
            }
            
            user.password = await hash(password, 8)
            
        }
        user.name = name
        user.email = email
        
        await usersRepository.save(user)
        
        return user
    }
}

export default UpdateProfileService