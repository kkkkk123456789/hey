import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { BsFillBagCheckFill } from "react-icons/bs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  decrementCartItem,
  incrementCartItem,
  removeFromcart,
} from "../redux/actions/productAction";
import { useHistory } from "react-router-dom";
const url = `${process.env.REACT_APP_LOCALHOST_KEY}/api/order/pincode`;

const Checkout = () => {
  const history = useHistory()
  const cart = useSelector((state) => state.cart.cartitem);
  const dispatch = useDispatch();
  const [disable, setdisable] = useState(true);
  const [userinfo, setuserinfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    pincode: "",
  });
  const [services, setservices] = useState({ state: "", dis: "" });
  const [pincodevalid, setpincodevalid] = useState(false);
  const [checkval, setcheckval] = useState(false);
  const [subtotal, setsubtotal] = useState(0);
  const handleChange = async (e) => {
    let name = e.target.name;
    let val = e.target.value;
    setuserinfo({ ...userinfo, [name]: val });
    setTimeout(() => {
      if (
        userinfo.name.length > 2 &&
        userinfo.email.length > 4 &&
        userinfo.address.length > 5 &&
        userinfo.phone.length === 10 &&
        pincodevalid
      ) {
        setdisable(false);
      }
    }, 100);
    if(name === 'pincode'){
        if(e.target.value.length === 6){
        try {
          let res = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              pincode: e.target.value,
            }),
          })
          let data = await res.json();
          if(data.success){
            setservices({ state: data.state, dis: data.city });
            setpincodevalid(true)
          }
          else {
            setservices({ state: "", dis: "" });
            setpincodevalid(false)
          }
        } catch (error) {
            toast.error('Some error accured', {
              position: "top-left",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
        }
      }
      else{
        setservices({ state: "", dis: "" });
        setpincodevalid(false)
      }
    }
  };
  const countprice = () => {
    let myCart = JSON.parse(localStorage.getItem("rcart")) || {};
    let subt = 0;
    let keys = Object.keys(myCart);
    for (let i = 0; i < keys.length; i++) {
      subt += myCart[keys[i]].price * myCart[keys[i]].qty;
    }
    setsubtotal(subt);
  };

  const getuserdata = async()=>{
    if(localStorage.getItem("logintoken")){
      let token = localStorage.getItem("logintoken")
       let res = await fetch(`${process.env.REACT_APP_LOCALHOST_KEY}/api/auth/getuser`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
               token:token
            }),
          })
          let userdata = await res.json();
          if(userdata.success){
            setuserinfo({
              name: userdata.user.fname + " " + userdata.user.lname || "",
              email: userdata.user.email || "",
              phone: userdata.user.mobileno || "",
              address: userdata.user.address || "",
              pincode: userdata.user.pincode || "",
            })
          }
  }
}
  useEffect(() => {
    getuserdata()
    countprice();
  }, [cart]);
  const orderitems = async()=>{
    if(checkval){
        let res = await fetch(`${process.env.REACT_APP_LOCALHOST_KEY}/api/order/createorder`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
               userinfo,services,cart,subtotal
            }),
          })
          let data = await res.json();
          if(data.success){
            toast.success(data.message, {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              dispatch(removeFromcart())
              history.push(`/orderdetails/${data.oid}`)
          }
          else{
            toast.error(data.message, {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
          }
    }else{
        toast.error('Please check the checkbox', {
            position: "top-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
    }
  }
  return (
    <div className="container mx-auto">
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
      <h1 className="my-4 text-3xl font-bold text-center">Checkout</h1>
      <div className="mx-3">
        <h2 className="text-2xl font-medium ">1. Delivery Details</h2>
        <div className="flex mx-auto">
          <div className="flex-col w-1/2 px-2">
            <label htmlFor="name" className="text-lg leading-7 text-gray-600">
              Name
            </label>
            <input
              value={userinfo.name}
              onChange={handleChange}
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
            />
          </div>
          <div className="flex-col w-1/2 px-2">
            <label htmlFor="email" className="text-lg leading-7 text-gray-600">
              Email
            </label>
           
              <input
                value={userinfo.email}
                onChange={handleChange}
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
              />
            
          </div>
        </div>
        <div className="w-full px-2 mt-5">
          <div className="relative">
            <label
              htmlFor="address"
              className="text-lg leading-7 text-gray-600"
            >
              Address
            </label>
            <textarea
              value={userinfo.address}
              onChange={handleChange}
              id="address"
              name="address"
              placeholder="Enter your Address"
              className="w-full h-32 px-3 py-1 text-base leading-6 text-gray-700 transition-colors duration-200 ease-in-out bg-white bg-opacity-50 border border-gray-300 rounded outline-none resize-none focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200"
            ></textarea>
          </div>
        </div>
        <div className="flex mx-auto mt-5">
          <div className="flex-col w-1/2 px-2">
            <label htmlFor="phone" className="text-lg leading-7 text-gray-600">
              Phone Number
            </label>
            <input
              value={userinfo.phone}
              onChange={handleChange}
              type="phone"
              id="phone"
              name="phone"
              placeholder="Your 10 digit phone number"
              className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
            />
          </div>
          <div className="flex-col w-1/2 px-2">
            <label
              htmlFor="pincode"
              className="text-lg leading-7 text-gray-600"
            >
              Pincode
            </label>
            <input
              maxLength={6}
              onChange={handleChange}
              value={userinfo.pincode}
              type="pincode"
              id="pincode"
              name="pincode"
              placeholder="Enter your pincode"
              className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
            />
          </div>
        </div>
        <div className="flex mx-auto mt-5">
          <div className="flex-col w-1/2 px-2">
            <label htmlFor="state" className="text-lg leading-7 text-gray-600">
              State
            </label>
            <input
              onChange={() => {}}
              readOnly
              value={services.state}
              type="state"
              id="state"
              name="state"
              placeholder="Enter your state"
              className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
            />
          </div>
          <div className="flex-col w-1/2 px-2">
            <label
              htmlFor="district"
              className="text-lg leading-7 text-gray-600"
            >
              District
            </label>
            <input
              onChange={() => {}}
              readOnly
              value={services.dis}
              type="district"
              id="district"
              name="district"
              placeholder="Enter your district"
              className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
            />
          </div>
        </div>
      </div>
      <div className="mx-3 my-5">
        <h2 className="text-2xl font-medium ">2. Review Cart Items & Pay</h2>

        <div className="w-full mt-3 bg-pink-200 border sideCart">
          <div className="my-5">
            <div className="ml-12 cartitems">
              {Object.keys(cart).length !== 0 && (
                <ol className="font-medium list-decimal">
                  {Object.keys(cart).map((k) => {
                    return (
                      <li key={k} className="py-2">
                        <div className="flex item">
                          <div className="w-2/3 text-lg font-semibold md:w-1/2">{`${cart[k].itemname}(${cart[k].size}/${cart[k].variant})`}</div>
                          <div className="flex items-center justify-center w-1/3 md:w-1/2 md:justify-start">
                            <div
                              onClick={() => {
                                dispatch(decrementCartItem(k));
                              }}
                              className="px-2 cursor-pointer"
                            >
                              <FaMinusCircle className="text-xl text-pink-500" />
                            </div>
                            <div>{cart[k].qty}</div>
                            <div
                              onClick={() => {
                                dispatch(
                                  incrementCartItem(
                                    k,
                                    cart[k].price,
                                    cart[k].itemname,
                                    cart[k].size,
                                    cart[k].variant
                                  )
                                );
                              }}
                              className="px-2 cursor-pointer"
                            >
                              <FaPlusCircle className="text-xl text-pink-500" />
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              )}
              {Object.keys(cart).length === 0 && "Your cart is Empty!"}
            </div>
            <div className="ml-10 text-xl font-bold mt-7">
              Subtotal : ₹{subtotal}
            </div>
          </div>
        </div>
      </div>
      <div className="mx-3 my-5">
        <div className="lg:flex lg:items-center">
          <div className="flex items-center mx-2 form-check lg:w-2/3">
            <input
              onClick={() => {
                setcheckval(!checkval);
              }}
              id="myCheck"
              type="checkbox"
              value={checkval}
              className="w-4 h-4 mr-2 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <div className="inline-block text-gray-800 form-check-label">
              I want to place a Cash on Delivery (COD) Order. I promise to pay
              the delivery partner on delivery
            </div>
          </div>
          <div className="lg:w-1/3">
            <h1 className="mt-4 mb-2 text-md">Apply Promo code</h1>
            <input
              type="text"
              id="email"
              name="number"
              placeholder="Enter code(Only prepaid)"
              className="w-40 px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none md:w-60 focus:border-pink-500 focus:ring-2 focus:ring-indigo-200"
            />
            <button className="px-3 py-2 ml-4 text-white bg-pink-500 border-0 rounded md:ml-10 md:px-6 focus:outline-none hover:bg-pink-600 disabled:bg-pink-400">
              Apply
            </button>
          </div>
        </div>
      </div>
      <div className="mx-5 my-5">
        <button
          onClick={orderitems}
          className="flex items-center px-4 py-2 text-lg text-white bg-pink-500 border-0 rounded focus:outline-none hover:bg-pink-600 disabled:bg-pink-300"
          disabled={disable}
        >
          <BsFillBagCheckFill className="text-xl" />
          <span className="pl-2"> Pay₹{subtotal}</span>
        </button>
      </div>
    </div>
  );
};

export default Checkout;
