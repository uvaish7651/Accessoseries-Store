import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import ShowOrderProduct from "../ShowOrderProduct";

const Profile = () => {
  const { user, userOrder } = useContext(AppContext);

  return (
    <>
      {/* User Info */}
      <div className="container text-center my-4">
        <h2 className="fw-bold">Welcome, {user?.name}</h2>
        <h5 className="text-muted">{user?.email}</h5>
        <h4 className="mt-3">Total Orders: <span className="text-warning">{userOrder?.length}</span></h4>
      </div>

      {/* Orders Table */}
      <div className="container my-5">
        {userOrder?.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-bordered border-primary bg-dark text-light">
              <thead>
                <tr>
                  <th scope="col" className="text-center">Order Items</th>
                  <th scope="col" className="text-center">Order Details & Shipping Address</th>
                </tr>
              </thead>
              <tbody>
                {userOrder.map((product) => (
                  <tr key={product._id}>
                    <td>
                      <ShowOrderProduct items={product?.orderItems} />
                    </td>
                    <td>
                      <ul className="list-unstyled fw-bold">
                        <li>OrderId : {product?.orderId}</li>
                        <li>PaymentId : {product?.paymentId}</li>
                        <li>PaymentStatus : {product?.payStatus}</li>
                        <li>Name : {product?.userShipping?.fullName}</li>
                        <li>Phone : {product?.userShipping?.phoneNumber}</li>
                        <li>Country : {product?.userShipping?.country}</li>
                        <li>State : {product?.userShipping?.state}</li>
                        <li>PinCode : {product?.userShipping?.pincode}</li>
                        <li>Near By : {product?.userShipping?.address}</li>
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <h5 className="text-center text-muted">You have no orders yet.</h5>
        )}
      </div>
    </>
  );
};

export default Profile;
