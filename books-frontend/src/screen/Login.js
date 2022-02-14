import React, { useState } from "react";

import { Grid, Typography, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import { LoginUser } from "../data/action";

import login from "../assets/login.svg";

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

function LoginPage(props) {
  const classes = useStyle();
  const navigaet = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Grid
        container
        className={classes.root}
        justifyContent="center"
        alignItems="center"
        wrap="wrap-reverse"
      >
        <Grid md={6} xs={6}>
          <img src={login} alt="" />
        </Grid>
        <Grid md={6} xs={12}>
          <Typography variant="h2" color="primary">
            Login Here
          </Typography>
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
          <Button
            variant="contained"
            color="primary"
            onClick={async() => {
              await props.login({ email,password });
              navigaet("../deshbord");
            }}
            fullWidth
          >
            login
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
    login: (data) => dispatch(LoginUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
