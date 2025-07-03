import { PrismaClient } from '@prisma/client';
import { createLoaders } from '../loader/createLoader.js';

export interface Context {
  prisma: PrismaClient;
  loaders: ReturnType<typeof createLoaders>;
}

export type IDType = {
  id: string,
};

export type UserType = {
  id: string;
  userId: string;
  name: string;
  balance: number;
};

export type PostType = {
  id: string;
  title: string;
  content: string;
  authorId: string;
};

export type ProfileType = {
  id: string;
  isMale: boolean;
  yearOfBirth: number;
  userId: string;
  memberTypeId: string;
};

export type UserMutation = {
  name: string,
  balance: number,
};

export type ProfileMutation = {
  isMale: boolean,
  yearOfBirth: number,
  userId: string,
  memberTypeId: string,
};

export type PostMutation = {
  title: string;
  content: string;
  authorId: string;
};