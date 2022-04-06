import React from "react";
// react 17
// import ReactDOM from "react-dom";
// react 18
import ReactDOM from "react-dom/client";

import AppHome from "./pages/Home";

import "./index-light.css";


// react 17
// ReactDOM.render(
//     <React.StrictMode>
//         <AppHome />
//     </React.StrictMode>,
//     document.getElementById("root")
// );


// react 18
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppHome />);