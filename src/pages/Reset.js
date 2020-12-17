import React, { Component } from 'react'
import Auth from '../components/Auth/Auth'

export default class Reset extends Component {
    render() {
        return (
            <>
                <main id="main-content">
                    <Auth objective={'reset'} />
                </main>
            </>
        )
    }
}
