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

