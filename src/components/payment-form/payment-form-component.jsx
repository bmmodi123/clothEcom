import { CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../button/button.component';

import { selectCartTotal } from '../../store/cart/cart-selector';
import { selectCurrentUser } from '../../store/user/user-selector';

import { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { PaymentFormContainer , FormContainer} from './payment-form-styles';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const currentUser = useSelector(selectCurrentUser);
    const amount = useSelector(selectCartTotal);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    const paymentHandler  = async (event) => {
        event.preventDefault();

        if(!stripe || !elements) return;
        setIsProcessingPayment(true);
        const response = await fetch('/.netlify/functions/create-payment-intent', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount:amount*100 }), 
        }).then((res) => {return res.json();});

        const clientSecret = response.paymentIntent.client_secret;

        const paymentResult = await stripe.confirmCardPayment(clientSecret, { payment_method: 
            {
              card: elements.getElement(CardElement),
              billing_details: {
                name: currentUser? currentUser.displayName : 'Guest',
              },
            },
          }
        );

        setIsProcessingPayment(false);

        if (paymentResult.error) {
          alert(paymentResult.error.message);
        } else {
          if (paymentResult.paymentIntent.status === 'succeeded') {
            alert('Payment Successful!');
          }
        }

    }

    return (
        <PaymentFormContainer>
          <FormContainer onSubmit={paymentHandler}>
            <h2>Credit Card Payment:</h2>
            <CardElement />
            <Button class="" buttonType={BUTTON_TYPE_CLASSES.inverted} isLoading={isProcessingPayment}>
              Pay Now
            </Button>
          </FormContainer>
        </PaymentFormContainer>
      );
};

export default PaymentForm;