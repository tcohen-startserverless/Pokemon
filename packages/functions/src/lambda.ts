import { ApiHandler } from "sst/node/api";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { QueryCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { Table } from "sst/node/table";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = ApiHandler(async (_evt) => {
  const command = new QueryCommand({
    TableName: Table.Pokemon.tableName,
    KeyConditionExpression: `#pk = :id`,
    ExpressionAttributeNames: {
      "#pk": "pk",
    },
    ExpressionAttributeValues: {
      ":id": "pokemon",
    },
    ExclusiveStartKey: _evt.queryStringParameters
      ? {
          pk: "pokemon",
          sk: _evt.queryStringParameters.id!,
        }
      : undefined,
    Limit: 50,
  });

  const response = await docClient.send(command);

  const body = {
    items: response.Items,
    key: response.LastEvaluatedKey,
  };

  return {
    statusCode: 200,
    body: JSON.stringify(body),
  };
});
