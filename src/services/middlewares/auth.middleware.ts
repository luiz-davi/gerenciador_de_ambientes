import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { BaseService } from "@services/base_service";


type JwtPayLoad = {
  id: number
}

class AuthMiddleware extends BaseService {

  async call(req: Request, res: Response, next: NextFunction){
    const { authorization } = req.headers;  

    if(!authorization) { return res.status(401).json({ error: { message: 'Token inválido.' } }) }

    const token = authorization.split(' ')[1];

    try {
      const { id } = jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPayLoad;

      const user = await this.prisma.user.findUnique({
        where: { id }
      });

      if(!user){ return res.status(401).json({ error: { message: 'Token inválido.' } }) }  

      req.user = user;
      await this.prisma.$disconnect();

      next();
    } catch (error) {
      await this.prisma.$disconnect();
      return res.status(401).json({ error: { message: error.message } })
    }
  }
  
}

export default new AuthMiddleware();