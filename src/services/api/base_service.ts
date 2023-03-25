import { PrismaClient } from "@prisma/client";
import prisma from "@config/prisma_connection"

export class BaseService {
  prisma: PrismaClient;

  constructor(){
    this.prisma = prisma;
  }
}