import { GraphQLFloat, GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from "graphql";

// input CreateUserInput {
//   name: String!
//   balance: Float!
// }

export const CreateUserInput = new GraphQLInputObjectType({
  name: "CreateUserInput",
  fields: () => ({
    name: {type: new GraphQLNonNull(GraphQLString)},
    balance: {type:  new GraphQLNonNull(GraphQLFloat)},
  })
})
