"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const createServer_1 = __importDefault(require("./createServer"));
const db_1 = __importDefault(require("./db"));
dotenv_1.default.config({ path: 'variables.env' });
const server = createServer_1.default();
server.express.use(cookie_parser_1.default());
// decode the JWT so we can get the user Id on each request
server.express.use((req, res, next) => {
    const { token } = req.cookies;
    if (token) {
        const { userId } = jsonwebtoken_1.default.verify(token, process.env.APP_SECRET);
        // put the userId onto the req for future requests to access
        req.userId = userId;
    }
    next();
});
// 2. Create a middleware that populates the user on each request
server.express.use((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    // if they aren't logged in, skip this
    if (!req.userId) {
        return next();
    }
    const user = yield db_1.default.query.user({ where: { id: req.userId } }, '{ id, email }');
    req.user = user;
    return next();
}));
server.start({
    cors: {
        credentials: true,
        origin: process.env.FRONTEND_URL
    },
    port: '9002'
    // endpoint: 'http://do.qijinlong.com:9002'
}, deets => {
    console.log(`Server is now running on port http://localhost:${deets.port}`);
});
//# sourceMappingURL=index.js.map