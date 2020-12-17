import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import './Auth.scss'


export default class SignUp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            passwordShow: false
        }
    }

    render() {
        return (
            <>
                <Form className={'auth-form'}>
                    <h3 className={'mb-5 text-center'}>Sign Up</h3>
                    <Form.Group>
                        <Form.Control className={'ks-form-control'} type="text" placeholder="Name" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control className={'ks-form-control'} type="text" placeholder="Phone Number" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control className={'ks-form-control'} type="email" placeholder="Email Address" />
                    </Form.Group>
                    <Form.Group className={'passwordControl'}>
                        <Form.Control className={'ks-form-control'} type={this.state.passwordShow ? 'text' : 'password'} placeholder="Password" />
                        <Button className={'btn bg-white btn-light text-dark btn-passwordShow'} type="button" onClick={() => { this.setState({ passwordShow: !this.state.passwordShow }) }} >
                            {this.state.passwordShow ? <AiOutlineEye size={'1.35rem'} /> : <AiOutlineEyeInvisible size={'1.35rem'} />}
                        </Button>
                    </Form.Group>
                    <Form.Group>
                        <Button className={'btn-custom px-4 mt-4 d-block w-100'} variant="primary" type="submit">Sign Up</Button>
                    </Form.Group>
                </Form>
            </>
        )
    }
}