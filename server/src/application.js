const fs = require("fs");
const path = require("path");

const express = require("express");
const bodyparser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const corsOptions = {
  origin: 'https://photolabs-deployed.onrender.com', // Your frontend domain
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true // If you are sending cookies or credentials
};

const app = express();

const db = require("./db")

const photos = require("./routes/photos");
const topics = require("./routes/topics");

function read(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(
      file,
      {
        encoding: "utf-8"
      },
      (error, data) => {
        if (error) return reject(error);
        resolve(data);
      }
    );
  });
}

module.exports = function application(
  ENV,
) {
  app.use(cors(corsOptions));
  app.use(helmet());
  app.use(bodyparser.json());
  app.use(express.static(path.join(__dirname, 'public')));

  app.use("/api", photos(db));
  app.use("/api", topics(db));

  if (ENV === "development" || ENV === "test" || ENV === "production") {
    console.log(`Running in ${ENV} mode.`);
    Promise.all([
        read(path.resolve(__dirname, `db/schema/create.sql`)),
        read(path.resolve(__dirname, `db/schema/${ENV}.sql`))
    ])
    .then(([create, seed]) => {
        app.get("/api/debug/reset", (request, response) => {
            db.query(create)
                .then(() => {
                    console.log("Created tables successfully.");
                    return db.query(seed);
                })
                .then(() => {
                    console.log("Seeded database successfully.");
                    response.status(200).send("Database Reset");
                })
                .catch(err => {
                    console.error("Error during database setup:", err);
                    response.status(500).send("Database setup failed.");
                });
        });
    })
    .catch(error => {
        console.log(`Error setting up the reset route: ${error}`);
    });
  }

  app.close = function() {
    return db.end();
  };

  return app;
};
