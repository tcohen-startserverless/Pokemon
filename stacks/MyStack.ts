import {
  StackContext,
  Api,
  Table,
  StaticSite,
  AppSyncApi,
} from "sst/constructs";

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
        timeout: 30,
      },
    },
    routes: {
      "GET /pokemon": "packages/functions/src/lambda.handler",
      "GET /pokemon/{id}": "packages/functions/src/lambda.handler",
      "POST /pokemon": "packages/functions/src/pokemon.create",
    },
  });

  api.bind([table]);

  const appsync = new AppSyncApi(stack, "GraphQL", {
    schema: "graphql/schema.graphql",
    dataSources: {
      tableDS: {
        type: "dynamodb",
        table: table,
      },
    },
    resolvers: {
      "Query getPokemon": {
        dataSource: "tableDS",
        requestMapping: { file: "packages/resolvers/catchPokemon.ts" },
        responseMapping: { file: "" },
      },
      "Mutation catchPokemon": {
        dataSource: "tableDS",
        requestMapping: { file: "" },
        responseMapping: { file: "" },
      },
    },
  });

  const web = new StaticSite(stack, "web", {
    path: "packages/react",
    buildOutput: "dist",
    buildCommand: "npm run build",
    environment: {
      VITE_APP_API_URL: api.url,
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
