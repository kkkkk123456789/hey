import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserProfile = () => {
  const history = useHistory();
  const [name, setname] = useState('')
  const [fname, setfname] = useState('')
  const [lname, setlname] = useState('')
  const [email, setemail] = useState('')
  const [address, setaddress] = useState('')
  const [phone, setphone] = useState('')
  const [pincode, setpincode] = useState('')
  const [cupassword, cusetpassword] = useState('')
  const [password, setpassword] = useState('')
  const [cpassword, csetpassword] = useState('')
  const [tokenval, settokenval] = useState(true)
  useEffect(() => {
    let token = localStorage.getItem("logintoken")
    if (!token) {
      history.push(`http://localhost:3006`)
    }
    else {
      const fun = async () => {
        try {
          let responce = await fetch(`${process.env.REACT_APP_LOCALHOST_KEY}/api/auth/getuser`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
               token:token
            }),
          })
          let res = await responce.json();
          if (res.success) {
            settokenval(false)
            setname(res.user.fname + " " + res.user.lname || "")
            setfname(res.user.fname || "")
            setlname(res.user.lname || "")
            setaddress(res.user.address||"")
            setphone(res.user.mobileno || "")
            setpincode(res.user.pincode || "")
            setemail(res.user.email || "")
          }
          else {
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
        catch (error) {
          console.log(error, "some error accured");
        }
      }
      fun();
    }
  }, [history])

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === 'fname') {
      setfname(value)
    }
    else if (name === 'lname') {
      setlname(value)
    }
    else if (name === 'address') {
      setaddress(value)
    } else if (name === 'phone') {
      setphone(value)
    } else if (name === 'pincode') {
      setpincode(value)
    }
    else if (name === 'currpassword') {
      cusetpassword(value)
    }
    else if (name === 'newpassword') {
      setpassword(value)
    }
    else if (name === 'cnewpassword') {
      csetpassword(value)
    }
  }

  const handleClick = async () => {
    let token = localStorage.getItem("logintoken")
    const data = { token, fname,lname, address, phone, pincode };
    let response = await fetch(`${process.env.REACT_APP_LOCALHOST_KEY}/api/auth/updateprofile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    let res = await response.json();
    if (res.success) {
      toast.success('Your details updated', {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else{
      toast.error(res.message, {
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

  const handleClickpass = async () => {
    let token = localStorage.getItem("logintoken")
    if (password.length > 4) {
      const data = {token, email, cupassword, password, cpassword }
      let response = await fetch(`${process.env.REACT_APP_LOCALHOST_KEY}/api/auth/updatepass`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      let res = await response.json();
      if (res.success) {
        toast.success('Password will be updated', {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        cusetpassword("")
        setpassword("")
        csetpassword("")
      }
      else {
        toast.error(res.message, {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
    else{
      toast.error("Enter a minimum 5 character" , {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }
  return (
    <div className='min-h-screen'>
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
      <h1 className="mt-5 text-3xl text-center">Update your Account</h1>
      <div className='container mx-auto'>
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
        <div className='mx-3 mt-4 mb-3 md:mx-10'>
          <h2 className='mb-3 text-2xl font-medium'>1. Default Delivery Details</h2>
          <div className='flex mx-auto'>
            <div className='flex-col w-1/2 px-2'>
              <label htmlFor="name" className='text-lg leading-7 text-gray-600'>Name</label>
              <input readOnly value={name} type="text" id="name" name="name" placeholder='Enter your name' className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200" />
            </div>
            <div className='flex-col w-1/2 px-2'>
              <label htmlFor="email" className='text-lg leading-7 text-gray-600'>Email</label>
              <input readOnly value={email} type="email" id="email" name="email" placeholder='Enter your email' className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200" />
            </div>
          </div>
          <div className='flex mx-auto mt-4'>
            <div className='flex-col w-1/2 px-2'>
              <label htmlFor="fname" className='text-lg leading-7 text-gray-600'>First name</label>
              <input value={fname} onChange={handleChange} type="text" id="fname" name="fname" placeholder='Enter your first name' className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200" />
            </div>
            <div className='flex-col w-1/2 px-2'>
              <label htmlFor="lname" className='text-lg leading-7 text-gray-600'>Last name</label>
              <input value={lname} onChange={handleChange} type="text" id="lname" name="lname" placeholder='Enter your last name' className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200" />
            </div>
          </div>
          <div className="w-full px-2 mt-5">
            <div className="relative">
              <label htmlFor="address" className="text-lg leading-7 text-gray-600">Address</label>
              <textarea value={address} onChange={handleChange} id="address" name="address" placeholder='Enter your Address' className="w-full h-32 px-3 py-1 text-base leading-6 text-gray-700 transition-colors duration-200 ease-in-out bg-white bg-opacity-50 border border-gray-300 rounded outline-none resize-none focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200"></textarea>
            </div>
          </div>
          <div className='flex mx-auto mt-5'>
            <div className='flex-col w-1/2 px-2'>
              <label htmlFor="phone" className='text-lg leading-7 text-gray-600'>Phone Number</label>
              <input value={phone} onChange={handleChange} type="phone" id="phone" name="phone" placeholder='Your 10 digit phone number' className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200" />
            </div>
            <div className='flex-col w-1/2 px-2'>
              <label htmlFor="pincode" className='text-lg leading-7 text-gray-600'>Pincode</label>
              <input maxLength={6} onChange={handleChange} value={pincode} type="pincode" id="pincode" name="pincode" placeholder='Enter your pincode' className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200" />
            </div>
          </div>
        </div>
        <div className='mx-5 my-5 md:ml-12'>
          <button onClick={handleClick} className="flex items-center px-4 py-2 text-lg text-white bg-pink-500 border-0 rounded focus:outline-none hover:bg-pink-600 disabled:bg-pink-300" disabled={tokenval}>Submit</button>
        </div>
        <div className='mx-3 md:mx-10 mt-14'>
          <h2 className='mb-3 text-2xl font-medium'>2. Update password</h2>
          <div className='mx-auto md:flex'>
            <div className='flex-col w-full px-2 md:w-1/3'>
              <label htmlFor="oldpassword" className='text-lg leading-7 text-gray-600'>Current Password</label>
              <input value={cupassword} onChange={handleChange} type="password" id="currpassword" name="currpassword" placeholder='Enter your password' className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200" />
            </div>
            <div className='flex-col w-full px-2 md:w-1/3'>
              <label htmlFor="newpassword" className='text-lg leading-7 text-gray-600'>New Password</label>
              <input value={password} onChange={handleChange} type="password" id="newpassword" name="newpassword" placeholder='Enter your New password' className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200" />
            </div>
            <div className='flex-col w-full px-2 md:w-1/3'>
              <label htmlFor="cnewpassword" className='text-lg leading-7 text-gray-600'>Conform New Password</label>
              <input value={cpassword} onChange={handleChange} type="password" id="cnewpassword" name="cnewpassword" placeholder='Enter your conform newpassword' className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200" />
            </div>
          </div>
        </div>
        <div className='mx-5 my-5 md:ml-12'>
          <button onClick={handleClickpass} className="flex items-center px-4 py-2 text-lg text-white bg-pink-500 border-0 rounded focus:outline-none hover:bg-pink-600 disabled:bg-pink-300" disabled={tokenval}>Update</button>
        </div>
      </div>
    </div>
  )
}

export default UserProfile