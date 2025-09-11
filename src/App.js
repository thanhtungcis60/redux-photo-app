import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Route, Switch, Redirect, Link } from "react-router-dom";
import "./App.scss";
import NotFound from "./components/NotFound";
import Headers from "./components/Header";
import productApi from "api/productApi";

// Lazy load - Code splitting
const Photo = React.lazy(() => import("./features/Photo"));

function App() {
  const [productList, setProductList] = useState([]);
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
  return (
    <div className="photo-app">
      <Suspense fallback={<div>Loading ...</div>}>
        <BrowserRouter>
          <Headers />
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
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
