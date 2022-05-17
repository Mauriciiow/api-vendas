import AppError from "@shared/errors/AppError";
import path from "path";
import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import uploadConfig from '@config/upload'
import fs  from "fs";

interface IRequest {
    user_id: string;
    avatarFilename: string;
   
}

class UpdateAvatarService {
    public async execute({user_id, avatarFilename}: IRequest ): Promise<User>{
        const usersRepository = getCustomRepository(UsersRepository);
       
        const user = await usersRepository.findById(user_id)

        if (!user) {
            throw new AppError('Usuario nao encontrado')
        }

        if (user.avatar) {
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)

            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath)
            }
        }
        user.avatar = avatarFilename

        await usersRepository.save(user)

        return user
}
}

export default UpdateAvatarService