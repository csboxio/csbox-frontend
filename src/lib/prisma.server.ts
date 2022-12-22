import Prisma, * as PrismaScope from "@prisma/client";

const PrismaClient = Prisma?.PrismaClient || PrismaScope?.PrismaClient;
const prismaServer = new PrismaClient();
export default prismaServer;

export const PrismaClientKnownRequestError =
  Prisma?.Prisma.PrismaClientKnownRequestError ||
  PrismaScope?.Prisma.PrismaClientKnownRequestError;