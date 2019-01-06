const stripe = require('stripe');
export default stripe(process.env.STRIPE_SECRET);