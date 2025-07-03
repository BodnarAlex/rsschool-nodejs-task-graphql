import { GraphQLInputObjectType, GraphQLString } from "graphql";

// input ChangePostInput {
//   title: String
//   content: String
// }

export const ChangePostInput = new GraphQLInputObjectType({
  name: "ChangePostInput",
  fields: () => ({
    title: {type:GraphQLString},
    content: {type: GraphQLString},
  })
})

