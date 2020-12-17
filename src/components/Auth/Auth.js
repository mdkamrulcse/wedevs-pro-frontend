import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './Auth.scss'
import SignIn from '../Auth/SignIn'
import SignUp from '../Auth/SignUp'
import Forgot from '../Auth/Forgot'
import Reset from '../Auth/Reset'


export default class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    renderSwitch(param) {
        switch (param) {
            case 'signin':
                return <SignIn/>;
            case 'signup':
                return <SignUp/>;
            case 'forgot':
                return <Forgot/>;
            case 'reset':
                return <Reset/>;
            default:
                return <SignIn/>
        }
    }

    render() {
        return (
            <>
                <div id={'auth'}>
                    <div className={'leftPanel'} style={{backgroundImage: 'url(/assets/img/auth-left-area.png)'}}>
                        <div className={'leftPanel-content'}>
                            <Link to={'/'}><img src={'/assets/img/wedevs-logo.png'} alt={''} className={'img-fluid'}/></Link>
                        </div>
                        <p className={'copyRight'}> &#169; 2020 Wedevs</p>
                    </div>
                    <div className={'rightPanel'} style={{backgroundImage: 'url(/assets/img/logo-mask.png)'}}>
                        {this.props.objective ? this.renderSwitch(this.props.objective): ''}
                    </div>
                </div>
            </>
        )
    }
}
