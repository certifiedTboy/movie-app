import http from "http";
import app from "./app";
import envVariables from "./config/index";
import connectDb from "./utils/db-config";
const httpServer = http.createServer(app);

const { PORT } = envVariables;

const startServer = async () => {
  await connectDb();
  httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();
