import React, { Component } from 'react'
import Auth from '../components/Auth/Auth'


export default class SignUp extends Component {
    render() {
        return (
            <>
                 <main id="main-content">
                    <Auth objective={'signup'} />
                </main>
            </>
        )
    }
}
