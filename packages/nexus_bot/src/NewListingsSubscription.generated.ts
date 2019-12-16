import * as Types from "../graphql/types.generated";

export type NewListingsSubscriptionSubscriptionVariables = {};

export type NewListingsSubscriptionSubscription = {
  __typename?: "Subscription";
} & {
  newListings: Types.Maybe<
    { __typename?: "Listing" } & Pick<
      Types.Listing,
      "id" | "title" | "description"
    > & {
        owner: { __typename?: "User" } & Pick<
          Types.User,
          "id" | "username" | "discriminator" | "avatar"
        >;
      }
  >;
};