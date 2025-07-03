import { GraphQLBoolean, GraphQLInputObjectType, GraphQLInt} from "graphql";
import { MemberTypeId } from "../member/MemberTypeId.js";

// input ChangeProfileInput {
//   isMale: Boolean
//   yearOfBirth: Int
//   memberTypeId: MemberTypeId
// }

export const ChangeProfileInput = new GraphQLInputObjectType({
  name: "ChangeProfileInput",
  fields: () => ({
    isMale: {type: GraphQLBoolean},
    yearOfBirth: {type: GraphQLInt},
    memberTypeId: {type: MemberTypeId},
  })
})
