import { ApiHandler } from "sst/node/api";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const create = ApiHandler(async (_evt) => {
  if (_evt.body == undefined) {
    return { statusCode: 400, body: "No valid input" };
  }

  const body = JSON.parse(_evt.body);
  const pokemon = {
    name: body.name,
    moves: body.moves,
    abilities: body.abilities,
    sprites: body.sprites,
    id: body.id,
  };

  console.log(process.env.TABLE);

  const command = new PutCommand({
    TableName: process.env.TABLE,
    Item: {
      pk: "pokemon",
      sk: `ID#${pokemon.id}`,
      ...pokemon,
    },
  });

  const respone = await docClient.send(command);
  console.log(respone);

  return {
    statusCode: 200,
    body: "Pokemon created",
  };
});
