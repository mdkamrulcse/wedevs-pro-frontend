import React, {Component} from 'react'
import {Form, Button} from 'react-bootstrap'
import './Auth.scss'
import axios from "axios";
import {makeInputErrors, toastNotify} from "../../helpers/AppHelper";
import {toast} from "react-toastify";

export default class Forgot extends Component {
    _isMounted = false;

    constructor(props) {
        super(props)

        this.state = {
            user: {
                email: ''
            },
            errors: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.hideErrorMessages = this.hideErrorMessages.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let user = this.state.user;
        user[event.target.name] = event.target.value;

        this.setState({user});
        this.hideErrorMessages(event);
    }

    hideErrorMessages(event) {
        let errors = this.state.errors;
        errors[event.target.name] = '';

        this.setState({errors});
    }

    handleSubmit(event) {
        event.preventDefault();

        axios
            .post("/api/password/forgot", {...this.state.user}, {
                cancelToken: this.axiosCancelSource.token,
            })
            .then(response => {
                if (response.data) {
                    if (this._isMounted) {
                        toastNotify(toast, 'success', "Please check your email.");
                    }
                }
            })
            .catch(error => {
                if (axios.isCancel(error)) {
                    console.log(error.message);
                } else {
                    toastNotify(toast, 'warning', error);
                    makeInputErrors(error, (errors) => {
                        this.setState({errors});
                    });
                }
            });
    }

    componentDidMount() {
        this._isMounted = true;
        this.axiosCancelSource = axios.CancelToken.source();
        document.title = "Forgot Password";
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.axiosCancelSource.cancel('Cancel request.');
    }

    render() {
        return (
            <>
                <Form className={'auth-form'} method={'POST'} onSubmit={(event) => this.handleSubmit(event)}>
                    <h3 className={'mb-5 text-center'}>Forgot Password?</h3>
                    <Form.Group>
                        <Form.Control className={'ks-form-control'} type="email" name="email"
                                      value={this.state.user.email}
                                      onChange={(event) => this.handleChange(event)}
                                      placeholder="Email Address"
                        />
                        <label
                            className={"error text-danger" + ((!this.state.errors.email) ? ' d-none' : '')}>
                            {this.state.errors.email}
                        </label>
                    </Form.Group>
                    <Form.Group>
                        <Button className={'btn-custom px-4 mt-4 d-block w-100'} variant="primary"
                                type="submit">Submit</Button>
                    </Form.Group>
                </Form>
            </>
        )
    }
}
