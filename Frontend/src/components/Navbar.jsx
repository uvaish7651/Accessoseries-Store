import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AppContext from "../context/AppContext";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { setFilteredData, products, logout, isAuthenticated, cart } =
    useContext(AppContext);

  const filterbyCategory = (cat) => {
    setFilteredData(
      products.filter(
        (data) => data.category.toLowerCase() === cat.toLowerCase()
      )
    );
  };

  const filterbyPrice = (price) => {
    setFilteredData(products.filter((data) => data.price >= price));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/product/search/${searchTerm}`);
    setSearchTerm("");
    setMenuOpen(false); // close menu after search
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container-fluid">
          {/* Brand */}
          <Link className="navbar-brand fw-bold" to="/">
           Electronics Store
          </Link>

          {/* Toggle Button (Mobile) */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Content */}
          <div
            className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}
            id="navbarContent"
          >
            {/* Search Bar */}
            <form
              className="d-flex mx-auto my-2 my-lg-0"
              onSubmit={submitHandler}
              style={{ maxWidth: "400px", width: "100%" }}
            >
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search Products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn btn-outline-info" type="submit">
                Search
              </button>
            </form>

            {/* Right Side Buttons */}
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {isAuthenticated ? (
                <>
                  <li className="nav-item mx-1 my-1">
                    <Link
                      to="/cart"
                      className="btn btn-primary position-relative"
                    >
                      <span className="material-symbols-outlined">
                        shopping_cart
                      </span>
                      {cart?.items?.length > 0 && (
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                          {cart.items.length}
                        </span>
                      )}
                    </Link>
                  </li>
                  <li className="nav-item mx-1 my-1">
                    <Link to="/profile" className="btn btn-info">
                      Profile
                    </Link>
                  </li>
                  <li className="nav-item mx-1 my-1">
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        logout();
                        navigate("/");
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item mx-1 my-1">
                    <Link to="/login" className="btn btn-secondary">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item mx-1 my-1">
                    <Link to="/register" className="btn btn-info">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Sub-Category Filter (only on Home page) */}
      {location.pathname === "/" && (
        <div className="bg-light py-2 px-3 text-center flex-wrap d-flex justify-content-center">
          <span
            className="mx-2 my-1 badge bg-secondary p-2"
            style={{ cursor: "pointer" }}
            onClick={() => setFilteredData(products)}
          >
            No Filter
          </span>
          {["mobiles", "laptops", "cameras", "headphones"].map((cat) => (
            <span
              key={cat}
              className="mx-2 my-1 badge bg-primary p-2"
              style={{ cursor: "pointer" }}
              onClick={() => filterbyCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </span>
          ))}

          {/* Price Filters */}
          {[15999, 25999, 49999, 69999, 89999].map((p) => (
            <span
              key={p}
              className="mx-2 my-1 badge bg-warning text-dark p-2"
              style={{ cursor: "pointer" }}
              onClick={() => filterbyPrice(p)}
            >
              {p}
            </span>
          ))}
        </div>
      )}
    </>
  );
};

export default Navbar;
