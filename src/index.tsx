import React from "react";
import { BrowserRouter } from 'react-router-dom';
import App from "./App";
import {createRoot} from "react-dom/client";


const root= createRoot(document.getElementById('root'));

if (!root) {
    throw new Error('root not found')
}

root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>

);


