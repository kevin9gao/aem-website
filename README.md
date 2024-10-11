_For the live AEM website, click here: [AEMBIOUSA](https://aem-website-be1de5f56aa1.herokuapp.com/)._

<h2>To start the development environment:</h2>

1. Make sure npm is installed in your linux subsystem or Mac, and `git clone https://github.com/kevin9gao/aem-website.git` in the terminal to clone the project.
2. Open the project in VSCode or whichever IDE.
3. `cd` into the `app/` directory.
    1. `npm install` to install project dependencies.
    2. Create a file named `.env` in the `app/` directory, copying and pasting the contents of `.env.example` into it. You can change the values of the .env file, or leave them as is.
    3. Make sure postgres is running on your machine, and run `npx sequelize db:create` to create the database.
    4. Run `npx sequelize db:migrate`, followed by `npx sequelize db:seed:all`.
    5. Run `npm start` to start the backend server.
4. `cd ..` back into the root directory, then `cd` into `react-app/`.
    1. `npm install` to install frontend dependencies.
    2. Run `npm start` to start the React app.
