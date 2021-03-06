# Schedule App UI

This is a service of two sides of an big application that will help You to make a schedule and make it flexible for any group, and most importantly, for every teacher and student. We got tired of piling up pairs, piles of incomprehensible schedules, confusing locations, numerators and denominators... So we got rid of them🙃

### How to run it locally?🤔

- Firstly, install NodeJS v16.13.1 or above (I'm not sure that everything will work on older version)
- (optional) Secondly, use it manually by running `nvm use` in Your terminal, or npm will determine dependency of Node version after running `npm install`
- Then You you will have at your disposal next commands(you can also use yarn instead):
  - `npm run dev` - run the script, that shows You current pair and nearest next pair
  - `npm run dev:server` - runs the server, that allows you to interact with schedule and client
  - `npm run build` - builds client side for using it on a prod
  - `npm run serve` - runs the production build of Node.js and Next.js parts
  - `npm run start` - Versel's essentials
  - `npm run test` - this command that shows You current pair and allows you to make sure that every your change
  - `npm run lint:fix` - this one will fix trailing commas, semicolons and spaces after applying your changes

### Contributing RoadMap🗺️

- Firstly, create a new branch from current version of master
- Then, you will be able to apply your changes and cover them with tests
- At the next step You must be sure that you see the correct current and next pair dates with the appropriate information. Just run `npm run dev:server` and check it out after token entering
- After that run the tests using `npm run test` and check it out that none from your changes didn't break previous and new cases are working
- Then, please, run `npm run build` and make sure that project is assembled without errors
- In the conclusion, please, run `npm run lint:fix` that repairs each space, comma, linebreak etc.

OK, so You decided to help us with it, let's take note that we have some rules to keep the production build purity and cleanliness🙌

##### One change - one branch🌿

Each, even the smallest change, requires its own branch with commits, so you can easily switch between them, as well as undo and move them between branches. It's much easier to drag a brick from one place to another than to tear down half a building to get to it😉
