// This file connects to the remote prisma DB and gives us the ability to query it with JS
import {Prisma} from 'prisma-binding';
import * as path from 'path';

export default new Prisma({
    typeDefs: path.join(__dirname, './generated/prisma.graphql'),
    endpoint: process.env.PRISMA_ENDPOINT,
    // secret: process.env.PRISMA_SECRET,
    debug: false
});
