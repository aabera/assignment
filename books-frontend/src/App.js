import React from "react";
import { CssBaseline } from "@material-ui/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import reducer from "./data/reducer";

import Deshbord from "./screen/Deshbord";
import LoginPage from "./screen/Login";
import SingupPage from "./screen/SingUp";
import Allbooks from "./screen/Allbooks";

const store = createStore(reducer, applyMiddleware(thunk));

function App() {
  return (
    <>
      <CssBaseline />
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="" exect element={<Allbooks/>}/>
            <Route path="signup" exect element={<SingupPage />} />
            <Route path="login" exect element={<LoginPage />} />
            <Route path="deshbord" exect element={<Deshbord />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
