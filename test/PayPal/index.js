const {paypal: {accessToken}} = require('../../config')
const {expect} = require('chai')
const {PayPal} = require('../../')

describe('PayPal Testing', () => {
    it('Create Client Token', async () => {
        try {
            const payPal = new PayPal(accessToken)

            const clientToken = await payPal.createClienToken()

            expect(clientToken).to.be.a('string')

        } catch (e) {
            expect(e).to.be.a.null
        }
    })
})