import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "../uuid.js";
import { Context, PostType } from "../context/context.js";

// type Post {
//   id: UUID!
//   title: String!
//   content: String!
// }

export const Post = new GraphQLObjectType<PostType, Context>({
  name: "Post",
  fields: () => ({
    id: {type: new GraphQLNonNull(UUIDType)},
    title: {type: new GraphQLNonNull(GraphQLString)},
    content: {type: new GraphQLNonNull(GraphQLString)},
  })
})
