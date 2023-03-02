import { Box, Grid, TextField, Typography, Button } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../Redux/features/alertSlice";

const useStyles = makeStyles((theme) => ({
  main: {
    borderRadius: "20px",
    margin: "auto",
    display: "flex",
  },
  root: {
    textAlign: "center",
    margin: "auto",
    // border: "1px solid white",
  },
  auto: {
    margin: "auto",
  },
  btn: {
    borderRadius: "100px",
    height: "50px",
    marginTop: "10px",
    backgroundColor: "blue",
    color: "white",
  },

}));

const Login = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    dispatch(showLoading())
    e.preventDefault();
    let data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    axios.post("http://localhost:4010/login", data)
      .then((resp) => {
        console.log(resp.data);
        dispatch(hideLoading())
        localStorage.setItem("jwt", resp.data.jwt);
        message.success("login successful");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        message.error("incorrect password or email!");
      });
  };
  return (
    <div style={{ marginTop: "150px" }}>
      <form onSubmit={submitHandler}>
        <Box m={5} p={10} className={classes.main}>
          <Grid container spacing={5} sm={12}>
            <Grid item xs={12} sm={12} lg={6} className={classes.auto}>
              <Box className={classes.root}>
                <Grid>
                  <Grid item xs={12}>
                    <Typography
                      style={{ color: "lightgreen", fontSize: "30px" }}
                    >
                      WELCOME TO HEALTH CARE
                    </Typography>
                  </Grid>
                  <Grid>
                    <br />
                    <br />
                  </Grid>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    id="password"
                    name="password"
                  />
                </Grid>
                <Grid item xs={12}>
                  {" "}
                  <Button
                    variant="outlined"
                    className={classes.btn}
                    fullWidth
                    type="submit"
                  >
                    Sign in
                  </Button>
                </Grid>
                <br />
                <Typography style={{ margin: "10px", fontSize: "20px" }}>
                  Don't have an account?
                  <Typography
                    style={{
                      color: "red",
                      display: "inline",
                      fontSize: "20px",
                    }}
                  >
                    Sign up now
                  </Typography>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </form>
    </div>
  );
};

export default Login;
