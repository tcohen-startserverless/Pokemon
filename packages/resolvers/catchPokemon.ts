import { Context, DynamoDBPutItemRequest, util } from "@aws-appsync/utils";
import { Mutation, MutationCatchPokemonArgs } from "../graphql/appsync";
import { AppSyncResolverHandler } from "aws-lambda";

export function request(
  ctx: Context<MutationCatchPokemonArgs>
): DynamoDBPutItemRequest {
  const item = ctx.args.input;
  return {
    operation: "PutItem",
    key: {
      id: util.dynamodb.toDynamoDB(util.autoId()),
    },
    attributeValues: util.dynamodb.toMapValues({
      ...item,
      createdAt: util.time.nowISO8601(),
      updaaedAt: util.time.nowISO8601(),
    }),
  };
}
