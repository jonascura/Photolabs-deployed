const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Ensure this is set in your environment variables
  ssl: {
    rejectUnauthorized: false, // Necessary for Render in production environments
  },
});

// Test connection
pool.connect()
  .then(() => {
    console.log("Connected to PostgreSQL database in db.");
  })
  .catch(e => {
    console.error(`Error connecting to PostgreSQL server:\n${e.message}\n${e.stack}`);
    process.exit(1); // Exit the app if connection fails
  });

module.exports = pool;  

// const pg = require("pg");

// const client = new pg.Client({
//   host: process.env.PGHOST,
//   name: process.env.PGDATABASE,
//   user: process.env.PGUSER,
//   password: process.env.PGPASSWORD,
//   port: process.env.PGPORT,
//   ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
// });

// client
//   .connect()
//   .catch(e => console.log(`Error connecting to Postgres server:\n${e.message}\n${e.stack}`));

// module.exports = client;
