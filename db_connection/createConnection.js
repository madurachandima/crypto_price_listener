const mysql = require("mysql");
const {db_host,db_port,db_user_name,db_password,db_name} = require("../const/const");

/**
 *  return database connection instances
*/
module.exports.createDatabaseConnection = () => {
  var connection = mysql.createConnection({
    host: db_host,
    port: db_port,
    user: db_user_name,
    password: db_password,
    database: db_name,
  });
  connection.connect((err) => {
    if (err) console.log(err);
    else console.log("Connected");
  });

  return connection;
};
