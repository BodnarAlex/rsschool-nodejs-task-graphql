import { GraphQLEnumType } from "graphql";

// enum MemberTypeId {
//   BASIC
//   BUSINESS
// }

export const MemberTypeId = new GraphQLEnumType({
  name: "MemberTypeId",
  values: {
    BASIC: {
      value:"BASIC",
    },
    BUSINESS: {
      value:"BUSINESS",
    },
  }
})