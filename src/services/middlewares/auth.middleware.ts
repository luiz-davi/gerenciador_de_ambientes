import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { BaseService } from "@services/base_service";
import { PrismaClient } from "@prisma/client";

type JwtPayLoad = {
  id: number
}
class AuthMiddleware {

  async call(req: Request, res: Response, next: NextFunction){
    const prisma = new PrismaClient();
    const { authorization } = req.headers;

    if(!authorization) { return res.status(401).json({ error: { message: 'Token inválido.' } }) }

    const token = authorization.split(' ')[1];

    try {
      const { id } = jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPayLoad;

      const user = await prisma.user.findUnique({
        where: { id }
      });

      if(!user){ return res.status(401).json({ error: { message: 'Token inválido.' } }) }  

      req.user = user;

      await prisma.$disconnect();
      next();
    } catch (error) {
      await prisma.$disconnect()
      return res.status(401).json({ error: { message: error.message } })
    }
  }
  
}

export default new AuthMiddleware();