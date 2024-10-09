const config = require('./index');

const db = config.db;

console.log("Database Config:", {
    username: db.username,
    password: db.password,
    database: db.database,
    host: db.host
});


module.exports = {
    development: {
        username: db.username,
        password: db.password || '',
        database: db.database,
        host: db.host,
        dialect: 'postgres',
        seederStorage: 'sequelize',
        dialectOptions: {
            ssl: false,
        },
    },
    production: {
        use_env_variable: process.env.DATABASE_URL ? 'DATABASE_URL' : undefined,
        username: db.username,
        password: db.password || '',
        database: db.database,
        host: db.host,
        dialect: 'postgres',
        seederStorage: 'sequelize',
        dialectOptions: {
            ssl: {
                require: false,
                rejectUnauthorized: false,
            },
        },
    }
};
