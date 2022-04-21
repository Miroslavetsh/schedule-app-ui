# Schedule App UI

This is a service of two sides of an big application that will help You to make a schedule and make it flexible for any group, and most importantly, for every teacher and student. We got tired of piling up pairs, piles of incomprehensible schedules, confusing locations, numerators and denominators... So we got rid of them🙃

### How to run it locally?🤔

- Firstly, install NodeJS v16.13.1 or above (I'm not sure that everything will work on older version)
- (optional) Secondly, use it manually by running `nvm use` in Your terminal, or npm will determine dependency of Node version after running `npm install`
- Then You you will have at your disposal next commands:
  - `npm start` - run the script, that shows You current pair and nearest next pair
  - `npm test` - this command that shows You current pair and allows you to make sure that every your change

### Contributing RoadMap🗺️

- Firstly, create a new branch from current version of master
- Then, you will be able to apply your changes and cover them with tests
- Next step - You must be sure that you see the correct current and next pair dates with the appropriate informationm check it out the `yarn start`
- After that - run the tests and check it out that none from your changes didn't break previous
- yarn lint - repair each space, comma, linebrake etc.

OK, so You decided to help us with it, let's take note that we have some rules to keep the production build purity and cleanliness🙌

##### One change - one branch🌿

Each, even the smallest change, requires its own branch with commits, so you can easily switch between them, as well as undo and move them between branches. It's much easier to drag a brick from one place to another than to tear down half a building to get to it😉
