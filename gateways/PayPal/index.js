const braintree = require('braintree')

module.exports = class PayPal {

    constructor(accessToken) {
        this.gateway = braintree.connect({accessToken: accessToken})
    }

    /**
     * Create ClienToken
     *
     * @returns {Promise<string>}
     */
    async createClienToken() {
        try {
            const {clientToken} = await this.gateway.clientToken.generate({})
            return clientToken
        } catch (e) {
            throw e
        }
    }

    /**
     *
     * @param amount        Price
     * @param nonce
     * @param ordeIr        Order Id internal
     * @returns {Promise<object>}
     */
    async createTrasaction({amount, nonce, orderId}) {
        try {
            var saleRequest = {
                amount,
                paymentMethodNonce: nonce,
                orderId,
                options: {
                    submitForSettlement: true
                }
            };
            const {success, transaction} = await this.gateway.transaction.sale(saleRequest)

            if (!success)
                throw Error('Error in trasaction')

            return transaction
        } catch (e) {
            throw e
        }
    }
}