import AppError from "@shared/errors/AppError";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "@config/auth";

interface ITokenPayload {
    iat: number;
    ext: number;
    sub: string;
}

export default function isAuthenticated(request:Request, Response: Response, next: NextFunction):void {
    const authHeader = request.headers.authorization

    if (!authHeader) {
        throw new AppError('JWT Token faltando')
    }

    const [, token] = authHeader.split(' ')

    try {
        const decodedoken = verify(token, authConfig.jwt.secret)

        const {sub} = decodedoken as ITokenPayload
        
       request.user = {
           id: sub
       }

        return next()
    } catch (error) {
        throw new AppError('JWT Token invalido')
    }

}