import React from 'react'
import "../css/errorpage.css"

const Errorpage = (props) => {
  return (
    <div className='ordererror'>
          <div className="container">
            <div className="error">
              <p className="p">4</p>
              <span className="dracula">
                <div className="con">
                  <div className="hair"></div>
                  <div className="hair-r"></div>
                  <div className="head"></div>
                  <div className="eye"></div>
                  <div className="eye eye-r"></div>
                  <div className="mouth"></div>
                  <div className="blod"></div>
                  <div className="blod blod2"></div>
                </div>
              </span>
              <p className="p">4</p>

              <div className="page-ms">
                <p className="page-msg">
                  {" "}
                  {props.order_id}{" "}{props.message}
                </p>
                <p className="page-msg">
                  {" "}
                  {props.sug}
                </p>
                <button className="go-back">Go Back</button>
              </div>
            </div>
          </div>
        </div>
  )
}

export default Errorpage