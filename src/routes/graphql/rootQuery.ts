import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { MemberType } from "./types/member/MemberType.js";
import { MemberTypeId } from "./types/member/MemberTypeId.js";
import { PrismaClient } from "@prisma/client";

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

export const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    memberTypes: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(MemberType))),
      resolve: async (parent, args, {prisma}: {prisma: PrismaClient}) => {
        const data = await prisma. memberType.findMany();
        return data;
      },
    },
    memberType: {
      type: MemberType,
      args: {
        id: {type: new GraphQLNonNull(MemberTypeId)},
      },
      resolve: async (parent, { id }: { id: string }, {prisma}: {prisma: PrismaClient}) => {
        const data = await prisma.memberType.findUnique({
          where: {id},
        });
        return data;
      },
    },
  },
});