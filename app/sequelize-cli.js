require('dotenv').config();
require('sequelize-cli/lib/sequelize').default = require('sequelize');
const { Sequelize } = require('sequelize');

// this file is useful if `npx sequelize [command]` in your cli is unable
// to target the database specified in your .env file. To run this file,
// run `npm run sequelize [command] instead.
const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres'
    }
);

// Run the command that was passed in from the CLI
const { execSync } = require('child_process');
execSync(`npx sequelize-cli ${process.argv.slice(2).join(' ')}`, {
    stdio: 'inherit'
});
