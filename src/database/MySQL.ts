import util from "util";
import mysql from "mysql";

const connection = mysql.createConnection({
  host     : process.env.MYSQL_ADDRESS,
  user     : process.env.MYSQL_USERNAME,
  password : process.env.MYSQL_PASSWORD,
  database : process.env.MYSQL_DATABASE
});

connection.connect((error) => {
  if(error) {
    console.error(error);
    console.error(new Error("Could not log in to MySQL at address " + process.env.MYSQL_ADDRESS));
  } else
    console.debug("Successfully connected to MySQL!");
});

const query = util.promisify(connection.query).bind(connection);

export default query;