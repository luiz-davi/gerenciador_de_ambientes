import { PrismaClient } from "@prisma/client";

export class BaseMiddleware {
  prisma: PrismaClient;

  constructor(){
    this.prisma = new PrismaClient();
  }
}