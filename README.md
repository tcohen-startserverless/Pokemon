# Pokemon

Get started by `npm i` in the root directory

You can deploy your AWS resources with `npx sst dev` .  This is using my AWS Profile named "dev", if you want to use a different profile change it `sst.config.ts`  

To start the web server you can navigate to `packages/web`, `npm i`, and then `npm run dev`


## React

The front is contained within the `App.tsx` file.  This has several components for rendering the Pokemon, and toggling between your pagination view, and inventory view

Loading the inventory view is slow because I should have designed my Pokemon component better.

## API

The API is defined with SST.  SST creates an API Gateway, and 2 lambda functions.  Each function handles a different route, POST, and GET /pokemon

There is no delete functionality