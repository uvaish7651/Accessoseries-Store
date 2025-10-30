import React, { useContext, useState, useEffect } from "react";
import AppContext from "../../context/AppContext";
import { Link } from "react-router-dom";

const RelatedProduct = ({ category }) => {
  const { products } = useContext(AppContext);
  const [relatedProduct, setRelatedProduct] = useState([]);

  useEffect(() => {
    setRelatedProduct(
      products.filter(
        (data) => data?.category?.toLowerCase() === category?.toLowerCase()
      )
    );
  }, [category, products]);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Related Products</h2>
      
      <div className="row g-4">
        {relatedProduct?.map((product) => (
          <div
            key={product._id}
            className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center"
          >
            <div className="card bg-dark text-light text-center shadow-sm" style={{ width: "100%", maxWidth: "18rem" }}>
              <Link
                to={`/product/${product._id}`}
                className="d-flex justify-content-center align-items-center p-3"
              >
                <img
                  src={product.imgSrc}
                  className="card-img-top"
                  alt={product.title}
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "10px",
                    border: "2px solid yellow",
                    objectFit: "cover",
                  }}
                />
              </Link>
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <div className="my-3 d-flex flex-column flex-sm-row justify-content-center gap-2">
                  <button className="btn btn-primary fw-bold">
                    ₹{product.price}
                  </button>
                  <button className="btn btn-warning fw-bold">
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProduct;
