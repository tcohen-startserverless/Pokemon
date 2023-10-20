import { StackContext, Api, Table, StaticSite } from "sst/constructs";

export function API({ stack }: StackContext) {
  const table = new Table(stack, "Pokemon", {
    fields: {
      pk: "string",
      sk: "string",
    },
    primaryIndex: { partitionKey: "pk", sortKey: "sk" },
  });

  const api = new Api(stack, "api", {
    defaults: {
      function: {
        permissions: ["dynamodb:PutItem", "dynamodb:Query"],
        environment: {
          TABLE: table.tableName,
        },
      },
    },
    routes: {
      "GET /pokemon": "packages/functions/src/lambda.handler",
      "POST /pokemon": "packages/functions/src/pokemon.create",
    },
  });

  const web = new StaticSite(stack, "web", {
    path: "/packages/web",
    buildOutput: "dist",
    buildCommand: "npm run build",
    environment: {
      VITE_APP_TEST: api.url,
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
