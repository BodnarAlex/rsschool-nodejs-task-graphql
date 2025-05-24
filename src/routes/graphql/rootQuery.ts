import { GraphQLFloat, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { Profile } from "./types/profile/profile.js";
import { UUIDType } from "./types/uuid.js";

export const RootQueryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    hello: {
      type: GraphQLString,
      resolve: () => "Hello world!",
    },
    random: {
      type: GraphQLFloat,
      resolve: () => Math.random(),
    },
    profile: {
      type: Profile,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
    },
  },
});