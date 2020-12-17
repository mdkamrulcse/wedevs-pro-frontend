import React, { Component } from 'react'
import Auth from '../components/Auth/Auth'

export default class Forgot extends Component {
    render() {
        return (
            <>
                <main id="main-content">
                    <Auth objective={'forgot'} />
                </main>
            </>
        )
    }
}
