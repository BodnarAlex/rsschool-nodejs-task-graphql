
import { GraphQLFloat, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "../uuid.js";
import { Profile } from "../profile/profile.js";
import { Post } from "../post/postType.js";
import { Context, UserType } from "../context/context.js";

// type User {
//   id: UUID!
//   name: String!
//   balance: Float!
//   profile: Profile
//   posts: [Post!]!
//   userSubscribedTo: [User!]!
//   subscribedToUser: [User!]!
// }


export const User = new GraphQLObjectType<UserType, Context>({
  name: "User",
  fields : () => ({
    id: {type: new GraphQLNonNull(UUIDType)},
    name: {type: new GraphQLNonNull(GraphQLString)},
    balance: {type: new GraphQLNonNull(GraphQLFloat)},
    profile: {
      type: Profile,
      resolve: async (user, _, context) => {
        return context.prisma.profile.findUnique({ where: { userId: user.id }});
      },
    },
    posts: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Post))),
      resolve: async (user, _, context) => {
        return context.prisma.post.findMany({ where: { authorId: user.id }});
      },
    },
    userSubscribedTo: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(User))),
      resolve: async (user, _, context) => {
        return context.prisma.user.findMany({
        where: {
          subscribedToUser: {
            some: {
              subscriberId: user.id
            },
          },
        },
      });
      },
    },
    subscribedToUser: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(User))),
      resolve: async (user, _, context) => {
        return context.prisma.user.findMany({
        where: {
           userSubscribedTo: {
            some: {
              authorId: user.id,
            },
          },
        },
      });
      },
    },
  })
})
