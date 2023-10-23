import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import "./index.css";

import App from "./routes/App";
// import ItemCategory from "./routes/item-category";
// import Contact, { loader as rootLoader } from "./routes/root";
// import { Login, Dashboard, CartRoutes, Checkout } from "./routes/routing";

const ItemCategory = lazy(() => import("./routes/ItemCategory"));
const Login = lazy(() => import("./routes/login"));
const Dashboard = lazy(() => import("./routes/Dashboard"));
const CartRoutes = lazy(() => import("./routes/CartRoutes"));
const Checkout = lazy(() => import("./routes/Checkout"));
const ItemDetail = lazy(() => import("./routes/ItemDetail"));
const GeneralItem = lazy(() => import("./routes/GeneralItem"))

const Root = () => {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<CartRoutes />} />
        <Route path="/checkout" element={<Checkout />} />

        <Route path="/product/:categoryItem" element={<ItemCategory />} />
        <Route path="/product/:categoryItem/:generalItem" element={<GeneralItem />} />
        
        <Route path="/:detailProduct" element={<ItemDetail />} />
      </Routes>
    </Suspense>
  );
};

export default Root;
