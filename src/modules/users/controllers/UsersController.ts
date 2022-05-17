import { Request, Response } from "express";
import CreateUserService from "../services/CreateUserService";
import ListUserService from "../services/ListUserService";

class UsersController{
    public async index(request: Request, response: Response): Promise<Response>{
        const listUsers = new ListUserService()
        const user = await listUsers.execute()

        return response.json(user)
    }

    public async create(request: Request, response: Response): Promise<Response>{
        const {name, email, password} = request.body
      
        const createUser = new CreateUserService()

       const user = await createUser.execute({name, email, password})
       
        
       return response.json(user)
    }

}

export default UsersController

