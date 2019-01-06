"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_yoga_1 = require("graphql-yoga");
const Mutation_1 = __importDefault(require("./resolvers/Mutation"));
const Query_1 = __importDefault(require("./resolvers/Query"));
const db_1 = __importDefault(require("./db"));
// Create the GraphQL Yoga Server
function createServer() {
    return new graphql_yoga_1.GraphQLServer({
        typeDefs: 'src/schema.graphql',
        resolvers: {
            Mutation: Mutation_1.default,
            Query: Query_1.default
        },
        resolverValidationOptions: {
            requireResolversForResolveType: false
        },
        context: req => (Object.assign({}, req, { db: db_1.default }))
    });
}
exports.default = createServer;
//# sourceMappingURL=createServer.js.map