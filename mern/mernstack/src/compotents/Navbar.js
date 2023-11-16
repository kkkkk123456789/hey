import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector,useDispatch } from "react-redux";
import { FaPlusCircle, FaMinusCircle, FaShoppingCart } from 'react-icons/fa';
import { GrClose } from 'react-icons/gr';
import { removeFromcart,incrementCartItem, decrementCartItem } from "../redux/actions/productAction";


const pages = [
  ["Home", ""],
  ["About", "about"],
  ["Mens", "mens"],
  ["Womens", "womens"],
  ["Contact", "contact"],
];
const settings = [["Profile","userprofile"], ["My Orders","myorders"], ["Dashboard",""]];

function Navbar({ loginp }) {
  const cart = useSelector((state) => state.cart.cartitem);
  const dispatch = useDispatch()
  let location = useLocation();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [subtotal, setsubtotal] = useState(0);
  const [loggedin, setloggedin] = useState(loginp);
  const countprice = () => {
    let myCart = JSON.parse(localStorage.getItem("rcart")) || {};
    let subt = 0;
    let keys = Object.keys(myCart);
    for (let i = 0; i < keys.length; i++) {
      subt += myCart[keys[i]].price * myCart[keys[i]].qty;
    }
    setsubtotal(subt);
  };
  useEffect(() => {
    if (localStorage.getItem("logintoken")) setloggedin(true);
    countprice();
  }, [location, cart]);

  const handleOpenNavMenu = (e) => {
    setAnchorElNav(e.currentTarget);
  };
  const handleOpenUserMenu = (e) => {
    setAnchorElUser(e.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const LogoutFun = () => {
    localStorage.removeItem("logintoken");
    setloggedin(false);
    toast.success("Successfully logged out !", {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    handleCloseUserMenu();
  };
  const togglecart = () => {
    if (document.getElementById("carti").classList.contains("-right-full")) {
      document.getElementById("carti").classList.remove("-right-full");
      document.getElementById("carti").classList.add("right-0");
    } else {
      document.getElementById("carti").classList.remove("right-0");
      document.getElementById("carti").classList.add("-right-full");
    }
  };
  const clearCart = ()=>{
    dispatch(removeFromcart())
    toast.success("Cart cleared successfully", {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }
  return (
    <>
      <AppBar position="sticky" style={{ backgroundColor: "#212121" }}>
        <Container maxWidth="xl">
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
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <Link to={"/"}>LOGO</Link>
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page, ind) => (
                  <MenuItem key={ind} onClick={handleCloseNavMenu}>
                    <Link to={`/${page[1].toLowerCase()}`}>
                      <Typography textAlign="center">{page[0]}</Typography>
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page, ind) => (
                <Link key={ind} to={`/${page[1].toLowerCase()}`}>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page[0]}
                  </Button>
                </Link>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              {loggedin && (
                <div style={{ justifyContent: "center" }}>
                  <Badge
                    color="secondary"
                    style={{ marginRight: 10 }}
                    badgeContent={Object.keys(cart).length}
                    showZero
                  >
                    <ShoppingCartIcon
                      onClick={togglecart}
                      style={{ fontSize: 35, cursor: "pointer" }}
                    />
                  </Badge>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/2.jpg"
                      />
                    </IconButton>
                  </Tooltip>
                </div>
              )}
              {!loggedin && (
                <div>
                  <Badge
                    color="secondary"
                    style={{ marginRight: 10 }}
                    badgeContent={Object.keys(cart).length}
                    showZero
                  >
                    <ShoppingCartIcon
                      onClick={togglecart}
                      style={{ fontSize: 35, cursor: "pointer" }}
                    />
                  </Badge>
                  <Button variant="outlined">
                    <Link to={"/login"}>Login</Link>
                  </Button>
                </div>
              )}
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting, ind) => (
                  <MenuItem key={ind} onClick={handleCloseUserMenu}>
                    <Link to={`/${setting[1].toLowerCase()}`}>
                    <Typography textAlign="center">{setting[0]}</Typography>
                    </Link>
                  </MenuItem>
                ))}
                 
                <MenuItem key={"logout"} onClick={LogoutFun}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <div
        id="carti"
        className="fixed z-50 order-first w-full min-h-screen pb-10 overflow-y-scroll transition-all ease-in-out bg-white shadow-2xl opacity-100 md:w-1/3 -right-full"
      >
          <div>
              <div className="">
                <div className="items-center h-20 py-6 border-b border-gray-400">
                  <div>
                    <h1 className="ml-4 text-xl font-bold">Shopping cart</h1>
                  </div>
                  <div
                    className="absolute text-2xl font-bold cursor-pointer right-7 top-7"
                    onClick={togglecart}
                  >
                    <GrClose />
                  </div>
                </div>
                <div className="ml-12 cartitems mt-9">
                  {Object.keys(cart).length !== 0 && (
                    <ol className="font-medium list-decimal">
                      {Object.keys(cart).map((k) => {
                        return (
                          <li key={k} className="py-2">
                            <div className="flex item">
                              <div className="w-3/4 text-lg font-semibold">{`${cart[k].itemname}(${cart[k].size}/${cart[k].variant})`}</div>
                              <div className="flex items-center justify-center w-1/4">
                                <div
                                  onClick={() => { dispatch(decrementCartItem(k)) }}
                                  className="px-2 cursor-pointer"
                                >
                                  <FaMinusCircle className="text-xl text-pink-500" />
                                </div>
                                <div>{cart[k].qty}</div>
                                <div
                                  onClick={() => {dispatch(incrementCartItem(k,cart[k].price,cart[k].itemname,cart[k].size,cart[k].variant))}}
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
                <div className="flex mb-16 ml-10">
                  <Link to={"/checkout"}>
                    <button
                      onClick={togglecart}
                      className="flex items-center px-4 py-2 mt-6 text-lg text-white bg-pink-500 border-0 rounded focus:outline-none hover:bg-pink-600 disabled:bg-pink-400"
                      disabled={Object.keys(cart).length === 0}
                    >
                      <FaShoppingCart className="text-xl" />
                      <span className="pl-2"> Checkout</span>
                    </button>
                  </Link>
                  <button
                    onClick={clearCart}
                    className="px-4 py-2 mt-6 ml-3 text-lg text-white bg-pink-500 border-0 rounded focus:outline-none hover:bg-pink-600 disabled:bg-pink-400"
                    disabled={Object.keys(cart).length === 0}
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>
       
      </div>
    </>
  );
}
export default Navbar;
