import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import './Auth.scss'


export default class Reset extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    componentDidMount() {
        document.title = "Reset Password"
    }

    render() {
        return (
            <>
                <Form className={'auth-form'}>
                    <h3 className={'mb-5 text-center'}>Reset Password</h3>
                    <Form.Group>
                        <Form.Control className={'ks-form-control'} type="password" placeholder="Current Password" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control className={'ks-form-control'} type="password" placeholder="New Password" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control className={'ks-form-control'} type="password" placeholder="Confirm Password" />
                    </Form.Group>
                    <Form.Group>
                        <Button className={'btn-custom px-4 mt-4 d-block w-100'} variant="primary" type="submit">Submit</Button>
                    </Form.Group>
                </Form>
            </>
        )
    }
}
