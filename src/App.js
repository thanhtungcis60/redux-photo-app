import productApi from "api/productApi";
import SignIn from "features/Auth/pages/Signin";
import { onAuthStateChanged } from "firebase/auth";
import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Link, Redirect, Route, Switch } from "react-router-dom";
import "./App.scss";
import Headers from "./components/Header";
import NotFound from "./components/NotFound";
import { auth } from "./firebaseConfig";
import { Button } from "reactstrap";
import { useDispatch } from "react-redux";
import { getMe } from "app/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";

// Lazy load - Code splitting
const Photo = React.lazy(() => import("./features/Photo"));

function App() {
  const [productList, setProductList] = useState([]);
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
  const dispatch = useDispatch();

  const handleFetchProductList = async () => {
    try {
      const params = { _page: 1, _limit: 10 };
      const response = await productApi.getAll(params);
      console.log("Fetch products successfully: ", response);
      setProductList(response.data);
    } catch (error) {
      console.log("Failed to fetch product list: ", error.message);
    }
  };
  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const params = { _page: 1, _limit: 10 };
        const response = await productApi.getAll(params);
        console.log("Fetch products successfully: ", response);
        setProductList(response.data);
      } catch (error) {
        console.log("Failed to fetch product list: ", error.message);
      }
    };
    fetchProductList();
  }, []);

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregister = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        // handle signed out
        console.log("User is signed out");
        return;
      }
      // handle signed in
      // console.log("User is signed in", user.displayName);
      // const token = await user.getIdToken();
      // console.log("User token: ", token);

      //getme when signed in
      try {
        const action = getMe();
        const actionResult = await dispatch(action);
        const currentUser = unwrapResult(actionResult);
        console.log("[App]Current user: ", currentUser);
      } catch (error) {
        console.log("Failed to fetch current user: ", error.message);
      }
    });
    return unregister; // cleanup
  }, []);
  return (
    <div className="photo-app">
      <Suspense fallback={<div>Loading ...</div>}>
        <BrowserRouter>
          <Headers />
          <Button onClick={handleFetchProductList}>Fetch product list</Button>
          {/* TODO: Remove after testing */}
          <ul>
            <li>
              <Link to="/photos">Go to photo page</Link>
            </li>
            <li>
              <Link to="/photos/add">Go to Add new photo page</Link>
            </li>
            <li>
              <Link to="/photos/123">Go to Edit photo page</Link>
            </li>
          </ul>

          <Switch>
            <Redirect exact from="/" to="/photos" />

            <Route path="/photos" component={Photo} />
            <Route path="/sign-in" component={SignIn} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
