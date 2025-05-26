import { GraphQLNonNull, GraphQLObjectType } from "graphql";
import { CreateUserInput } from "./user/CreateUserInput.js";
import { User } from "./user/user.js";
import { Context, PostMutation, ProfileMutation, UserMutation } from "./context/context.js";
import { Profile } from "./profile/profile.js";
import { CreateProfileInput } from "./profile/CreateProfileInput.js";
import { Post } from "./post/postType.js";
import { CreatePostInput } from "./post/CreatePostInput.js";

// type Mutations {
//   createUser(dto: CreateUserInput!): User!
//   createProfile(dto: CreateProfileInput!): Profile!
//   createPost(dto: CreatePostInput!): Post!
//   changePost(id: UUID!, dto: ChangePostInput!): Post!
//   changeProfile(id: UUID!, dto: ChangeProfileInput!): Profile!
//   changeUser(id: UUID!, dto: ChangeUserInput!): User!
//   deleteUser(id: UUID!): String!
//   deletePost(id: UUID!): String!
//   deleteProfile(id: UUID!): String!
//   subscribeTo(userId: UUID!, authorId: UUID!): String!
//   unsubscribeFrom(userId: UUID!, authorId: UUID!): String!
// }

export const Mutations = new GraphQLObjectType<unknown, Context>({
 name: "Mutation",
  fields: {
    createUser: {
      type: new GraphQLNonNull(User),
      args: {
        dto: { type: new GraphQLNonNull(CreateUserInput) },
      },
      resolve: (parent: unknown,  dto: UserMutation, context) => {
        return context.prisma.user.create({
          data: dto,
        });
      },
    },
    createProfile: {
      type: new GraphQLNonNull(Profile),
      args: {
        dto: { type: new GraphQLNonNull(CreateProfileInput) },
      },
      resolve: (parent: unknown,  dto: ProfileMutation, context) => {
        return context.prisma.profile.create({
          data: dto,
        });
      },
    },
    createPost: {
      type: new GraphQLNonNull(Post),
      args: {
        dto: { type: new GraphQLNonNull(CreatePostInput) },
      },
      resolve: (parent: unknown,  dto: PostMutation, context) => {
        return context.prisma.post.create({
          data: dto,
        });
      },
    },
  },
});
