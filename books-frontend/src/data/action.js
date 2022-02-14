import Cookies from "js-cookie";
import * as Payload from "../assets/constant";
import axios from "axios";

export const FetchUser = (data) => {
  return async (dispatch) => {
    dispatch({
      type: Payload.FETCH_USER,
      payload: data,
    });
  };
};

export const SingupUser = (data) => {
  return async (dispatch) => {
    const responce = await axios.post("http://localhost:3000/users", data);
    Cookies.set("token", responce.data.token, {
      expires: new Date(Date.now() + responce.expire * 24 * 60 * 60 * 1000),
    });
    dispatch({
      type: Payload.SINGUP_USER,
      payload: data,
    });
  };
};

export const LoginUser = (data) => {
  return async (dispatch) => {
    const responce = await axios.post(
      "http://localhost:3000/users/login",
      data
    );
    Cookies.set("token", responce.data.token, {
      expires: new Date(Date.now() + responce.expire * 24 * 60 * 60 * 1000),
    });
    dispatch({
      type: Payload.LOGIN_USER,
      payload: data,
    });
  };
};

export const LogOutUser = () => {
  return (dispatch) => {
    Cookies.remove("token");
    dispatch({
      type: Payload.LOGOUT_USER,
    });
  };
};

export const CreateBook = (data) => {
  return async (dispatch) => {
    const token = Cookies.get("token");
    const responce = await axios.post(
      "http://localhost:3000/books",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        },
      }
    );
    if(responce.status!==200){
      dispatch({
        type: Payload.CREATE_BOOK,
        payload: responce.data,
      });
    }else{
      alert('You can not add dublicate book')
      // console.assert('you can not add dublicate book')
    }
  };
};

export const DeleteBook = (id) => {
  return async (dispatch) => {
    const token = Cookies.get("token");
    await axios.delete(`http://localhost:3000/books/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: Payload.DELETE_BOOK,
      payload: {
        id: id,
      },
    });
  };
};

export const EditBook = (id, data) => {
  return async (dispatch) => {
    const token = Cookies.get("token");
    await axios.patch(
      `http://localhost:3000/books/${id}`,
      {
        ...data,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({
      type: Payload.EDIT_BOOK,
      payload: {
        id: id,
        data: data,
      },
    });
  };
};

export const FetchBook = () => {
  return async (dispatch) => {
    const token = Cookies.get("token");
    const responce = await axios.get(`http://localhost:3000/books`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(responce.data);
    dispatch({
      type: Payload.FETCH_BOOK,
      payload: responce.data,
    });
  };
};

export const FetchAllBook = () => {
  return async (dispatch) => {
    const responce = await axios.get(`http://localhost:3000/allbooks`);
    dispatch({
      type: Payload.FETCH_BOOK,
      payload: responce.data,
    });
  };
};

