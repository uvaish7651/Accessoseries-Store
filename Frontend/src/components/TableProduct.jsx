import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";

const TableProduct = ({ cart }) => {
  const { decreaseQty, addToCart, removeFromCart } = useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);

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
    <div className="container-fluid">
      <div className="table-responsive">
        <table className="table table-bordered border-primary text-center align-middle">
          <thead className="table-dark">
            <tr>
              <th scope="col">Product Img</th>
              <th scope="col">Title</th>
              <th scope="col">Price</th>
              <th scope="col">Qty</th>
              <th scope="col">Qty++</th>
              <th scope="col">Qty--</th>
              <th scope="col">Remove</th>
            </tr>
          </thead>
          <tbody>
            {cart?.items?.map((product) => (
              <tr key={product._id}>
                <td>
                  <img
                    src={product.imgSrc}
                    alt={product.title}
                    className="img-fluid rounded"
                    style={{ maxWidth: "50px", height: "auto" }}
                  />
                </td>
                <td className="text-light">{product.title}</td>
                <td className="text-warning fw-bold">{product.price}</td>
                <td className="text-info fw-bold">{product.qty}</td>
                <td>
                  <span
                    className="material-symbols-outlined text-success fs-4"
                    style={{ cursor: "pointer" }}
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
                    add_circle
                  </span>
                </td>
                <td>
                  <span
                    className="material-symbols-outlined text-warning fs-4"
                    style={{ cursor: "pointer" }}
                    onClick={() => decreaseQty(product?.productId, 1)}
                  >
                    do_not_disturb_on
                  </span>
                </td>
                <td>
                  <span
                    className="material-symbols-outlined text-danger fs-4"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      if (
                        window.confirm("Are you sure, want to remove from cart?")
                      ) {
                        removeFromCart(product?.productId);
                      }
                    }}
                  >
                    delete
                  </span>
                </td>
              </tr>
            ))}

            <tr>
              <td></td>
              <td>
                <button className="btn btn-primary fw-bold">Total</button>
              </td>
              <td>
                <button className="btn btn-warning fw-bold">{price}</button>
              </td>
              <td>
                <button className="btn btn-info fw-bold">{qty}</button>
              </td>
              <td colSpan="3"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableProduct;
