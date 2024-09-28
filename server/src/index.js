const PORT = process.env.PORT || 8001;
const ENV = require("./environment");

const app = require("./application")(ENV);
const server = require("http").Server(app);
const { Pool } = require("pg");

// Set up your PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Make sure you set this in your environment variables
  ssl: {
    rejectUnauthorized: false, // This might be necessary for Render
  },
});

// Test the connection to PostgreSQL
pool.connect()
  .then(() => {
    console.log("Connected to PostgreSQL database from pool.");
  })
  .catch(err => {
    console.error("Error connecting to PostgreSQL server:", err);
    process.exit(1); // Exit the application if connection fails
  });

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT} in ${ENV} mode.`);
});