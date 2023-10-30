import { ApiHandler } from "sst/node/api";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { QueryCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = ApiHandler(async (_evt) => {
  const command = new QueryCommand({
    TableName: process.env.TABLE,
    KeyConditionExpression: `#pk = :id`,
    ExpressionAttributeNames: {
      "#pk": "pk",
    },
    ExpressionAttributeValues: {
      ":id": "pokemon",
    },
  });

  const response = await docClient.send(command);
  console.log(response);

  const body = {
    items: response.Items,
    key: response.LastEvaluatedKey,
  };

  return {
    statusCode: 200,
    body: JSON.stringify(body),
  };
});

export const paginate = ApiHandler(async (_evt) => {
  const command = new QueryCommand({
    TableName: process.env.TABLE,
    KeyConditionExpression: `#pk = :id`,
    ExpressionAttributeNames: {
      "#pk": "pk",
    },
    ExpressionAttributeValues: {
      ":id": "pokemon",
    },
    Limit: 50,
  });

  const response = await docClient.send(command);
  console.log(response);

  const body = {
    items: response.Items,
    key: response.LastEvaluatedKey,
  };

  return {
    statusCode: 200,
    body: JSON.stringify(body),
  };
});
