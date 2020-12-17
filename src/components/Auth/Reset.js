import React, {Component} from 'react';
import {Form, Button} from 'react-bootstrap';
import {withRouter, Redirect} from 'react-router-dom';
import './Auth.scss';
import axios from "axios";
import {makeInputErrors, toastNotify} from "../../helpers/AppHelper";
import {toast} from "react-toastify";
import _ from "lodash";

class Reset extends Component {
    _isMounted = false;

    constructor(props) {
        super(props)

        this.state = {
            user: {
                token: '',
                email: '',
                password: '',
                confirm_password: '',
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
            .post("/api/password/reset", {...this.state.user}, {
                cancelToken: this.axiosCancelSource.token,
            })
            .then(response => {
                if (response.data) {
                    if (this._isMounted) {
                        toastNotify(toast, 'success', "Reset is successful. Redirecting...");
                        setTimeout(() => {
                            this.props.history.push('/sign-in');
                        }, 2000);
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
        document.title = "Reset Password";
    }

    componentWillMount() {
        let search = this.props.location.search;
        let params = new URLSearchParams(search);

        if (params.get('email') && params.get('token')) {
            this.setState({
                user: {
                    ...this.state.user,
                    email: params.get('email'),
                    token: params.get('token'),
                }
            });
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.axiosCancelSource.cancel('Cancel request.');
    }

    render() {
        if (_.isEmpty(this.state.user.email)
            && _.isEmpty(this.state.user.token)) {
            return <Redirect to={"/sign-in"}/>;
        }

        return (
            <>
                <Form className={'auth-form'} method={'POST'} onSubmit={(event) => this.handleSubmit(event)}>
                    <h3 className={'mb-5 text-center'}>Reset Password</h3>
                    <Form.Group>
                        <Form.Control className={'ks-form-control'} type="password" name="password"
                                      value={this.state.user.password}
                                      onChange={(event) => this.handleChange(event)}
                                      placeholder="Password"
                        />
                        <label
                            className={"error text-danger" + ((!this.state.errors.password) ? ' d-none' : '')}>
                            {this.state.errors.password}
                        </label>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control className={'ks-form-control'} type="password" name="confirm_password"
                                      value={this.state.user.confirm_password}
                                      onChange={(event) => this.handleChange(event)}
                                      placeholder="Confirm Password"
                        />
                        <label
                            className={"error text-danger" + ((!this.state.errors.confirm_password) ? ' d-none' : '')}>
                            {this.state.errors.confirm_password}
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

export default withRouter(Reset);