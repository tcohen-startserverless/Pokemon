import { createRequire as topLevelCreateRequire } from 'module';const require = topLevelCreateRequire(import.meta.url);
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// stacks/MyStack.ts
import { Api, Table, StaticSite } from "sst/constructs";
function API({ stack }) {
  const table = new Table(stack, "Pokemon", {
    fields: {
      pk: "string",
      sk: "string"
    },
    primaryIndex: { partitionKey: "pk", sortKey: "sk" }
  });
  const api = new Api(stack, "api", {
    defaults: {
      function: {
        permissions: ["dynamodb:PutItem", "dynamodb:Query"],
        environment: {
          TABLE: table.tableName
        },
        timeout: 30
      }
    },
    routes: {
      "GET /pokemon": "packages/functions/src/lambda.handler",
      "GET /pokemon/{id}": "packages/functions/src/lambda.handler",
      "POST /pokemon": "packages/functions/src/pokemon.create"
    }
  });
  const web = new StaticSite(stack, "web", {
    path: "packages/react",
    buildOutput: "dist",
    buildCommand: "npm run build",
    environment: {
      VITE_APP_API_URL: api.url
    }
  });
  stack.addOutputs({
    ApiEndpoint: api.url
  });
}
__name(API, "API");

// sst.config.ts
var sst_config_default = {
  config(_input) {
    return {
      name: "pokemon-app",
      region: "us-east-1",
      profile: "dev"
    };
  },
  stacks(app) {
    app.stack(API);
  }
};
export {
  sst_config_default as default
};
