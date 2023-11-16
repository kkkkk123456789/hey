import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import Link from 'react-router-dom';
import { Link,useHistory } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect,useState } from 'react';
import { CircularProgress } from '@mui/material';

const url = `${process.env.REACT_APP_LOCALHOST_KEY}/api/auth/login`

const Login = ()=> {
  const history = useHistory();
  const [isprogress,setprogress] = useState(false)
  useEffect(() => {
    if(localStorage.getItem("logintoken")){
      history.push('/', { replace: true });
    }
  }, [history])
  
  const handleSubmit = async(event) => {
    setprogress(true)
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formdata = {
        email: data.get('email'),
        password: data.get('password'),
        cpassword: data.get('cpassword'),
      }
    try {
        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formdata)
        }
        const response = await fetch(url, config)
        const json = await response.json()
        if(json.success){
          toast.success(json.message, {
            position: "top-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
          localStorage.setItem("logintoken",json.token)
          setprogress(false)
          history.push('/', { replace: true });
        }
        else{
          toast.error(json.message, {
            position: "top-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
            setprogress(false)
        }
        
    } catch (error) {
      toast.error("Some error accured !!!", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
        setprogress(false)
    }
  };

  return (
      <Container component="main" maxWidth="xs">
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
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="cpassword"
              label="Confirm Password"
              type="password"
              id="cpassword"
              autoComplete="current-cpassword"
            />
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
             {!isprogress && "Sign In"}
             {isprogress && <CircularProgress color="inherit" size={24}/>}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/forgot" >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signup" >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}
export default Login 