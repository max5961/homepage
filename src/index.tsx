import "./style/index.scss";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const container: HTMLElement = document.getElementById("root")!;
const root = createRoot(container);
root.render(<App />);

import { format } from "date-fns";
// Monday, February 5th, 2024
console.log(format(new Date(), "EEEE, MMMM do, yyyy"));
// Monday, Feb 5, 2024
console.log(format(new Date(), "EE, MMM do, yyyy"));
// 2 | 5 | 2024
console.log(format(new Date(), "M | d | yyyy"));
// 02/05/2024
console.log(format(new Date(), "MM/dd/yyyy"));
