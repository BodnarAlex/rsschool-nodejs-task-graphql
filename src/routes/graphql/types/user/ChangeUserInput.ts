import { GraphQLFloat, GraphQLInputObjectType, GraphQLString } from "graphql";

// input ChangeUserInput {
//   name: String
//   balance: Float
// }

export const ChangeUserInput = new GraphQLInputObjectType({
  name: "ChangeUserInput",
  fields: () => ({
    name: {type: GraphQLString},
    balance: {type: GraphQLFloat},
  })
})
