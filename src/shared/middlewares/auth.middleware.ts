import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";


type JwtPayLoad = {
  id: number
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const prisma = new PrismaClient();
  const { authorization } = req.headers;  

  if(!authorization) { return res.status(404).json({ error: { message: 'Token inválido.' } }) }

  const token = authorization.split(' ')[1];

  try {
    const { id } = jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPayLoad;

    const user = await prisma.user.findUnique({
      where: { id }
    });

    if(!user){ return res.status(404).json({ error: { message: 'Token inválido.' } }) }  

    req.user = user;

    next();
  } catch (error) {
    return res.status(404).json({ error: { message: error.message } })
  }
  
}