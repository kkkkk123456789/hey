import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams,useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { selectedProducts,resetProducts,addTocart, removeFromcart,setallvariant,resetallvariants} from "../redux/actions/productAction";
import Loader from "./Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const url = `${process.env.REACT_APP_LOCALHOST_KEY}/api/shop/product`;

const Product = () => {
  const history = useHistory()
  const product = useSelector((state)=>state.product)
  const allvariant = useSelector((state)=>state.fetchallvarints.allvariants)
  
  const dispatch = useDispatch()
  const [sizecolor, setsizecolor] = useState();
  // const [allvariant,setallvariant] =  useState();
  console.log(sizecolor);
  const [loader, setloader] = useState(false)
  const [imgno,setimgno] = useState(0)
  const { slug } = useParams();
  useEffect(() => {
   
    (async function () {
      try {
        setloader(true)
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            slug: slug,
          }),
        });
        const data = await response.json();
        dispatch(selectedProducts(data.data))
        dispatch(setallvariant(data.variants))
        setsizecolor(data.colorsizeSlug);
        setloader(false)
      } catch (error) {
        setloader(false)
        console.log(error);
      }
    })();
    return ()=>{
      dispatch(resetProducts())
      dispatch(resetallvariants())
    }
  }, [dispatch, slug]);

  const BuyNowitem = async()=>{
    dispatch(removeFromcart())
    dispatch(addTocart(product))
    history.push("/checkout")
  }
  const senddata = ()=>{
    toast.success("Items added to cart", {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    dispatch(addTocart(product))
  }
  const changeimage = (ind)=>{
    setimgno(ind)
  }
  const changecolorimage = (slg)=>{
    history.push(`/product/${slg}`)
  }
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
            theme="colored"
          />
      {!loader && <section className="overflow-hidden text-gray-600 body-font">
        <div className="container py-10 md:py-24 ">
          <div className="flex flex-wrap md:mx-5">
            <div className="flex w-full lg:w-1/12 lg:block">
              {/* {data && data['red']['XL'].slug}               */}
              {product && product.image &&
                 Array.from(product.image).map((item,ind)=>{
                  return <div key={ind} onClick={()=>{changeimage(ind)}} className={`mx-2 my-1 shadow-2xl cursor-pointer lg:mx-0 rounded-lg ${ind === imgno ? "border-2 border-gray-800" : ""}`}>
                   <img
                   alt="ecommerce"
                   className="object-contain object-center h-24 mx-auto rounded"
                   src={ item}
                 /></div>
                })
              }
            </div>
           <div className="w-full rounded-lg lg:w-5/12">
            <img
              alt="ecommerce"
              className="object-contain object-center h-full mx-auto rounded-lg"
              src={product && product.image && product.image[imgno]}
            />
            </div>
            <div className="w-full mt-6 lg:w-6/12 lg:pl-10 lg:py-6 lg:mt-0">
              <h2 className="text-sm tracking-widest text-gray-500 title-font">
                {product && product.category}
              </h2>
              <h1 className="mb-1 text-3xl font-medium text-gray-900 title-font">
              {product && product.title}
              </h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span className="ml-3 text-gray-600">4 Reviews</span>
                </span>
                <span className="flex py-2 pl-3 ml-3 border-l-2 border-gray-200 space-x-2s">
                  <Link to="/" className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </Link>
                  <Link to="/" className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </Link>
                  <Link to="/" className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </Link>
                </span>
              </div>
              <p className="leading-relaxed">
                {product && product.desc}
              </p>
              <div className="items-center pb-5 mt-6 mb-5 border-b-2 border-gray-100">
                  <span className="ml-2">Colors : </span>
                <div className="flex">
                  {allvariant &&
                 Array.from(allvariant).map((item,ind)=>{
                  return <div key={ind} onClick={()=>{changecolorimage(item.slug)}} className={`mx-2 my-1 shadow-2xl cursor-pointer lg:mx-0 rounded-lg ${item.slug === slug ? "border-2 border-gray-800" : ""}`}>
                   <img
                   alt="ecommerce"
                   className="object-contain object-center h-24 mx-auto rounded"
                   src={item.image[0]}
                 /></div>
                })
              }
                </div>
                <div className="flex items-center ml-6">
                  <span className="mr-3">{product && product.size}</span>
                  <div className="relative">
                    <select className="py-2 pl-3 pr-10 text-base border border-gray-300 rounded appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500">
                      <option>SM</option>
                      <option>M</option>
                      <option>L</option>
                      <option>XL</option>
                    </select>
                    <span className="absolute top-0 right-0 flex items-center justify-center w-10 h-full text-center text-gray-600 pointer-events-none">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <p className="text-2xl font-medium text-gray-900 title-font">
                                <s>₹{(product.price + (product.price * product.discount))}</s>
                                <strong className="ms-2 text-danger">₹{product && product.price}</strong>
                </p>
                <button onClick={BuyNowitem} className="flex px-6 py-2 mx-3 text-white bg-indigo-500 border-0 rounded focus:outline-none hover:bg-indigo-600">
                  Buy Now
                </button>
                <button onClick={senddata} className="flex px-6 py-2 text-white bg-indigo-500 border-0 rounded focus:outline-none hover:bg-indigo-600">
                  Add to Cart
                </button>
                
              </div>
            </div>
          </div>
        </div>
      </section>}
      {loader && <Loader />}
    </>
  );
};

export default Product;
