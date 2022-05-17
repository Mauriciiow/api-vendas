import { Request, Response } from "express";
import SendForgotPasswordEmailService from "../services/SendForgotPasswordEmailService";

class ForgotPasswordController{
    public async create(request: Request, response: Response): Promise<Response>{
        const {email} = request.body
      
        const SendForgotPasswordEmail = new SendForgotPasswordEmailService()

        const token = await SendForgotPasswordEmail.execute({email})
       
        
       return response.json(token)
    }

}

export default ForgotPasswordController

