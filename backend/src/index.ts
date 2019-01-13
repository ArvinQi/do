import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import './config';
import createServer from './createServer';
import db from './db';

const server = createServer();

server.express.use(cookieParser());

interface IReqest extends Request {
    userId: string;
    user: any;
    cookies: any;
}
// decode the JWT so we can get the user Id on each request
server.express.use((req: IReqest, res: any, next: any) => {
    const {token} = req.cookies;
    if (token) {
        const {userId} = jwt.verify(token, process.env.APP_SECRET);
        // put the userId onto the req for future requests to access
        req.userId = userId;
    }
    next();
});

// 2. Create a middleware that populates the user on each request

server.express.use(async (req: IReqest, res: any, next: any) => {
    // if they aren't logged in, skip this
    if (!req.userId) {
        return next();
    }
    const user = await db.query.user({where: {id: req.userId}},
        '{ id, email }'
    );
    req.user = user;
    return next();
});

server.start({
    cors: {
        credentials: true,
        origin: process.env.FRONTEND_URL
    },
    port: '9002'
    // endpoint: 'http://do.qijinlong.com:9002'
},
deets => {
    console.log(`Server is now running on port http://localhost:${deets.port}`);
}
);
