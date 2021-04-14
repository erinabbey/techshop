import React from 'react'
import {Typography, Button, Divider} from "@material-ui/core"
import {Elements, CardElement, ElementConsumer} from "@stripe/react-stripe-js"
import {loadStripe} from "@stripe/stripe-js"
import Review from "./Review" 


const stripePromise = loadStripe('pk_test_51IXgM0EDpMDaennxlxI0yIcok5OzVYXWOdWCsJG5Sc4yTM8reYgyLz6vRKhB0vsT1wxMMA6uXuoRfYiqyuNnOvUM00wPh0fcHS')


const PaymentForm = ({checkoutToken,shippingData, backStep, onCaptureCheckout , nextStep}) => {
    const handleSubmit = async (event, elements, stripe) =>{
        event.preventDefault()
        if(!stripe || !elements) return;

        const cardElements = elements.getElement(CardElement)

        const {error, paymentMethod}= await stripe.createPaymentMethod({type: 'card', card: cardElements})
        const captureCheckout = () => onCaptureCheckout()
        if(error){
            console.log(error)

        }else{
            const orderData = {
                line_items: checkoutToken.live.line_items,
                customer: {firstname: shippingData.firstName, lastname: shippingData.lastName, email: shippingData.email },
                shipping: {name: "Primary", 
                            street: shippingData.address1, 
                            town_city: shippingData.city, 
                            country_state: shippingData.shippingSubdivision,
                            country: shippingData.shippingCountry,
                            postal_zip_code: shippingData.zip,
                            },
                            fullfillment: {shipping_method: shippingData.shippingOption},
                            payment: {
                                gateway: 'stripe',
                                stripe:{
                                    payment_method_id: paymentMethod.id,
                                }
                            }
            }
            captureCheckout(checkoutToken.id, orderData)

            nextStep()
        }
    }
   
    return (
        <>
        <Review checkoutToken = {checkoutToken }/>
        <Divider/>
        <Typography variant = "h6" guttetBottom style = {{margin: '20px 0'}}>Payment method</Typography>
        <Elements stripe = {stripePromise}>
            <ElementConsumer>
                {(elements, stripe) =>(
                    <form onSubmit = {(e) => handleSubmit(e, elements, stripe)}>
                        <CardElement/>
                        <br/> <br/>
                        <div style = {{display: 'flex', justifyContent: 'space-between'}}>
                            <Button onClick = {backStep} variant = "outlined">Back</Button>
                            <Button variant = "containted"  type = "submit" color = "primary" disabled = {!stripe}>Pay {checkoutToken.live.subtotal.formatted_with_symbol}</Button>
                        </div>
                    </form>
                )}
            </ElementConsumer>
        </Elements>
        
        </>
    )
}

export default PaymentForm
