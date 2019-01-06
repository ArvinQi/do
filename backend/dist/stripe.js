"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stripe = require('stripe');
exports.default = stripe(process.env.STRIPE_SECRET);
//# sourceMappingURL=stripe.js.map