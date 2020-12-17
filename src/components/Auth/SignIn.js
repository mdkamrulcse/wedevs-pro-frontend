import React, {Component} from 'react'
import {Form, Button} from 'react-bootstrap'
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai'
import './Auth.scss'
import axios from "axios";
import {makeInputErrors, toastNotify} from "../../helpers/AppHelper";
import {toast} from "react-toastify";
import auth from "../../libraries/AuthLibrary";
import {connect} from "react-redux";
import { trackPromise } from 'react-promise-tracker';
import {LoadingSpinerComponent} from '../Loader/LoadingSpinerComponent'

class SignIn extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            credentials: {
                email: '',
                password: ''
            },
            errors: {
                email: '',
                password: ''
            },
            passwordShow: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.hideErrorMessages = this.hideErrorMessages.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let credentials = this.state.credentials;
        credentials[event.target.name] = event.target.value;

        this.setState({credentials});
        this.hideErrorMessages(event);
    }

    hideErrorMessages(event) {
        let errors = this.state.errors;
        errors[event.target.name] = '';

        this.setState({errors});
    }

    async handleSubmit(event) {
        event.preventDefault();
        await trackPromise(
        axios
            .post("/api/auth/login", {...this.state.credentials}, {
                cancelToken: this.axiosCancelSource.token,
            })
            .then(async (response) => {
                if (response.data) {
                    if (this._isMounted) {
                        toastNotify(toast, 'success', "Logging Successful.");
                        let {access_token, token_type, expired_at} = response.data;
                        await auth.setTokenToCookie(access_token, token_type, expired_at);
                        auth.login();
                    }
                }
            })
            .catch(error => {
                if (axios.isCancel(error)) {
                    console.log(error.message);
                } else {
                    toastNotify(toast, 'error', error);
                    makeInputErrors(error, (errors) =>
                        this.setState({errors})
                    );
                }
            })
        );
    }

    componentDidMount() {
        this._isMounted = true;
        this.axiosCancelSource = axios.CancelToken.source();
        document.title = 'Sign in';
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.axiosCancelSource.cancel('Cancel request.');
    }

    render() {
        return (
            <>
                <Form className={'auth-form'} method={'post'} onSubmit={(event) => this.handleSubmit(event)}>
                    <h3 className={'mb-5 text-center'}>Sign In</h3>
                    <Form.Group>
                        <Form.Control
                            className={'ks-form-control'}
                            type="email"
                            name={'email'}
                            placeholder="Email Address"
                            onChange={(event) => this.handleChange(event)}
                        />
                        <label
                            className={"error text-danger" + ((!this.state.errors.email) ? ' d-none' : '')}>
                            {this.state.errors.email}
                        </label>
                    </Form.Group>
                    <Form.Group className={'passwordControl'}>
                        <Form.Control
                            className={'ks-form-control'}
                            type={this.state.passwordShow ? 'text' : 'password'}
                            name={'password'}
                            placeholder="Password"
                            onChange={(event) => this.handleChange(event)}
                        />
                        <label
                            className={"error text-danger" + ((!this.state.errors.password) ? ' d-none' : '')}>
                            {this.state.errors.password}
                        </label>

                        <Button className={'btn bg-white btn-light text-dark btn-passwordShow'} type="button"
                                onClick={() => {
                                    this.setState({passwordShow: !this.state.passwordShow})
                                }}>
                            {this.state.passwordShow ? <AiOutlineEye size={'1.35rem'}/> :
                                <AiOutlineEyeInvisible size={'1.35rem'}/>}
                        </Button>
                    </Form.Group>
                    <Form.Group>
                        <Button className={'btn-custom px-4 mt-4 d-block w-100'} variant="primary" type="submit">
                            Sign In
                            <LoadingSpinerComponent/>
                        </Button>

                    </Form.Group>
                </Form>
            </>
        )
    }
}


/**
 *
 * @param state
 * @returns {{cart: (*|Array)}}
 */
const mapStateToProps = state => ({
    user: state.userReducer.user,
});

/**
 *
 * @param dispatch
 * @returns {{REMOVE_CART_ITEM: (function(*): *)}}
 */
const mapDispatchToProps = dispatch => ({
    ADD_USER: data => dispatch({
        type: 'ADD_USER',
        payload: data
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
