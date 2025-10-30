import React, { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Address = () => {
  const { shippingAddress, userAddress } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    phoneNumber: "",
  });

  const onChangerHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { fullName, address, city, state, country, pincode, phoneNumber } =
    formData;

  const submitHandler = async (e) => {
    e.preventDefault();

    const result = await shippingAddress(
      fullName,
      address,
      city,
      state,
      country,
      pincode,
      phoneNumber
    );

    if (result.success) {
      navigate("/checkout");
    }

    setFormData({
      fullName: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      phoneNumber: "",
    });
  };

  return (
    <div className="container my-4 d-flex justify-content-center">
      <div
        className="w-100 p-4 shadow rounded"
        style={{ maxWidth: "800px", border: "2px solid yellow" }}
      >
        <h2 className="text-center mb-4">Shipping Address</h2>
        <form onSubmit={submitHandler}>
          <div className="row g-3">
            {/* Full Name */}
            <div className="col-12 col-md-4">
              <label className="form-label">Full Name</label>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={onChangerHandler}
                type="text"
                className="form-control bg-dark text-light"
                placeholder="Enter full name"
                required
              />
            </div>

            {/* Country */}
            <div className="col-12 col-md-4">
              <label className="form-label">Country</label>
              <input
                name="country"
                value={formData.country}
                onChange={onChangerHandler}
                type="text"
                className="form-control bg-dark text-light"
                placeholder="Enter country"
                required
              />
            </div>

            {/* State */}
            <div className="col-12 col-md-4">
              <label className="form-label">State</label>
              <input
                name="state"
                value={formData.state}
                onChange={onChangerHandler}
                type="text"
                className="form-control bg-dark text-light"
                placeholder="Enter state"
                required
              />
            </div>
          </div>

          <div className="row g-3 mt-1">
            {/* City */}
            <div className="col-12 col-md-4">
              <label className="form-label">City</label>
              <input
                name="city"
                value={formData.city}
                onChange={onChangerHandler}
                type="text"
                className="form-control bg-dark text-light"
                placeholder="Enter city"
                required
              />
            </div>

            {/* Pincode */}
            <div className="col-12 col-md-4">
              <label className="form-label">Pincode</label>
              <input
                name="pincode"
                value={formData.pincode}
                onChange={onChangerHandler}
                type="number"
                className="form-control bg-dark text-light"
                placeholder="Enter pincode"
                required
              />
            </div>

            {/* Phone Number */}
            <div className="col-12 col-md-4">
              <label className="form-label">Phone Number</label>
              <input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={onChangerHandler}
                type="number"
                className="form-control bg-dark text-light"
                placeholder="Enter phone number"
                required
              />
            </div>
          </div>

          {/* Address */}
          <div className="mt-3">
            <label className="form-label">Address / Nearby</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={onChangerHandler}
              className="form-control bg-dark text-light"
              placeholder="Enter full address"
              rows="3"
              required
            />
          </div>

          {/* Submit */}
          <div className="d-grid col-6 mx-auto my-3">
            <button
              type="submit"
              className="btn btn-primary fw-bold"
            >
              Submit
            </button>
          </div>
        </form>

        {/* Old Address Button */}
        {userAddress && (
          <div className="d-grid col-6 mx-auto my-3">
            <button
              className="btn btn-warning fw-bold"
              onClick={() => navigate("/checkout")}
            >
              Use Old Address
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Address;
