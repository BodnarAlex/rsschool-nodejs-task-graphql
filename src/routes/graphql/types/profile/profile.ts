import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { UUIDType } from "../uuid.js";
import { MemberType } from "../member/MemberType.js";
import { Context, ProfileType } from "../context/context.js";

// type Profile {
//   id: UUID!
//   isMale: Boolean!
//   yearOfBirth: Int!
//   memberType: MemberType!
// }

export const Profile = new GraphQLObjectType <ProfileType, Context>({
  name: "Profile",
  fields : () => ({
    id: {type: new GraphQLNonNull(UUIDType)},
    isMale: {type: new GraphQLNonNull(GraphQLBoolean)},
    yearOfBirth: {type: new GraphQLNonNull(GraphQLInt)},
    memberType: {
      type: MemberType,
      resolve: (parent, _, context: Context) => {
        return context.prisma.memberType.findUnique({ where: { id: parent.memberTypeId } });
      }
    }
  })
})