import { MemberType, PrismaClient, Profile } from '@prisma/client';
import DataLoader from 'dataloader';
import { Context } from 'vm';

export function createContext(prisma: PrismaClient): Context {
  return {
    prisma,
    loaders: createLoaders(prisma),
  };
}

export function createLoaders(prisma: PrismaClient) {
  return {
    profileLoader: new DataLoader<string, Profile | null>(async (userIds) => {
      const profiles = await prisma.profile.findMany({
        where: { userId: { in: [...userIds] } },
      });
      const map = new Map(profiles.map(p => [p.userId, p]));
      return userIds.map(id => map.get(id) ?? null);
    }),

    memberTypeLoader: new DataLoader<string, MemberType | null>(async (ids) => {
      const types = await prisma.memberType.findMany({
        where: { id: { in: [...ids] } },
      });
      const map = new Map(types.map(m => [m.id, m]));
      return ids.map(id => map.get(id) ?? null);
    }),
  };
}