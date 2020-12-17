import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class Error404 extends Component {
    render() {
        return (
            <>
                <main id="main-content">
                    <div className="error-box">
                        <div className="error-content">
                            <h1 className="error-title text-danger">Oops!</h1>
                            <h4 className="error-subttile"> <span className="text-dark">404</span> - Page not fund</h4>
                            <p className="error-desc">The page you are looking might have been removed had its name change or
                                temporarily unavailable.</p>
                            <Link to="/" className="btn btn-sm btn-primary rounded"> &#8592;  Back to home page</Link>
                        </div>
                    </div>
                </main>
            </>
        )
    }
}
