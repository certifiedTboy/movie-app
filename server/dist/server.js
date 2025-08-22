"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const index_1 = __importDefault(require("./config/index"));
const db_config_1 = __importDefault(require("./utils/db-config"));
const httpServer = http_1.default.createServer(app_1.default);
const { PORT } = index_1.default;
const startServer = async () => {
    await (0, db_config_1.default)();
    httpServer.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
};
startServer();
