const TAG = '[PAYPAL] -> '
const braintree = require('braintree')
const {paypal} = require('../../config')

module.exports = class PayPal {

    constructor(accessToken) {
        this.gateway = braintree.connect({
            environment: paypal.env,
            accessToken: accessToken
        })
    }

    /**
     * Generate client token
     *
     * @returns {Promise.<{
     *               env:string,
     *               client:{
     *                   sandbox:string,
     *                   production:string
     *               }
     *           }>}
     */
    async generateToken() {
        try {
            const {clientToken} = await this.gateway.clientToken.generate({})
            const {env} = CONSTANTS
            return {
                env,
                client: {[env]: clientToken}
            }

        } catch (e) {
            console.error(TAG, 'generateToken -> ', e.message)
            throw Error(e)
        }
    }


    /**
     * Create the trasaction
     *
     * @param {string} amount
     * @param {string} currency
     * @param {string} nonce
     * @param {string} orderId
     *
     * @returns {Promise<{
     *                 success:boolean,
     *                 transaction:{
     *                     id:string,
     *                     type:string,
     *                     amount:string
     *                     status:string,
     *                     processorResponseType:string,
     *                     processorResponseCode:string,
     *                     processorResponseText:string
     *                 }
     *         }>}
     */
    async createTransaction(amount, currency, nonce, orderId) {
        try {
            if (!amount || !nonce || !currency)
                throw Error('Amount, currency and/or Nonce are required.')

            let saleRequest = {
                amount: amount,
                merchantAccountId: currency, // "USD"
                paymentMethodNonce: nonce,
                orderId,// "Mapped to PayPal Invoice Number",
                options: {submitForSettlement: true}
            }

            const response = await this.gateway.transaction.sale(saleRequest)

            return response

        } catch (e) {
            console.error(TAG, 'createTransaction -> ', e.message)
            throw Error(e)
        }
    }


    /**
     * Refund trasaction
     *
     * @param {string} transactionId
     * @param {string} amount
     * @param {string} orderId
     *
     * @returns {Promise<{
     *                 success:boolean,
     *                 transaction:{
     *                     type:string,
     *                     amount:string
     *                     status:string,
     *                     processorResponseCode:string,
     *                     processorResponseText:string
     *                 }
     *         }>}
     */
    async refundTransaction(transactionId, amount, orderId) {
        try {
            if (!transactionId)
                throw Error('TransactionId is required.')


            const response = await this.gateway.transaction.refund(transactionId, amount, orderId)

            return response

        } catch (e) {
            console.error(TAG, 'refundTransaction -> ', e.message)
            throw Error(e)
        }
    }
}