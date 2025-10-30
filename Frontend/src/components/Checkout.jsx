import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import axios from "axios";
import TableProduct from "./TableProduct";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, userAddress, url, user, clearCart } = useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let qty = 0;
    let price = 0;
    if (cart?.items) {
      for (let i = 0; i < cart.items?.length; i++) {
        qty += cart.items[i].qty;
        price += cart.items[i].price;
      }
    }
    setPrice(price);
    setQty(qty);
  }, [cart]);

  const handlePayment = async () => {
    try {
      const orderRepons = await axios.post(`${url}/payment/checkout`, {
        amount: price,
        qty: qty,
        cartItems: cart?.items,
        userShipping: userAddress,
        userId: user._id,
      });

      const { orderId, amount: orderAmount } = orderRepons.data;

      var options = {
        key: "rzp_test_gHH711O4gcSjCq",
        amount: orderAmount * 100,
        currency: "INR",
        name: "Web Dev Mastery",
        description: "Web Dev Mastery",
        order_id: orderId,
        handler: async function (response) {
          const paymentData = {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            amount: orderAmount,
            orderItems: cart?.items,
            userId: user._id,
            userShipping: userAddress,
          };

          const api = await axios.post(
            `${url}/payment/verify-payment`,
            paymentData
          );

          if (api.data.success) {
            clearCart();
            navigate("/oderconfirmation");
          }
        },
        prefill: {
          name: "Web Dev Mastery",
          email: "webdevmastery@gmail.com",
          contact: "9000090000",
        },
        notes: {
          address: "Vijay Nagar Indore",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container my-3">
        <h1 className="text-center mb-4">Order Summary</h1>

        {/* Responsive Table */}
        <div className="table-responsive">
          <table className="table table-bordered border-primary bg-dark">
            <thead>
              <tr>
                <th className="bg-dark text-light text-center">Product Details</th>
                <th className="bg-dark text-light text-center">Shipping Address</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="bg-dark text-light">
                  <TableProduct cart={cart} />
                </td>
                <td className="bg-dark text-light">
                  <ul className="list-unstyled fw-bold">
                    <li>Name: {userAddress?.fullName}</li>
                    <li>Phone: {userAddress?.phoneNumber}</li>
                    <li>Country: {userAddress?.country}</li>
                    <li>State: {userAddress?.state}</li>
                    <li>PinCode: {userAddress?.pincode}</li>
                    <li>Near By: {userAddress?.address}</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Buttons Section */}
      <div className="container text-center my-5">
        <h4 className="mb-3">Total Qty: {qty} | Total Price: ₹{price}</h4>
        <button
          className="btn btn-secondary btn-lg px-4"
          onClick={handlePayment}
        >
          Proceed To Pay
        </button>
      </div>
    </>
  );
};

export default Checkout;
