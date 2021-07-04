
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');


const dbName = 'needle_blog';
const initUsername = 'admin';
const initPassword = '123456';

async function main() {
  console.log('init database');
  const config = {
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT) || 3306,
    database: 'mysql',
    user: 'root',
    password: process.env.MYSQL_ROOT_PASSWORD,
  };

  console.log(config);

  try {
    let connection = await mysql.createConnection(config); 

    const [ rows ] = await connection.query(`select SCHEMA_NAME  from INFORMATION_SCHEMA.SCHEMATA where SCHEMA_NAME='${dbName}';`);
    if(rows.length > 0) throw new Error(`database ${dbName} already exists`);

    await connection.execute(`create database ${dbName};`);

    config.database = dbName;
    config.user = process.env.MYSQL_USERNAME;
    config.password = process.env.MYSQL_PASSWORD;
    connection = await mysql.createConnection(config);

    const sqlPath = path.join(__dirname, '../sql/');
    const filenames = fs.readdirSync(sqlPath);

    for (let filename of filenames) {
      const file = path.join(sqlPath, filename);
      console.log(file);

      let content = fs.readFileSync(file, { encoding: 'utf-8' });
      content = content.replace(/\n/g, ' ');
      console.log(content);
      await connection.execute(content);
    }

    // add user
    const user = {
      username: connection.escape(initUsername),
      password: connection.escape(bcrypt.hashSync(initPassword, 10)),
      created_at: connection.escape(new Date()),
      updated_at: connection.escape(new Date()),
    };

    console.log('insert user information');
    const sql = `insert into user(username, password, created_at, updated_at) values (${user.username}, ${user.password}, ${user.created_at}, ${user.updated_at})`;
    console.log(sql);

    await connection.execute(sql);

    await connection.end();
    process.exit(0);
  } catch(err) {
    console.log(err);
  }
}

main();