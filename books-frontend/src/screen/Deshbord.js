import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  CardActionArea,
  CardMedia,
  List,
  ListItem,
  Divider,
  ListItemText,
  Avatar,
  Box,
  IconButton,
  Button,
  AppBar,
  Toolbar,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
} from "@material-ui/core";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import {
  CreateBook,
  FetchBook,
  LogOutUser,
  FetchUser,
  DeleteBook,
  EditBook,
} from "../data/action";

const useStyles = makeStyles((them) => {
  return {
    root: {},
    button: {
      width: 100,
      marginRight: 10,
    },
  };
});

function Deshbord(props) {
  const classes = useStyles();
  const navigaet = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  const [bookName, setBookname] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState();
  const [isbn, setISBN] = useState(0);
  const [edit, setEdit] = useState(false);
  const [id, setID] = useState();
  const [file, setFile] = useState();

  useEffect(() => {
    const userRequest = async () => {
      const token = Cookies.get("token");
      console.log(token);
      if (!token) {
        navigaet("../login", { replace: true });
        return;
      }
      const responce = await axios.get(`http://localhost:3000/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      props.fetchUser(responce.data);
      props.fetchBook();
    };
    userRequest();
  },[]);

  return (
    <>
      <Dialog
        open={openDialog}
        maxWidth="md"
        fullWidth={true}
        onClose={() => {
          setOpenDialog(false);
          setEdit(false);
        }}
      >
        <DialogContent>
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            variant="outlined"
            color="primary"
            onChange={(event) => setBookname(event.target.value)}
            value={bookName}
          />
          <TextField
            fullWidth
            label="Author"
            margin="normal"
            variant="outlined"
            color="primary"
            onChange={(event) => setAuthor(event.target.value)}
            value={author}
          />
          <TextField
            fullWidth
            label="Year Of Publishing"
            type="date"
            margin="normal"
            variant="outlined"
            color="primary"
            value={year}
            onChange={(event) => setYear(event.target.value)}
          />
          <TextField
            fullWidth
            label="ISBN"
            type="number"
            margin="normal"
            variant="outlined"
            color="primary"
            onChange={(event) => setISBN(event.target.value)}
            value={isbn}
          />
          {!edit ? (
            <input
              type="file"
              onChange={(event) => setFile(event.target.files[0])}
            />
          ) : null}
        </DialogContent>
        <DialogActions>
          <Box style={{ maxWidth: 400, padding: 20 }}>
            {!edit ? (
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  const formData = new FormData();
                  formData.append("author", author);
                  formData.append("bookName", bookName);
                  formData.append("isbn", isbn);
                  formData.append("year", year);
                  formData.append("image", file);
                  props.SaveBook(formData);
                  setOpenDialog(false);
                }}
              >
                Save
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  const code = parseInt(isbn);
                  props.edit(id, { author, bookName, isbn: code, year });
                  setOpenDialog(false);
                  setEdit(false);
                }}
              >
                Edit
              </Button>
            )}
          </Box>
        </DialogActions>
      </Dialog>
      <Container className={classes.root}>
        <AppBar>
          <Toolbar>
            <Box style={{ flex: 1 }}>
              <IconButton>
                <Avatar>
                  {props.content.user.email !== null
                    ? props.content.user.email.charAt(0)
                    : null}
                </Avatar>
              </IconButton>
            </Box>
            <Box mr={2}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setOpenDialog(true)}
              >
                Add Book
              </Button>
            </Box>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                props.logout();
                navigaet("../login", { replace: true });
              }}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <Typography variant="h2">Books List</Typography>
        <Box mt={4}>
          <Grid
            container
            alignItems="center"
            spacing={6}
          >
            {props.content.book.length !== 0
              ? props.content.book.map((item) => {
                  return (
                    <Grid md={2} lg={2} xl={4} sm={6} xs={12} item>
                      <Card variant="outlined">
                        <CardActionArea>
                          <CardMedia
                            src={`http://localhost:3000/books/img/${item._id}`}
                            component="img"
                            style={{ objectFit: "fill" }}
                            height={200}
                          />
                          <CardContent style={{padding:0}}>
                            <List disablePadding>
                              <ListItem button style={{paddingTop:0,paddingBottom:0}}>
                                <ListItemText
                                  primary="Book Name"
                                  secondary={item.bookName}
                                />
                              </ListItem>
                              <Divider />
                              <ListItem button style={{paddingTop:0,paddingBottom:0}}>
                                <ListItemText
                                  primary="Author"
                                  secondary={item.author}
                                />
                              </ListItem>
                              <Divider />
                              <ListItem button style={{paddingTop:0,paddingBottom:0}}>
                                <ListItemText
                                  primary="Year"
                                  secondary={item.year}
                                />
                              </ListItem>
                              <Divider />
                              <ListItem button style={{paddingTop:0,paddingBottom:0}}>
                                <ListItemText
                                  primary="ISBN Code"
                                  secondary={item.isbn}
                                />
                              </ListItem>
                              <Divider />
                            </List>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <Button
                            variant="outlined"
                            color="primary"
                            fullWidth
                            onClick={() => {
                              setAuthor(item.author);
                              setBookname(item.bookName);
                              setYear(item.year);
                              setISBN(item.isbn);
                              setID(item._id);
                              setEdit(true);
                              setOpenDialog(true);
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outlined"
                            color="secondary"
                            fullWidth
                            onClick={() =>{
                              if(window.confirm('Are you sure to delete book')===true){
                                props.delete(item._id)
                              }else{

                              }
                            }}
                          >
                            Delete
                          </Button>
                        </CardActions>
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
    SaveBook: (data) => dispatch(CreateBook(data)),
    fetchBook: () => dispatch(FetchBook()),
    logout: () => dispatch(LogOutUser()),
    fetchUser: (data) => dispatch(FetchUser(data)),
    delete: (id) => dispatch(DeleteBook(id)),
    edit: (id, data) => dispatch(EditBook(id, data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Deshbord);