import { PrismaClient } from '@prisma/client';

export type Context = {
  prisma: PrismaClient;
};

export type IDType = {
  id: string,
};

export type UserType = {
  id: string;
  userId: string;
  name: string;
  balance: number;
};