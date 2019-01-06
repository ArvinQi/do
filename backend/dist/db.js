"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// This file connects to the remote prisma DB and gives us the ability to query it with JS
const prisma_binding_1 = require("prisma-binding");
exports.default = new prisma_binding_1.Prisma({
    typeDefs: './generated/prisma.graphql',
    endpoint: process.env.PRISMA_ENDPOINT,
    // secret: process.env.PRISMA_SECRET,
    debug: false
});
//# sourceMappingURL=db.js.map