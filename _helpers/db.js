// const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {
    // create db if it doesn't already exist
    /*const { host, port, user, password, database } = config.database;
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);*/

    // connect to db
    // const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

    var clientOptions = {}
    if (process.env.db_host) {
      clientOptions = {
        user: process.env.db_user,
        password: process.env.db_password,
        database: process.env.db_database,
        port: process.env.db_port,
        host: process.env.db_host,
        ssl: true
      }
    } else {
      clientOptions = {
          user: "alfred",
          password: "",
          database: "alfred",
          port: 5432,
          host: "localhost",
          ssl: false
      }
    }

    const sequelize = new Sequelize(clientOptions.database, clientOptions.user, clientOptions.password, {
      host: clientOptions.host,
      dialect: 'postgres',
      ssl:true,
      dialectOptions: {
        ssl: clientOptions.ssl ? {
          require: true,
          rejectUnauthorized: false
        } : false
      }
    })

    // init models and add them to the exported db object
    db.User = require('../users/user.model')(sequelize);
    db.RefreshToken = require('../users/refresh-token.model')(sequelize);
    db.Profile = require('../profiles/profile.model')(sequelize);
    db.Media = require('../media/media.model')(sequelize);

    // define relationships
    db.User.hasMany(db.RefreshToken, { onDelete: 'CASCADE' });
    db.RefreshToken.belongsTo(db.User);
    db.User.hasOne(db.Profile, { onDelete: 'CASCADE' });
    db.Profile.belongsTo(db.User);
    db.Profile.hasMany(db.Media, { onDelete: 'CASCADE' });
    db.Media.belongsTo(db.Profile);

    // sync all models with database
    await sequelize.sync();
}
