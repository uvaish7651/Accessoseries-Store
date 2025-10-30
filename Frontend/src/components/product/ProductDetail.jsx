import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import RelatedProduct from "./RelatedProduct";

const ProductDetail = () => {
  const [product, setProduct] = useState();
  const { id } = useParams();
  const url = "http://localhost:1000/api";

  useEffect(() => {
    const fetchProduct = async () => {
      const api = await axios.get(`${url}/product/${id}`, {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      });
      setProduct(api.data.product);
    };
    fetchProduct();
  }, [id]);

  return (
    <>
      <div
        className="container my-5 d-flex flex-column flex-md-row align-items-center justify-content-evenly text-center text-md-start"
      >
        {/* Left - Product Image */}
        <div className="mb-4 mb-md-0">
          <img
            src={product?.imgSrc}
            alt={product?.title}
            className="img-fluid rounded"
            style={{
              maxWidth: "300px",
              border: "2px solid yellow",
              borderRadius: "10px",
            }}
          />
        </div>

        {/* Right - Product Info */}
        <div className="px-3">
          <h1 className="h3 h-md2">{product?.title}</h1>
          <p className="text-muted">{product?.description}</p>
          <h2 className="text-success fw-bold">
            ₹{product?.price}
          </h2>

          <div className="my-4">
            <button className="btn btn-danger mx-2 fw-bold">Buy Now</button>
            <button className="btn btn-warning fw-bold">Add To Cart</button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProduct category={product?.category} />
    </>
  );
};

export default ProductDetail;
