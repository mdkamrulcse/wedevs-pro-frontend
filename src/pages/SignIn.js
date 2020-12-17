import React, {Component} from 'react'
import Auth from '../components/Auth/Auth'

export default class SignIn extends Component {
    render() {
        return (
            <>
                <main id="main-content">
                    <Auth objective={'signin'}/>
                </main>
            </>
        )
    }
}
