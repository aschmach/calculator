const mongoose = require("mongoose");
const env = process.env.NODE_ENV || "local";

if (env === "local") {
  console.log("environment considered local");
  let ensure_production_env = false;
  // ensure_production_env = true;
  let ensure_qa_env = false;
  // ensure_qa_env = true

  if (ensure_production_env) {
    console.log("forcing production env");
    require("dotenv").config({ path: "./.envProd" });
  } else if (ensure_qa_env) {
    require("dotenv").config({ path: "./.envQa" });
  }
} else {
  require("dotenv").config();
}

const _DB_USERNAME = process.env._DB_USERNAME || "micro";
const _DB_PASSWORD = process.env._DB_PASSWORD || "password";
const _DB_HOSTS = process.env._DB_HOSTS || "localhost:27017";
const _DB_DATABASE = process.env._DB_DATABASE || "micro-prod";
const _DB_OPTIONS = process.env._DB_OPTIONS || "";

if (env !== "local" && _DB_USERNAME === "micro") {
  console.log("not loaded config variables correctly");
}

let connectionString = `mongodb://${_DB_USERNAME}:${_DB_PASSWORD}@${_DB_HOSTS}/${_DB_DATABASE}${_DB_OPTIONS}`;

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    autoIndex: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("===========");
    console.log(`connection made`);
    console.log(`env: ${env}`);
    console.log(`username: ${_DB_USERNAME}`);
    console.log("===========");
  })
  .catch((error) => {
    console.log("error connecting to database");
    console.log({ _DB_USERNAME, _DB_HOSTS });
    return console.log(error);
  });
