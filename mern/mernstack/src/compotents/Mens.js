import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProducts } from "../redux/actions/productAction";
import { Link } from "react-router-dom";
const url = `${process.env.REACT_APP_LOCALHOST_KEY}/api/shop/allproduct`;

const Mens = () => {
  const products = useSelector((state) => state.allProducts.products);
  const dispatch = useDispatch();
  useEffect(() => {
    (async function () {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            gender: "Men",
          }),
        });
        const data = await response.json();
        dispatch(setProducts(data.data));
      } catch (error) {
        console.log(error);
      }
    })();
  }, [dispatch]);

  return (
    <div>
      {products && (
        <div>
          <section style={{ backgroundColor: "#eee" }}>
            <div className="container py-5 text-center">
              <h1 className="mt-0 mb-4">
                <strong className="text-2xl">
                Explore Our Tshirts Collection
                </strong>
              </h1>
              <div className="mx-2 md:mx-4 row">
                {Object.keys(products).map((data) => {
                  return (
                    <div key={data} className="mb-4 col-lg-3 col-md-6">
                          <Link  to={`/product/${products[data].slug}`}>
                          <div className="card">
                            <div
                              className="bg-image hover-zoom ripple"
                              data-mdb-ripple-color="light"
                            >
                              <img
                                src={products[data].image[0]}
                                className="object-contain mx-auto w-72 h-72 max-h-72"
                                alt=""
                              />
                              <Link to={`/product/${products[data].slug}`}>
                                <div className="mask">
                                  <div className="d-flex justify-content-start align-items-end h-100">
                                    <h5>
                                      <span className="badge bg-danger ms-2">
                                        {products[data].discount * 100}%
                                      </span>
                                    </h5>
                                  </div>
                                </div>
                                <div className="hover-overlay">
                                  <div
                                    className="mask"
                                    style={{
                                      backgroundColor:
                                        "rgba(251, 251, 251, 0.15)",
                                    }}
                                  ></div>
                                </div>
                              </Link>
                            </div>
                            <div className="card-body">
                              <Link to={`/product/${products[data].slug}`} className="text-reset">
                                <h5 className="mb-3 card-title">{products[data].title}</h5>
                              </Link>
                              <Link to={`/product/${products[data].slug}`} className="text-reset">
                                <p>{products[data].category}</p>
                              </Link>
                              <h6 className="mb-3">
                                <s>₹{products[data].price + (products[data].price * products[data].discount)}</s>
                                <strong className="ms-2 text-danger">₹{products[data].price}</strong>
                              </h6>
                            </div>
                          </div>
                      </Link>
                        </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default Mens;
