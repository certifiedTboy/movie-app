"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = __importDefault(require("./user-routes"));
const auth_routes_1 = __importDefault(require("./auth-routes"));
const watchlist_routes_1 = __importDefault(require("./watchlist-routes"));
const apiV1Routes = express_1.default.Router();
apiV1Routes.use("/users", user_routes_1.default);
apiV1Routes.use("/auth", auth_routes_1.default);
apiV1Routes.use("/watchlist", watchlist_routes_1.default);
exports.default = apiV1Routes;
