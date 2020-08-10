import makeAsyncScriptLoader from "react-async-script"
import paypalClient from 'braintree-web/client'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import paypalCheckout from 'braintree-web/paypal-checkout'

class PayPal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            configuration: props.configuration || {}
        }
        this.onPayment = this.onPayment.bind(this)
        this.onAuthorize = this.onAuthorize.bind(this)
    }

    onPayment(data, actions) {
        const { data: { total, currency } } = this.props
        return actions.braintree.create({
            flow: 'checkout',
            amount: total,
            currency: currency
        })
    }

    onAuthorize(payload, actions) {
        const { nonce } = payload
        // Send nonce to server
    }

    render() {
        const { configuration: { env, client } } = this.state
        // Crea el botón de Paypal
        const PayPalButton = paypal.Button.driver('react', { React, ReactDOM })

        return (
            <PayPalButton
                braintree={{
                    client: paypalClient,
                    paypalCheckout: paypalCheckout
                }}
                env={env}
                client={client}
                commit={true}
                payment={this.onPayment}
                onAuthorize={this.onAuthorize}
                style={{
                    "color": 'silver',
                    "shape": "rect",
                    "size": "responsive",
                    "label": "paypal",
                    "tagline": "false"
                }}
             />
        )
    }
}

export default makeAsyncScriptLoader('https://www.paypalobjects.com/api/checkout.js', {
    globalName: "paypal",
    removeOnUnmount: true
})(PayPal)

