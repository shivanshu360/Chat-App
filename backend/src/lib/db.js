import mongoose from "mongoose";
import dns from "dns";
import { ENV } from "./env.js";

try {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
} catch (e) {
}


export const connectDB = async () => {
  try {
    const { MONGO_URI } = ENV;
    if (!MONGO_URI) throw new Error("MONGO_URI is not set");

    const conn = await mongoose.connect(ENV.MONGO_URI);
    console.log("MONGODB CONNECTED:", conn.connection.host);
  } catch (error) {
    console.error("Error connecting to MONGODB:", error.message || error);
  }
};
