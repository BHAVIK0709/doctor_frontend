import { Box, Grid, TextField, Typography, Button } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    backgroundColor: "orange",
    color: "white",
  },
  social: {
    hight: "45px",
    width: "45px",
  },
  simg: {
    borderRadius: "30px",
    marginTop: "auto",
    marginLeft: "0px",

    marginBlockStart: "auto",
    height: "525px",
    width: "108%",
    textAlign: "center",
  },
}));
function Register() {
  const classes = useStyles();
  const navigate = useNavigate();
  const submitHandler = () => {
    let request = {
      name: document.getElementById("Fullname").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };
    axios
      .post("http://localhost:4010/signup", request)
      .then((resp) => {
        console.log(resp);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div style={{ marginTop: "150px" }}>
      <form>
        <Box m={5} p={10} className={classes.main}>
          <Grid container spacing={5} sm={12}>
            <Grid item xs={12} sm={12} lg={6} className={classes.auto}>
              <Box className={classes.root}>
                <Grid>
                  <Grid item xs={12}>
                    <Typography style={{ color: "orange", fontSize: "30px" }}>
                      WELCOME TO HEALTH CARE
                    </Typography>
                  </Grid>
                  <Grid>
                    <br />
                    <br />
                  </Grid>
                  <TextField
                    required
                    variant="outlined"
                    margin="normal"
                    type="text"
                    fullWidth
                    id="Fullname"
                    label="Fullname"
                    name="fullname"
                  />
                  <TextField
                    required
                    variant="outlined"
                    margin="normal"
                    type="email"
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                  />
                  <TextField
                    required
                    variant="outlined"
                    margin="normal"
                    type="password"
                    fullWidth
                    label="Password"
                    id="password"
                  />
                </Grid>
                <Grid item xs={12}>
                  {" "}
                  <Button
                    variant="outlined"
                    className={classes.btn}
                    fullWidth
                    onClick={submitHandler}
                  >
                    Sign up
                  </Button>
                </Grid>
                <br />
                <Typography style={{ margin: "10px", fontSize: "20px" }}>
                  Allready have an account?
                  <Typography
                    style={{
                      color: "orange",
                      display: "inline",
                      fontSize: "20px",
                    }}
                  >
                    Sign in now
                  </Typography>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </form>
    </div>
  );
}

export default Register;

// <>
// <Grid container >
// <Grid  item xs={12}
//   style={{ marginTop: "100px", display: "flex" }}
// >
//   <form
//     style={{ margin: "auto", display: "flex", flexDirection: "column" }}
//   >
//     <Typography>Register Yourself</Typography>
//     <br /> <label>Username</label>
//     <TextField
//     size="small"
//       style={{ width: "340px", margin: "5px" }}
//       type="text"
//       title="Username"
//       variant="outlined"
//     />
//     <br />
//     <label>email</label>
//     <TextField
//      size="small"
//       style={{ width: "340px", margin: "5px" }}
//       type="text"
//       variant="outlined"
//     />
//     <br />
//     <label>password</label>
//     <TextField
//      size="small"
//       style={{ width: "340px", margin: "5px" }}
//       type="text"
//       variant="outlined"
//     />
//     <br />
//     <Button variant="contained" color="primary">
//       Submit
//     </Button>
//   </form>
// </Grid>
// </Grid>
// </>
