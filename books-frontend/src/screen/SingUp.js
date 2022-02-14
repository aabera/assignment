import React, { useState } from "react";

import { Grid, Typography, Box,TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import { SingupUser } from "../data/action";

import login from "../assets/Singup.svg";

const useStyle = makeStyles((them) => ({
  root: {
    padding: them.spacing(6),
    minHeight: "100vh",
    width: "100%",
  },
  buttonContainer: {
    marginTop: them.spacing(2),
  },
  loginImage: {
    width: "60%",
    display: "block",
    margin: "auto",
  },
}));

function SingupPage(props) {
  const classes = useStyle();
  const navigaet = useNavigate();

  const [first_name,setFirstName] = useState("");
  const [last_name,setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Cpassword, setCPassword] = useState("");


  return (
    <>
      <Grid
        container
        className={classes.root}
        justifyContent="space-around"
        alignItems="center"
        wrap="wrap-reverse"
      >
        <Grid md={4} xs={6}>
          <img src={login} alt="" style={{display:'block',objectFit:'fill',width:'100%'}}/>
        </Grid>
        <Grid md={6} xs={12}>
          <Typography variant="h2" color="primary">
            SignUp Here
          </Typography>
          <TextField
            placeholder="Enter First Name"
            variant="outlined"
            color="primary"
            label="First Name"
            margin="normal"
            onChange={(event) => setFirstName(event.target.value)}
            value={first_name}
            fullWidth
          />
          <TextField
            placeholder="Enter Last Name"
            variant="outlined"
            color="primary"
            label="Last Name"
            margin="normal"
            onChange={(event) => setLastName(event.target.value)}
            value={last_name}
            fullWidth
          />
          <TextField
            placeholder="Enter Email"
            variant="outlined"
            color="primary"
            label="Email"
            margin="normal"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            fullWidth
          />
          <TextField
            placeholder="Enter Password"
            type="password"
            variant="outlined"
            color="primary"
            label="Password"
            margin="normal"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            fullWidth
          />
          <TextField
            placeholder="Conform Password"
            type="password"
            variant="outlined"
            color="primary"
            label="Conform Password"
            margin="normal"
            onChange={(event) => setCPassword(event.target.value)}
            value={Cpassword}
            fullWidth
          />
          <Box marginTop={2}>

          </Box>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={async() => {
              if(Cpassword===password){
                await props.singup({ last_name,first_name,email,password });
              navigaet("../deshbord");
              }
            }}
            fullWidth
          >
            Sing Up
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    content: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    singup: (data) => dispatch(SingupUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingupPage);
