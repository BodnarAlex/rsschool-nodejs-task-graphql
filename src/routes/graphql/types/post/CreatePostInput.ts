import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from "graphql";
import { UUIDType } from "../uuid.js";

// input CreatePostInput {
//   title: String!
//   content: String!
//   authorId: UUID!
// }

export const CreatePostInput  = new GraphQLInputObjectType({
  name: "CreatePostInput",
  fields: () => ({
    title: {type: new GraphQLNonNull(GraphQLString)},
    content: {type:  new GraphQLNonNull(GraphQLString)},
    authorId: {type:  new GraphQLNonNull(UUIDType)},
  })
})

