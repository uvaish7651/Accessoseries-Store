import React, { useContext, useState, useEffect } from "react";
import AppContext from "../../context/AppContext";
import { Link, useParams } from "react-router-dom";

const SearchProduct = () => {
  const { products } = useContext(AppContext);
  const [searchProduct, setSearchProduct] = useState([]);
  const { term } = useParams();

  useEffect(() => {
    setSearchProduct(
      products.filter((data) =>
        data?.title?.toLowerCase().includes(term.toLowerCase())
      )
    );
  }, [term, products]);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">
        Search Results for <span className="text-warning">"{term}"</span>
      </h2>

      {searchProduct.length > 0 ? (
        <div className="row g-4">
          {searchProduct.map((product) => (
            <div
              key={product._id}
              className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center"
            >
              <div
                className="card bg-dark text-light text-center shadow-sm"
                style={{ width: "100%", maxWidth: "18rem" }}
              >
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
      ) : (
        <h4 className="text-center text-muted mt-5">No products found.</h4>
      )}
    </div>
  );
};

export default SearchProduct;
