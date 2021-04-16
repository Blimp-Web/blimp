import React from "react";
import ReactDOM from "react-dom";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { toast } from "react-toastify";

import dotEnv from 'dotenv'

import firebase from "firebase/app"
import "firebase/auth";
import "firebase/database";

import "react-toastify/dist/ReactToastify.css";
import "../App.css";

toast.configure();

export default function Stripe() {
  const [product] = React.useState({
    name: sessionStorage.getItem('CURRENT_ITEM'),
    price: sessionStorage.getItem('CURRENT_PRICE'),
    description: "Cool Product"
  });

  async function handleToken(token, addresses) {
    const response = await axios.post(
      "https://bg55m.sse.codesandbox.io/checkout",
      { token, product }
    );
    const { status } = response.data;
    console.log("Response:", response.data);
    if (status === "success") {
      toast("Success! Check email for details", { type: "success" });
      var today = new Date();
      console.log(addresses)
      firebase.database().ref(/users/+ 'joey@gmailcom' + '/orders').push({
        item: sessionStorage.getItem('CURRENT_ITEM'),
        payment: sessionStorage.getItem('CURRENT_PRICE'),
        user: 'jerru',
        phone: '514 728 5965',
        address: addresses.billing_address_line1,
        country: addresses.billing_address_country,
        spr: addresses.billing_address_state,
        city: addresses.billing_address_city,
        postal: addresses.billing_address_zip,
        time: today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()

      });
      firebase.database().ref(/users/+ 'joey@gmailcom' + '/balance').push({
        payment: sessionStorage.getItem('CURRENT_PRICE'),
        time: today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
      });
    } else {
      toast("Something went wrong", { type: "error" });
    }
  }

  return (
    <div className="container">
      <div id={'product'} className="product">
        <h1 id={'name'}>{product.name}</h1>
        <h3 id={'price'}>On Sale · ${product.price}</h3>
      </div>
      <StripeCheckout
        stripeKey="pk_test_51IZGe7Eq55uusKnKWDlm6fMrMWwY8wzqJE30P1O8pMp7ou3zZnXOCCAoHNzv1OS5vZ6u1lkg4xUg68nsGnRXbS0C003oHru8dZ"
        token={handleToken}
        amount={product.price * 100}
        name={sessionStorage.getItem('CURRENT_ITEM')}
        billingAddress
        shippingAddress
      />
    </div>
  );
}
