import { CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { PaymentButton, PaymentFormContainer , FormContainer} from './payment-form-styles';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const paymentHandler  = async (event) => {
        event.preventDefault();

        if(!stripe || !elements) return;

        const response = await fetch('/.netlify/functions/create-payment-intent', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount: 100 }),
        }).then((res) => {return res.json();});

        const clientSecret = response.paymentIntent.client_secret;

        const paymentResult = await stripe.confirmCardPayment(clientSecret, 
          { 
            payment_method: 
            {
              card: elements.getElement(CardElement),
              billing_details: {
                name: 'Yihua Zhang',
              },
            },
          }
        );

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
            <PaymentButton buttonType={BUTTON_TYPE_CLASSES.inverted}>
              Pay Now
            </PaymentButton>
          </FormContainer>
        </PaymentFormContainer>
      );
};

export default PaymentForm;