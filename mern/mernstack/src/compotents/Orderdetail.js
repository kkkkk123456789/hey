import React from "react";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchmyorderdetails,remove_fetch_order_details } from "../redux/actions/productAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Errorpage from "./404page";

const Orderdetail = () => {
  const orderdetail = useSelector((state) => state.fetchorderdetails);
  const params = useParams();
  const oid = params.oid;
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    let token = localStorage.getItem("logintoken");
    if (!token) {
      history.push("/");
    } else {
      (async function () {
        try {
          let responce = await fetch(
            `${process.env.REACT_APP_LOCALHOST_KEY}/api/order/myordersdetails`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                token: token,
                oid,
              }),
            }
          );
          let res = await responce.json();
          if (res.success) {
            dispatch(fetchmyorderdetails(res.orders));
          } else {
            toast.error("Some error accured", {
              position: "top-left",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        } catch (error) {
          console.log(error);
          toast.error("Some error accured, this will be show in console", {
            position: "top-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })();
    }
    return(()=>{
      dispatch(remove_fetch_order_details())
    })
  }, [dispatch, history, oid]);

  return (
    <>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {orderdetail !== undefined && Object.keys(orderdetail).length !== 0 ? (
        <div>
          <section className="h-100 gradient-custom">
            <div className="container py-5 h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-lg-10 col-xl-8">
                  <div className="card" style={{ borderRadius: "10px" }}>
                    <div className="px-4 py-5 card-header">
                      <h5 className="mb-0 text-muted">
                        Thanks for your Order,{" "}
                        <span style={{ color: "#a8729a" }}>
                          {orderdetail[0] && orderdetail[0].name}
                        </span>
                        !
                      </h5>
                    </div>
                    <div className="p-4 card-body">
                      <div className="mb-4 d-flex justify-content-between align-items-center">
                        <p
                          className="mb-0 lead fw-normal"
                          style={{ color: "#a8729a" }}
                        >
                          Receipt
                        </p>
                        <p className="mb-0 small text-muted">
                          Receipt Voucher : 1KAU9-84UIL
                        </p>
                      </div>
                      {orderdetail[0] &&
                        Object.keys(orderdetail[0].products).map((ite, ind) => {
                          return (
                            <div
                              key={ind}
                              className="mb-4 border card shadow-0"
                            >
                              <div className="card-body">
                                <div className="row">
                                  <div className="col-md-2">
                                    <img
                                      src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/13.webp"
                                      className="img-fluid"
                                      alt="Phone"
                                    />
                                  </div>
                                  <div className="text-center col-md-2 d-flex justify-content-center align-items-center">
                                    <p className="mb-0 text-muted">
                                      {" "}
                                      {orderdetail[0].products[ite].itemname}
                                    </p>
                                  </div>
                                  <div className="text-center col-md-2 d-flex justify-content-center align-items-center">
                                    <p className="mb-0 text-muted small">
                                      {" "}
                                      {orderdetail[0].products[ite].variant}
                                    </p>
                                  </div>
                                  <div className="text-center col-md-2 d-flex justify-content-center align-items-center">
                                    <p className="mb-0 text-muted small">
                                      Size: {orderdetail[0].products[ite].size}
                                    </p>
                                  </div>
                                  <div className="text-center col-md-2 d-flex justify-content-center align-items-center">
                                    <p className="mb-0 text-muted small">
                                      Qty: {orderdetail[0].products[ite].qty}
                                    </p>
                                  </div>
                                  <div className="text-center col-md-2 d-flex justify-content-center align-items-center">
                                    <p className="mb-0 text-muted small">
                                      ₹ {orderdetail[0].products[ite].price}
                                    </p>
                                  </div>
                                </div>
                                <hr
                                  className="mb-4"
                                  style={{
                                    backgroundColor: "#e0e0e0",
                                    opacity: 1,
                                  }}
                                />
                                <div className="row d-flex align-items-center">
                                  <div className="col-md-2">
                                    <p className="mb-0 text-muted small">
                                      Track Order
                                    </p>
                                  </div>
                                  <div className="col-md-10">
                                    <div
                                      className="progress"
                                      style={{
                                        height: "6px",
                                        borderRadius: "16px",
                                      }}
                                    >
                                      <div
                                        className="progress-bar"
                                        role="progressbar"
                                        style={{
                                          width: "65%",
                                          borderRadius: "16px",
                                          backgroundColor: "#a8729a",
                                        }}
                                        aria-valuenow="65"
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                      ></div>
                                    </div>
                                    <div className="mb-1 d-flex justify-content-around">
                                      <p className="mt-1 mb-0 text-muted small ms-xl-5">
                                        Out for delivary
                                      </p>
                                      <p className="mt-1 mb-0 text-muted small ms-xl-5">
                                        Delivered
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}

                      <div className="pt-2 d-flex justify-content-between">
                        <p className="mb-0 fw-bold">Order Details</p>
                        <p className="mb-0 text-muted">
                          <span className="fw-bold me-4">Total</span> ₹
                          {orderdetail[0] && orderdetail[0].amount}
                        </p>
                      </div>

                      <div className="pt-2 d-flex justify-content-between">
                        <p className="mb-0 text-muted">
                          Invoice Number :{" "}
                          {orderdetail[0] && orderdetail[0].orderId}
                        </p>
                        <p className="mb-0 text-muted">
                          <span className="fw-bold me-4">Delivery Charges</span>{" "}
                          Free
                        </p>
                      </div>

                      <div className="d-flex justify-content-between">
                        <p className="mb-0 text-muted">
                          Invoice Date :{" "}
                          {orderdetail[0] &&
                            new Date(
                              orderdetail[0].createdAt
                            ).toLocaleDateString("en-IN", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                        </p>
                      </div>

                      {/* <div className="mb-5 d-flex justify-content-between">
                      <p className="mb-0 text-muted">
                        Recepits Voucher : 18KU-62IIK
                      </p>
                      <p className="mb-0 text-muted">
                        <span className="fw-bold me-4">Delivery Charges</span> Free
                      </p>
                    </div> */}
                    </div>
                    <div
                      className="px-4 py-5 border-0 card-footer"
                      style={{
                        backgroundColor: "#a8729a",
                        borderBottomLeftRadius: "10px",
                        borderBottomRightRadius: "10px",
                      }}
                    >
                      <h5 className="mb-0 text-white d-flex align-items-center justify-content-end text-uppercase">
                        Total paid:{" "}
                        <span className="mb-0 h2 ms-2">
                          ₹{orderdetail[0] && orderdetail[0].amount}
                        </span>
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <Errorpage message={"Order details not found"} sug={"please check your login status"} order_id = {oid}/>
      )}
    </>
  );
};

export default Orderdetail;
