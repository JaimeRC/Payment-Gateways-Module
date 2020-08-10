const braintree = require('braintree')
const {env: {NODE_ENV}} = process

const CONSTANTS = {
    dev: {
        paypal: {
            environment: braintree.Environment.Sandbox,
            env: 'sandbox',
            accessToken: ''
        }
    },
    prod: {
        paypal: {
            environment: braintree.Environment.Production,
            env: 'production',
            accessToken: ''
        }
    }
}

module.exports = CONSTANTS[NODE_ENV || 'dev']