import React, { useEffect } from "react";

import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  List,
  ListItem,
  Divider,
  Button,
  AppBar,
  Toolbar,
  ListItemText,
  Box,
  Grid,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import { FetchAllBook } from "../data/action";

const useStyles = makeStyles((them) => {
  return {
    root: {},
    button: {
      width: 100,
      marginRight: 10,
    },
  };
});

function Allbooks(props) {
  const classes = useStyles();
  const navigaet = useNavigate();

  useEffect(() => {
    const userRequest = async () => {
      await props.getBooks();
    };

    userRequest();
  });

  return (
    <>
      <Container className={classes.root}>
        <AppBar>
          <Toolbar>
            <Box style={{ flex: 1 }}></Box>
            <Box mr={2}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  navigaet("../signup");
                }}
              >
                Sign Up
              </Button>
            </Box>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                navigaet("../login");
              }}
            >
              Log In
            </Button>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <Typography variant="h2">Books List</Typography>
        <Box mt={4}>
          <Grid container alignItems="center" spacing={6}>
            {props.content.book.length !== 0
              ? props.content.book.map((item) => {
                  return (
                    <Grid md={4} lg={2} xl={2} sm={4} xs={16} item>
                      <Card variant="outlined">
                        <CardActionArea>
                          <CardMedia
                            src={`http://localhost:3000/books/img/${item._id}`}
                            component="img"
                            style={{ objectFit: "fill"}}
                            height={200}
                          />
                        </CardActionArea>
                      </Card>
                    </Grid>
                  );
                })
              : null}
          </Grid>
        </Box>
      </Container>
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
    getBooks: (data) => dispatch(FetchAllBook()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Allbooks);
