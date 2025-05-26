import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { MemberType } from "./member/MemberType.js";
import { MemberTypeId } from "./member/MemberTypeId.js";
import { UUIDType } from "./uuid.js";
import { Context, IDType } from "./context/context.js";
import { Post } from "./post/postType.js";
import { User } from "./user/user.js";
import { Profile } from "./profile/profile.js";
import { parseResolveInfo, ResolveTree, simplifyParsedResolveInfoFragmentWithType } from 'graphql-parse-resolve-info';

// type RootQueryType {
//   memberTypes: [MemberType!]!
//   memberType(id: MemberTypeId!): MemberType
//   users: [User!]!
//   user(id: UUID!): User
//   posts: [Post!]!
//   post(id: UUID!): Post
//   profiles: [Profile!]!
//   profile(id: UUID!): Profile
// }

export const RootQueryType = new GraphQLObjectType<unknown, Context>({
  name: "RootQueryType",
  fields: {
    memberTypes: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(MemberType))),
      resolve: async (parent, args, context) => {
        const data = await context.prisma.memberType.findMany();
        return data;
      },
    },

    memberType: {
      type: MemberType,
      args: {
        id: {type: new GraphQLNonNull(MemberTypeId)},
      },
      resolve: async (parent, { id }: IDType, context) => {
        const data = await context.prisma.memberType.findUnique({
          where: {id},
        });
        return data;
      },
    },

    users: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(User))),
     resolve: async (_source, _args, context: Context, info) => {
        const parsedInfo = parseResolveInfo(info) as ResolveTree;
        const { fields } = simplifyParsedResolveInfoFragmentWithType(parsedInfo, User);

        const includeRelations = {
          subscribedToUser: !!fields['subscribedToUser'],
          userSubscribedTo: !!fields['userSubscribedTo'],
        };

        const users = await context.prisma.user.findMany({
          include: {
            subscribedToUser: includeRelations.subscribedToUser,
            userSubscribedTo: includeRelations.userSubscribedTo,
          },
        });

        users.forEach((user) => {
          if (includeRelations.subscribedToUser) {
            const subscribers = users.filter((person) =>
              person.subscribedToUser.some((sub) => sub.subscriberId === user.id),
            );
            context.loaders.subscribedToUserLoader.prime(user.id, subscribers);
          }

          if (includeRelations.userSubscribedTo) {
            const authors = users.filter((person) =>
              person.userSubscribedTo.some((sub) => sub.authorId === user.id),
            );
            context.loaders.userSubscribedToLoader.prime(user.id, authors);
          }
        });

        return users;
        },
      },

    user: {
      type: User,
      args: {
        id: {type: new GraphQLNonNull(UUIDType)},
      },
      resolve: async (parent, {id}: IDType, context) => {
        const data = await context.prisma.user.findUnique({
        where: {id},
      });
        return data;
      },
    },

    posts: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Post))),
      resolve: async (parent, args, context) => {
        const data = await context.prisma.post.findMany();
        return data;
      },
    },
    post: {
      type: Post,
      args: {
        id: {type: new GraphQLNonNull(UUIDType)},
      },
      resolve: async (parent, {id}: IDType, context) => {
        const data = await context.prisma.post.findUnique({
        where: {id},
      });
        return data;
      },
    },

    profiles: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Profile))),
      resolve: async(parent, args, context) => {
        const data = await context.prisma.profile.findMany();
        return data;
      }
    },

    profile: {
      type: Profile,
      args: {
        id: {type: new GraphQLNonNull(UUIDType)},
      },
      resolve: async (parent, {id}: IDType, context) => {
        const data = await context.prisma.profile.findUnique({
        where: {id},
      });
      return data;
      },
    }
  },
});