import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { UUIDType } from "../uuid.js";
import { MemberType } from "../member/MemberType.js";

// type Profile {
//   id: UUID!
//   isMale: Boolean!
//   yearOfBirth: Int!
//   memberType: MemberType!
// }

export const Profile = new GraphQLObjectType({
  name: "Profile",
  fields : () => ({
    id: {type: new GraphQLNonNull(UUIDType)},
    isMale: {type: new GraphQLNonNull(GraphQLBoolean)},
    yearOfBirth: {type: new GraphQLNonNull(GraphQLInt)},
    memberType: {type: new GraphQLNonNull(MemberType)}
  })
})