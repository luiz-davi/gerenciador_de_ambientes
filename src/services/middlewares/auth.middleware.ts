import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { BaseService } from "@services/api/base_service";
import { PrismaClient } from "@prisma/client";

type JwtPayLoad = {
  id: number
}
class AuthMiddleware {

  async call(req: Request, res: Response, next: NextFunction){
    const prisma = new PrismaClient();
    const { authorization } = req.headers;

    if(!authorization) return res.status(401).json({ error: { message: 'Token inválido.' } });

    const token = authorization.split(' ')[1];

    try {
      const { id } = jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPayLoad;

      const user = await prisma.user.findUnique({
        where: { id }
      });

      if(!user) return res.status(401).json({ error: { message: 'Token inválido.' } });
      if(!user.verified_email) return res.status(401).json({ error: { message: 'Email não verificado' } })

      req.user = user;

      next();
    } catch (error) {      
      return res.status(401).json({ error: { message: error.message } })
    }
  }

  async call_user(req: Request, res: Response, next: NextFunction){
    const prisma = new PrismaClient();
    const { authorization } = req.headers;

    if(!authorization) return res.status(401).json({ error: { message: 'Token inválido.' } });

    const token = authorization.split(' ')[1];

    try {

      const { id } = jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPayLoad;

      const user = await prisma.user.findUnique({
        where: { id }
      });

      if(!user) return res.status(401).json({ error: { message: 'Token inválido.' } });

      req.user = user;

      next();
    } catch (error) {
      return res.status(401).json({ error: { message: error.message } })
    }
  }
  
}

export default new AuthMiddleware();