import React from "react";
import ReactDOM from "react-dom";

import Home from "./pages/Home";
import MenuBar from "./pages/Home/components/menubar";

import "./index-light.css";

ReactDOM.render(
    <React.StrictMode>
        <MenuBar />
        <Home />
    </React.StrictMode>,
    document.getElementById("root")
);
