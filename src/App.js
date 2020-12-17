import React from 'react';
import './App.scss';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Routes from './routes/Routes';
import {API_URL} from './config/app.config'
import auth from './libraries/AuthLibrary'
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {Provider} from "react-redux";
import store from "./redux-store";
import {BrowserRouter} from "react-router-dom";

/**
 * Axios Global Config
 *
 * @type {string}
 */
axios.defaults.baseURL = API_URL;
axios.defaults.headers.common['Authorization'] = auth.token();

function App() {

    //While unauthenticated, redirect to sign-in
    axios.interceptors.response.use((response) => {
        return response;
    }, (error) => {
        return Promise.reject(error);
    });

    return (
        <>
            <BrowserRouter>
                <Provider store={store}>
                    <Header/>
                    <Sidebar/>
                    <Routes/>

                    <ToastContainer/>
                </Provider>
            </BrowserRouter>
        </>
    );
}

export default App;
