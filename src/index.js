import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <App
    width={400}
    height={250}
    innerRadius={0}
    outerRadius={100}
    cornerRadius={0}
    maxSectors={5}
  />,
  rootElement
);
