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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const utils_1 = require("../utils");
exports.default = {
    signup(parent, args, ctx, info) {
        return __awaiter(this, void 0, void 0, function* () {
            // if email is valid
            if (!utils_1.isEmail(args.email)) {
                throw new Error(`Invalid Email(${args.email})`);
            }
            // hash their password
            const password = yield bcryptjs_1.default.hash(args.password, 10);
            // if user is exist
            const isUserExist = yield ctx.db.query.user({ where: { email: args.email } });
            if (isUserExist) {
                throw new Error(`email(${args.email}) is already exist`);
            }
            // create the user in the database
            const user = yield ctx.db.mutation.createUser({
                data: Object.assign({}, args, { password })
            }, info);
            // create the JWT token for them
            const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.APP_SECRET);
            // We set the jwt as a cookie on the response
            ctx.response.cookie('token', token, {
                httpOnly: true,
                // 1 year cookie
                maxAge: 1000 * 60 * 60 * 24 * 365
            });
            // Finalllllly we return the user to the browser
            return user;
        });
    },
    signin(parent, { email, password }, ctx, info) {
        return __awaiter(this, void 0, void 0, function* () {
            // if email is valid
            if (!utils_1.isEmail(email)) {
                throw new Error(`Invalid Email(${email})`);
            }
            // 1. check if there is a user with that email
            const user = yield ctx.db.query.user({ where: { email } });
            if (!user) {
                throw new Error(`No such user found for email ${email}`);
            }
            // 2. Check if their password is correct
            const valid = yield bcryptjs_1.default.compare(password, user.password);
            if (!valid) {
                throw new Error('Invalid Password!');
            }
            // 3. generate the JWT Token
            const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.APP_SECRET);
            // 4. Set the cookie with the token
            ctx.response.cookie('token', token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 365
            });
            // 5. Return the user
            return user;
        });
    },
    signout(parent, args, ctx, info) {
        ctx.response.clearCookie('token');
        return { message: 'Goodbye!' };
    },
    createThing(parent, args, ctx, info) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!ctx.request.userId) {
                throw new Error('You must be logged in to do that!');
            }
            const item = yield ctx.db.mutation.createThing({
                data: Object.assign({}, args, { user: {
                        connect: {
                            id: ctx.request.userId
                        }
                    }, createTime: new Date() })
            }, info);
            return item;
        });
    },
    updateThing(parent, args, ctx, info) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!ctx.request.userId) {
                throw new Error('You must be logged in to do that!');
            }
            // first take a copy of the updates
            const updates = Object.assign({}, args.data);
            // run the update method
            return ctx.db.mutation.updateThing({
                data: updates,
                where: {
                    id: args.id
                }
            }, info);
        });
    },
    deleteThing(parent, args, ctx, info) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!ctx.request.userId) {
                throw new Error('You must be logged in to do that!');
            }
            const where = { id: args.id };
            // 1. find the item
            const item = yield ctx.db.query.thing({ where }, `{ id title user { id }}`);
            // 2. Check if they own that item, or have the permissions
            const ownsItem = item.user.id === ctx.request.userId;
            if (!ownsItem) {
                throw new Error('You don\'t have permission to do that!');
            }
            // 3. Delete it!
            return ctx.db.mutation.deleteThing({ where }, info);
        });
    }
};
//# sourceMappingURL=Mutation.js.map