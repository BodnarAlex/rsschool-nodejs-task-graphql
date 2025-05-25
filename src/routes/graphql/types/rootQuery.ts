import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { MemberType } from "./member/MemberType.js";
import { MemberTypeId } from "./member/MemberTypeId.js";
import { User } from "./user/user.js";
import { UUIDType } from "./uuid.js";
import { Context, IDType } from "./context/context.js";

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
      resolve: async (parent, args, context) => {
        const data = await context.prisma.user.findMany();
        return data;
      },
    },
    user: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(MemberType))),
      args: {
        id: {type: new GraphQLNonNull(UUIDType)},
      },
      resolve: async (parent, args, context) => {
        const data = await context.prisma.user.findMany();
        return data;
      },
    },
  },
});