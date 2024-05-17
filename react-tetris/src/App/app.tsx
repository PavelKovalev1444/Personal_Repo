import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Error404Page } from "../Error/pages/Error404";

import './app.scss'

export const App = () => {
    return (
        <BrowserRouter>
            <div className="container">
                <Routes>
                    <Route path="*" Component={Error404Page}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
};
