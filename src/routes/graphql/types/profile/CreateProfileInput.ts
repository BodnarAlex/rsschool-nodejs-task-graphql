import { GraphQLBoolean, GraphQLInputObjectType, GraphQLInt, GraphQLNonNull } from "graphql";
import { UUIDType } from "../uuid.js";
import { MemberTypeId } from "../member/MemberTypeId.js";

// input CreateProfileInput {
//   isMale: Boolean!
//   yearOfBirth: Int!
//   userId: UUID!
//   memberTypeId: MemberTypeId!
// }

export const CreateProfileInput = new GraphQLInputObjectType({
  name: "CreateProfileInput",
  fields: () => ({
    isMale: {type: new GraphQLNonNull(GraphQLBoolean)},
    yearOfBirth: {type:  new GraphQLNonNull(GraphQLInt)},
    userId: {type:  new GraphQLNonNull(UUIDType)},
    memberTypeId: {type:  new GraphQLNonNull(MemberTypeId)},
  })
})
