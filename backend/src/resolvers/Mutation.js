const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {isEmail} = require('../utils');

const mutations = {
    async signup(parent, args, ctx, info) {
        // if email is valid
        if (!isEmail(args.email)) {
            throw new Error(`Invalid Email(${args.email})`);
        }
        // hash their password
        const password = await bcrypt.hash(args.password, 10);

        // if user is exist
        const isUserExist = await ctx.db.query.user({where: {email: args.email}});
        if (isUserExist) {
            throw new Error(`email(${args.email}) is already exist`);
        }
        // create the user in the database
        const user = await ctx.db.mutation.createUser(
            {
                data: {
                    ...args,
                    password
                }
            },
            info
        );
        // create the JWT token for them
        const token = jwt.sign({userId: user.id}, process.env.APP_SECRET);
        // We set the jwt as a cookie on the response
        ctx.response.cookie('token', token, {
            httpOnly: true,
            // 1 year cookie
            maxAge: 1000 * 60 * 60 * 24 * 365
        });
        // Finalllllly we return the user to the browser
        return user;
    },
    async signin(parent, {email, password}, ctx, info) {
        // if email is valid
        if (!isEmail(email)) {
            throw new Error(`Invalid Email(${email})`);
        }
        // 1. check if there is a user with that email
        const user = await ctx.db.query.user({where: {email}});
        if (!user) {
            throw new Error(`No such user found for email ${email}`);
        }
        // 2. Check if their password is correct
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw new Error('Invalid Password!');
        }
        // 3. generate the JWT Token
        const token = jwt.sign({userId: user.id}, process.env.APP_SECRET);
        // 4. Set the cookie with the token
        ctx.response.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365
        });
        // 5. Return the user
        return user;
    },
    signout(parent, args, ctx, info) {
        ctx.response.clearCookie('token');
        return {message: 'Goodbye!'};
    },
    async createThing(parent, args, ctx, info) {
        if (!ctx.request.userId) {
            throw new Error('You must be logged in to do that!');
        }
        const item = await ctx.db.mutation.createThing(
            {
                data: {
                    // This is how to create a relationship between the Item and the User

                    ...args,
                    user: {
                        connect: {
                            id: ctx.request.userId
                        }
                    },
                    createTime: new Date()
                }
            },
            info
        );
        return item;
    },
    async updateThing(parent, args, ctx, info) {
        if (!ctx.request.userId) {
            throw new Error('You must be logged in to do that!');
        }
        // first take a copy of the updates
        const updates = {...args.data};
        // run the update method
        return ctx.db.mutation.updateThing(
            {
                data: updates,
                where: {
                    id: args.id
                }
            },
            info
        );
    },
    async deleteThing(parent, args, ctx, info) {
        if (!ctx.request.userId) {
            throw new Error('You must be logged in to do that!');
        }
        const where = {id: args.id};
        // 1. find the item
        const item = await ctx.db.query.thing({where}, `{ id title user { id }}`);
        // 2. Check if they own that item, or have the permissions
        const ownsItem = item.user.id === ctx.request.userId;
        if (!ownsItem) {
            throw new Error('You don\'t have permission to do that!');
        }
        // 3. Delete it!
        return ctx.db.mutation.deleteThing({where}, info);
    }
};

module.exports = mutations;
