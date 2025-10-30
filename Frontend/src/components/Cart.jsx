import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, decreaseQty, addToCart, removeFromCart, clearCart } =
    useContext(AppContext);
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

  return (
    <>
      {cart?.items?.length === 0 ? (
        <div className="text-center my-5">
          <button
            className="btn btn-warning mx-3 fw-bold fs-5"
            onClick={() => navigate("/")}
          >
            Continue Shopping...
          </button>
        </div>
      ) : (
        <div className="my-5 text-center">
          <button className="btn btn-info mx-2 fw-bold fs-5">
            Total Qty : {qty}
          </button>
          <button className="btn btn-warning mx-2 fw-bold fs-5">
            Total Price : {price}
          </button>
        </div>
      )}

      {cart?.items?.map((product) => (
        <div
          key={product._id}
          className="container p-3 bg-dark my-4 text-light rounded"
        >
          <div className="row align-items-center text-center text-md-start">
            {/* Image */}
            <div className="col-12 col-md-3 mb-3 mb-md-0">
              <img
                src={product.imgSrc}
                alt=""
                className="img-fluid rounded"
                style={{ maxHeight: "120px", objectFit: "cover" }}
              />
            </div>

            {/* Description */}
            <div className="col-12 col-md-4 mb-3 mb-md-0">
              <h5>{product.title}</h5>
              <p className="mb-1">Price: ₹{product.price}</p>
              <p className="mb-0">Qty: {product.qty}</p>
            </div>

            {/* Actions */}
            <div className="col-12 col-md-5 d-flex flex-wrap justify-content-center justify-content-md-end gap-2">
              <button
                className="btn btn-warning fw-bold"
                onClick={() => decreaseQty(product?.productId, 1)}
              >
                Qty--
              </button>
              <button
                className="btn btn-info fw-bold"
                onClick={() =>
                  addToCart(
                    product?.productId,
                    product.title,
                    product.price / product.qty,
                    1,
                    product.imgSrc
                  )
                }
              >
                Qty++
              </button>
              <button
                className="btn btn-danger fw-bold"
                onClick={() => {
                  if (confirm("Are you sure, want remove from cart")) {
                    removeFromCart(product?.productId);
                  }
                }}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}

      {cart?.items?.length > 0 && (
        <div className="container text-center my-3">
          <button
            className="btn btn-warning mx-2 fw-bold"
            onClick={() => navigate("/shipping")}
          >
            Checkout
          </button>
          <button
            className="btn btn-danger mx-2 fw-bold"
            onClick={() => {
              if (confirm("Are you sure, want clear cart ...?")) {
                clearCart();
              }
            }}
          >
            Clear Cart
          </button>
        </div>
      )}
    </>
  );
};

export default Cart;
