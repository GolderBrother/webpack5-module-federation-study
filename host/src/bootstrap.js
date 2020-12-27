import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import("remote/title").then(result => {
    console.log(result.default);
});
ReactDOM.render(<App />, document.getElementById("root"));