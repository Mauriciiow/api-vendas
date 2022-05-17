import { Request, Response } from "express";
import ResetPasswordService from "../services/ResetPasswordService";

class ResetPasswordController{
    public async create(request: Request, response: Response): Promise<Response>{
        const {token, password} = request.body
      
        const resetPassword = new ResetPasswordService()

         await resetPassword.execute({token, password})
       
        
       return response.status(204).json()
    }

}

export default ResetPasswordController

