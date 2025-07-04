import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { CreateUserInput } from "./user/CreateUserInput.js";
import { User } from "./user/user.js";
import { Context, PostMutation, ProfileMutation, UserMutation } from "./context/context.js";
import { Profile } from "./profile/profile.js";
import { CreateProfileInput } from "./profile/CreateProfileInput.js";
import { Post } from "./post/postType.js";
import { CreatePostInput } from "./post/CreatePostInput.js";
import { UUIDType } from "./uuid.js";
import { ChangeUserInput } from "./user/ChangeUserInput.js";
import { ChangeProfileInput } from "./profile/ChangeProfileInput.js";
import { ChangePostInput } from "./post/ChangePostInput.js";

// type Mutations {
//   createUser(dto: CreateUserInput!): User!
//   createProfile(dto: CreateProfileInput!): Profile!
//   createPost(dto: CreatePostInput!): Post!
//   changePost(id: UUID!, dto: ChangePostInput!): Post!
//   changeProfile(id: UUID!, dto: ChangeProfileInput!): Profile!
//   changeUser(id: UUID!, dto: ChangeUserInput!): User!
//   deleteUser(id: UUID!): String!
//   deletePost(id: UUID!): String!
//   deleteProfile(id: UUID!): String!
//   subscribeTo(userId: UUID!, authorId: UUID!): String!
//   unsubscribeFrom(userId: UUID!, authorId: UUID!): String!
// }

export const Mutations = new GraphQLObjectType<unknown, Context>({
 name: "Mutation",
  fields: {
    createUser: {
      type: new GraphQLNonNull(User),
      args: {
        dto: { type: new GraphQLNonNull(CreateUserInput) },
      },
      resolve: (parent: unknown,  args: { dto: UserMutation }, context) => {
        return context.prisma.user.create({
          data: args.dto,
        });
      },
    },
    createProfile: {
      type: new GraphQLNonNull(Profile),
      args: {
        dto: { type: new GraphQLNonNull(CreateProfileInput) },
      },
      resolve: (parent: unknown, args: { dto: ProfileMutation }, context) => {
        return context.prisma.profile.create({
          data: args.dto,
        });
      },
    },
    createPost: {
      type: new GraphQLNonNull(Post),
      args: {
        dto: { type: new GraphQLNonNull(CreatePostInput) },
      },
      resolve: (parent: unknown,  args: { dto: PostMutation }, context) => {
        return context.prisma.post.create({
          data: args.dto,
        });
      },
    },
    changeUser: {
      type: new GraphQLNonNull(User),
      args: {
        id: {type: new GraphQLNonNull(UUIDType)},
        dto: { type: new GraphQLNonNull(ChangeUserInput) },
      },
      resolve: (parent: unknown, args: { id: string; dto: UserMutation }, context) => {
        const { id, dto } = args;
        return context.prisma.user.update({
          where: { id },
          data: dto,
        });
      },
    },
    changeProfile: {
      type: new GraphQLNonNull(Profile),
      args: {
        id: {type: new GraphQLNonNull(UUIDType)},
        dto: { type: new GraphQLNonNull(ChangeProfileInput) },
      },
      resolve: (parent: unknown, args: { id: string; dto: ProfileMutation }, context) => {
        const { id, dto } = args;
        return context.prisma.profile.update({
          where: { id },
          data: dto,
        });
      },
    },
    changePost: {
      type: new GraphQLNonNull(Post),
      args: {
        id: {type: new GraphQLNonNull(UUIDType)},
        dto: { type: new GraphQLNonNull(ChangePostInput) },
      },
      resolve: (parent: unknown, args: { id: string; dto: PostMutation }, context) => {
        const { id, dto } = args;
        return context.prisma.post.update({
          where: { id },
          data: dto,
        });
      },
    },
    deleteUser: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        id: {type: new GraphQLNonNull(UUIDType)},
      },
      resolve: async (parent: unknown, args: { id: string }, context) => {
        await context.prisma.user.delete({
        where: { id: args.id },
        });
        return "Deleted";

      },
    },
    deleteProfile: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        id: {type: new GraphQLNonNull(UUIDType)},
      },
      resolve: async (parent: unknown, args: { id: string }, context) => {
        await context.prisma.profile.delete({
        where: { id: args.id },
        });
        return "Deleted";
      },
    },
    deletePost: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        id: {type: new GraphQLNonNull(UUIDType)},
      },
      resolve: async (parent: unknown, args: { id: string }, context) => {
        await context.prisma.post.delete({
        where: { id: args.id },
        });
        return "Deleted";
      },
    },
 subscribeTo: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_parent: unknown, args: {userId: string ,authorId: string }, context): Promise<string> => {
        await context.prisma.user.update({
          where: { id: args.userId },
          data: {
            userSubscribedTo: {
              create: {
                authorId: args.authorId,
              },
            },
          },
        });
        return "Unsubscribe done";
      },
    },
    unsubscribeFrom: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_parent: unknown, args: {userId: string ,authorId: string }, context): Promise<string> => {
        await context.prisma.user.update({
          where: { id: args.userId },
          data: {
            userSubscribedTo: {
              delete: {
                subscriberId_authorId: {
                  subscriberId: args.userId,
                  authorId: args.authorId,
                },
              },
            },
          },
        });
        return "Unsubscribe done";
      },
    },
  },
});
