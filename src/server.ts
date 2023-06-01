import mongoose from "mongoose";
import app from "./app";
import config from "./config/index";

async function run_server() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("database connected successfully");
    app.listen(config.port, () => {
      console.log(`Application listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

run_server();
