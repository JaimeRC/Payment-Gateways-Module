const {env: {NODE_ENV}} = process

const CONSTANTS = {
    dev: {
        paypal: {
            accessToken: ''
        }
    },
    prod: {
        paypal: {
            accessToken: ''
        }
    }
}

module.exports = CONSTANTS[NODE_ENV || 'dev']