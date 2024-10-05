const config = require('./index');

const db = config.db;

// console.log("Database Config:", {
//     username: db.username,
//     password: db.password,
//     database: db.database,
//     host: db.host
// });


module.exports = {
    development: {
        username: db.username,
        password: db.password || '',
        database: db.database,
        host: db.host,
        dialect: 'postgres',
        seederStorage: 'sequelize'
    },
    production: {
        use_env_variable: 'DATABASE_URL',
        dialect: 'postgres',
        seederStorage: 'sequelize',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }
};
