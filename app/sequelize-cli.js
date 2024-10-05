require('dotenv').config();
require('sequelize-cli/lib/sequelize').default = require('sequelize');
const { Sequelize } = require('sequelize');

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
