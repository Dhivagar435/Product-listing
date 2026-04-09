import { AppDataSource } from "./config/data-source";
import dotenv from "dotenv";
import app from "./app";
import http from "http";

dotenv.config();

const PORT = Number(process.env.PORT);
const IP = String(process.env.IP);

const startServer = async () => {
  try {

    //Connect DB
    await AppDataSource.initialize();
    console.log("MySQL Connected");

    // Create HTTP server
    const server = http.createServer(app);

    // Start server (IMPORTANT)
    server.listen(PORT, IP, () => {
      console.log(`Server is Running ${PORT} ${IP}`);
    });

  } catch (error) {
    console.log("Startup Error:", error);
    process.exit(1);
  }
};

startServer();