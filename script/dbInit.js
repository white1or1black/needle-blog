
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');


const dbName = process.env.MYSQL_DB;
const args = process.argv;
if (args.length <= 2) {
  initDb();
} else {
  if (args.length > 5) {
    console.log('invalid option number');
  } else {
    userHandler(args[2], args[3], args[4]);
  }
}

async function userHandler(option, initUsername, initPassword) {
  const config = {
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT) || 3306,
    database: dbName,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
  };
  let connection = await mysql.createConnection(config); 

  const user = {
    username: connection.escape(initUsername),
    password: connection.escape(bcrypt.hashSync(initPassword, 10)),
    created_at: connection.escape(new Date()),
    updated_at: connection.escape(new Date()),
  };

  let sql = '';
  if (option === 'addUser') {
    
    sql = genAddUser(user);
  } else if (option === 'updatePwd') {

    sql = genUpdatePwd(user);
  } else {
    console.log('unknown option')
  }
  console.log(`sql: ${sql}`);

  if (sql) {
    try {
      await connection.execute(sql);
      console.log('update succeed!');
    } catch(err) {
      console.log(err);
    }
  } else {
    console.log('invalid sql');
  }
 
  await connection.end()
  process.exit(0);
}

function genUpdatePwd(user) {
  console.log(`update user ${user.username}`);
  return `update user set password=${user.password}, updated_at=${user.updated_at} where username=${user.username}`;
}

function genAddUser(user) {
  console.log(`insert user ${user.username}`);
  return `insert into user(username, password, created_at, updated_at) values (${user.username}, ${user.password}, ${user.created_at}, ${user.updated_at})`;
}

async function initDb() {
  console.log('init database');
  const config = {
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT) || 3306,
    database: dbName,
    user: 'root',
    password: process.env.MYSQL_ROOT_PASSWORD,
  };

  console.log(config);

  try {
    let connection = await mysql.createConnection(config); 
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

    await connection.end();
  } catch(err) {
    console.log(err);
  }

  process.exit(0);
}