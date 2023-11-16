import React from "react";
import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch,useSelector } from "react-redux";
import { fetchmyorder } from "../redux/actions/productAction";
import {BsArrowRight} from "react-icons/bs"

const Myorder = () => {
  const myorders = useSelector((state)=>state.feorder.myorder)
  const dispatch = useDispatch()
  const history = useHistory();
  useEffect(() => {
    let token = localStorage.getItem("logintoken");
    if (!token) {
      history.push("/");
    } else {
      (async function () {
        try {
          let responce = await fetch(
            `${process.env.REACT_APP_LOCALHOST_KEY}/api/order/myorders`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                token: token,
              }),
            }
          );
          let res = await responce.json();
          if (res.success) {
            dispatch(fetchmyorder(res.orders))
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
        }
      })();
    }
  }, [dispatch, history]);

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
      <div className="overflow-x-auto md:mx-20 ">
        <h1 className="my-5 text-3xl font-bold text-center text-black">
          My Orders
        </h1>
        <table className="table mb-0 align-middle bg-white">
          <thead className="bg-light">
            <tr>
              <th>Order Id</th>
              <th>Product Name</th>
              <th>Amount</th>
              <th>Payment Status</th>
              <th>Delivery Status</th>
              <th>Orderdetail</th>
            </tr>
          </thead>
          <tbody>
            {myorders &&
              Array.from(myorders).map((item, ind) => {
                return (<tr key={ind}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="">
                          <p className="mb-1 fw-bold">{item.orderId}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      {Object.keys(item.products).map((ite, ind)=>{
                       return  <p key={ind} className="mb-1 fw-normal">
                       {item.products[ite].itemname}
                     </p>
                      })}
                     
                    </td>
                    <td>
                      <span className="badge badge-success rounded-pill d-inline">
                        {item.amount}
                      </span>
                    </td>
                    <td>{item.paymentInfo}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-link btn-sm btn-rounded"
                      >
                        {item.deliveryStatus}
                      </button>
                    </td>
                    <td>
                      <Link to={`/orderdetails/${item.orderId}`}>
                      <button
                        type="button"
                        className="btn btn-link btn-sm btn-rounded"
                      >
                        <BsArrowRight size={20}/>
                      </button>
                      </Link>
                    </td></tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Myorder;
