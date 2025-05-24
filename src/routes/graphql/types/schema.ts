import { GraphQLFloat, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import { ProfileType } from "./profile.js";
import { UUIDType } from "./uuid.js";

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      hello: {
        type: GraphQLString,
        resolve: () => 'Hello world!'
      },
        random: {
        type: GraphQLFloat,
        resolve: () => Math.random()
      },
       profile: {
        type: ProfileType,
        args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
       }
    },
  }),
});