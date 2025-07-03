import { MemberType, Post, PrismaClient, Profile, User } from '@prisma/client';
import DataLoader from 'dataloader';
import { Context } from '../context/context.js';

export function createContext(prisma: PrismaClient): Context {
  return {
    prisma,
    loaders: createLoaders(prisma),
  };
}

export function createLoaders(prisma: PrismaClient) {
  return {
    memberTypeLoader: new DataLoader<string, MemberType | null>(async (ids) => {
      const types = await prisma.memberType.findMany({
        where: { id: { in: [...ids] } },
      });
      const map = new Map(types.map(m => [m.id, m]));
      return ids.map(id => map.get(id) ?? null);
    }),

    profileLoader: new DataLoader<string, Profile | null>(async (userIds) => {
      const profiles = await prisma.profile.findMany({
        where: { userId: { in: [...userIds] } },
      });
      const map = new Map(profiles.map(p => [p.userId, p]));
      return userIds.map(id => map.get(id) ?? null);
    }),

    postLoader: new DataLoader<string, Post[]>(async (authorIds) => {
      const posts = await prisma.post.findMany({
        where: { authorId: { in: [...authorIds]}},
      });
      return authorIds.map((id) => {
        const match = posts.filter((p) => p.authorId === id);
        return match ?? null;
      });
    }),

    userSubscribedToLoader: new DataLoader<string, User[]>(async (userIds) => {
      const users = await prisma.subscribersOnAuthors.findMany({
        where: {subscriberId: {in: [...userIds]}},
        include: { author: true },
      });
      const group = new Map<string, User[]>();
      for (const sub of users) {
        const arr = group.get(sub.subscriberId) ?? [];
        arr.push(sub.author);
        group.set(sub.subscriberId, arr);
      }

      return userIds.map((id) => group.get(id) ?? []);
    }),

    subscribedToUserLoader: new DataLoader<string, User[]>(async (userIds) => {
      const users = await prisma.subscribersOnAuthors.findMany({
        where: {authorId: {in: [...userIds]}},
        include: { subscriber: true },
      });
      return userIds.map((id) => {
        const match = users.filter((p) => p.authorId === id);
        return match.map((m) => m.subscriber) ?? null;
      });
    }),
  };
}