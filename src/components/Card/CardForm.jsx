// components/CardForm.js
"use client";
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import 'bulma/css/bulma.min.css'; // Import Bulma CSS
import './style.css'; // Import your custom CSS

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const CardForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { error, token } = await stripe.createToken(cardElement);

    if (error) {
      console.error(error);
    } else {
      const response = await fetch('/api/addCard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: token.id }),
      });

      if (response.ok) {
        console.log('Card added successfully!');
      } else {
        console.error('Failed to add card');
      }
    }
  };

  return (
    <div className="section is-fullheight">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-half">
            <div className="box">
              <h1 className="title">Add Your Card</h1>
              <form onSubmit={handleSubmit}>
                <div className="field">
                  <label className="label">Card Information</label>
                  <div className="control">
                    <div className="stripe-input">
                      <CardElement
                        options={{
                          style: {
                            base: {
                              fontSize: '16px',
                              color: '#32325d',
                              '::placeholder': {
                                color: '#aab7c4',
                              },
                            },
                            invalid: {
                              color: '#fa755a',
                            },
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <button
                      type="submit"
                      className="button is-primary"
                      disabled={!stripe}
                    >
                      Add Card
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const WrappedCardForm = () => (
  <Elements stripe={stripePromise}>
    <CardForm />
  </Elements>
);

export default WrappedCardForm;

