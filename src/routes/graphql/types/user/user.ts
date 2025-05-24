import { GraphQLFloat, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "../uuid.js";
import { Profile } from "../profile/profile.js";
import { Post } from "../post/postType.js";

// type User {
//   id: UUID!
//   name: String!
//   balance: Float!
//   profile: Profile
//   posts: [Post!]!
//   userSubscribedTo: [User!]!
//   subscribedToUser: [User!]!
// }

export const User = new GraphQLObjectType({
  name: "User",
  fields : () => ({
    id: {type: new GraphQLNonNull(UUIDType)},
    name: {type: new GraphQLNonNull(GraphQLString)},
    balance: {type: new GraphQLNonNull(GraphQLFloat)},
    profile: {type: Profile},
    posts: {type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Post)))},
    userSubscribedTo: {type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(User)))},
    subscribedToUser: {type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(User)))},
  })
})
