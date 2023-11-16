import './App.css';
import {Redirect,Route,Switch } from 'react-router-dom';
import Login from './compotents/Login';
import Product from './compotents/Product';
import Signup from './compotents/Signup';
import Forgot from './compotents/Forgot';
import Home from './compotents/Home';
import Navbar from './compotents/Navbar';
import About from './compotents/About';
import Contact from './compotents/Contact';
import { useEffect,useState } from 'react';
import { useHistory } from 'react-router-dom';
import Mens from './compotents/Mens';
import Womens from './compotents/Womens';
import Checkout from './compotents/Checkout';
import UserProfile from './compotents/UserProfile';
import Orderdetail from './compotents/Orderdetail';
import Myorder from './compotents/Myorder';

function App() {
  const history = useHistory()
  const [loggedin, setloggedin] = useState(false)
  useEffect(() => {
    if(localStorage.getItem("logintoken")){
      setloggedin(true)
    }
  }, [history])
  return (
    <>
      <Navbar loginp={loggedin}/>
      <Switch>
        <Route exact path='/' render={() => <Home/>} />
        <Route exact path='/login' render={()=><Login/>}/>
        <Route exact path='/about' render={()=><About/>}/>
        <Route exact path='/contact' render={()=><Contact/>}/>
        <Route exact path='/userprofile' render={()=><UserProfile/>}/>
        <Route exact path='/signup' render={()=><Signup/>}/>
        <Route exact path='/forgot' render={()=><Forgot/>}/>
        <Route exact path='/mens' render={()=><Mens/>}/>
        <Route exact path='/womens' render={()=><Womens/>}/>
        <Route exact path='/checkout' render={()=><Checkout/>}/>
        <Route exact path='/myorders' render={()=><Myorder/>}/>
        <Route exact path='/orderdetails/:oid' render={()=><Orderdetail/>}/>
        <Route exact path='/product/:slug' render={()=><Product/>}/>
        <Redirect to="/" />
      </Switch>
    </>
  );
}

export default App;
