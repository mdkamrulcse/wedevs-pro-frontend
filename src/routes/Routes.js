import React, {Component} from 'react'
import {Switch, Route} from "react-router-dom";

// pages
import Dashboard from '../pages/Dashboard';
import Error404 from '../pages/Error404';

import SignIn from '../pages/SignIn';

import ProtectedRoute from './ProtectedRoute';

import AllProducts from "../components/Product/AllProducts";
import AddProduct from "../components/Product/AddProduct";
import EditProduct from "../components/Product/EditProduct";


export default class Routes extends Component {
    render() {
        return (
            <>
                <Switch>
                    <ProtectedRoute exact path='/' component={Dashboard}/>
                        <ProtectedRoute exact path='/products' component={AllProducts}/>
                        <ProtectedRoute exact path='/products/add' component={AddProduct}/>
                        <ProtectedRoute exact path='/products/:id/edit' component={EditProduct}/>

                    <Route exact path='/sign-in' component={SignIn}/>

                    <Route exact path="*">
                        <Error404/>
                    </Route>
                </Switch>
            </>
        )
    }
}
