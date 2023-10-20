import { SSTConfig } from "sst";
import { API } from "./stacks/MyStack";

export default {
  config(_input) {
    return {
      name: "pokemon-app",
      region: "us-east-1",
      profile: "dev",
    };
  },
  stacks(app) {
    app.stack(API);
  },
} satisfies SSTConfig;
