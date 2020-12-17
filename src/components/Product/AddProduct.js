import React, {Component} from 'react'
import {Form, Row, Col, Button} from "react-bootstrap";
import axios from "axios";
import {makeInputErrors, toastNotify} from "../../helpers/AppHelper";
import {toast} from "react-toastify";
import _ from "lodash";
import {Link} from "react-router-dom";


export default class AddProduct extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {

            product: {
                title: '',
                description: '',
                price: '',
                image: ''
            },
            errors: {}
        };

        this.hideErrorMessages = this.hideErrorMessages.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let product = this.state.product;
        product[event.target.name] = event.target.value;

        this.setState({product});
        this.hideErrorMessages(event);
    }



    hideErrorMessages(event) {
        let errors = this.state.errors;
        errors[event.target.name] = '';

        this.setState({errors});
    }
    handleChangeFile(event) {
        console.log('file to upload:', event.target.files[0]);
        let file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = this._handleReaderLoaded.bind(this);
            reader.readAsBinaryString(file);
        }
    }

    _handleReaderLoaded = (readerEvent) => {
        let product = this.state.product;
        const preview = document.getElementById('product-pic');
        let binaryString = readerEvent.target.result;
        product.image = btoa(binaryString);
        preview.src = "data:image/png;base64," + product.image;
        this.setState({product});
    }
    handleSubmit(event) {
        event.preventDefault();

        axios
            .post("/api/products", {...this.state.product}, {
                cancelToken: this.axiosCancelSource.token,
            })
            .then(response => {
                if (response.data) {
                    if (this._isMounted) {
                        toastNotify(toast, 'success', "Saved Successfully.");
                        document.getElementById('btdisabled').disabled = true;
                        let id = response.data.data.id;
                        if (!_.isEmpty(id.toString())) {
                            this.props.history.push(`/products/${id}/edit`);
                        }
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
        document.title = 'Add : Product';
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.axiosCancelSource.cancel('Cancel request.');
    }

    render() {
        return (
            <>
                <main id="main-content">
                    <h3 className={'mb-5 d-flex align-items-center flex-wrap'}>
                        Add Product
                        <Link className={'ml-4 click-to-go-another'} to='/products'>
                            <small><strong>View All Products</strong></small>
                        </Link>
                    </h3>
                    <div className={'add-product'}>
                        <Form method={'POST'} onSubmit={(event) => this.handleSubmit(event)}>
                            <Row>
                                <Col xl={6}>
                                    <Row>
                                        <Col xl={12}>
                                            <Form.Group className={'upload-pic-fromControlFile d-flex align-items-center mb-4'}>
                                                <img src="/assets/img/user-img.png" id="product-pic" alt="product-pic"
                                                     className="img-fluid"/>
                                                <Form.File
                                                    onChange={(event) => this.handleChangeFile(event)}
                                                    id="FormControlFile"
                                                    label="Add Product Photo"
                                                    accept=".png, .jpg, .jpeg"
                                                    className={'mb-0 ml-4'}/>
                                            </Form.Group>
                                        </Col>
                                        <Col xl={12}>
                                            <Form.Group>
                                                <Form.Label
                                                    className={'ks-label-control'}>Product Title</Form.Label>
                                                <Form.Control className={'ks-form-control'} type="text"
                                                              name="title"
                                                              onChange={(event) => this.handleChange(event)}
                                                              value={this.state.product.title}
                                                              placeholder="Enter title"/>
                                            </Form.Group>
                                            <label
                                                className={"error text-danger" + ((!this.state.errors.title) ? ' d-none' : '')}>
                                                {this.state.errors.title}
                                            </label>
                                        </Col>
                                        <Col xl={12}>
                                            <Form.Group>
                                                <Form.Label
                                                    className={'ks-label-control'}>Product Price</Form.Label>
                                                <Form.Control className={'ks-form-control'} type="text"
                                                              name="price"
                                                              onChange={(event) => this.handleChange(event)}
                                                              value={this.state.product.price}
                                                              placeholder="Enter price"/>
                                            </Form.Group>
                                            <label
                                                className={"error text-danger" + ((!this.state.errors.price) ? ' d-none' : '')}>
                                                {this.state.errors.price}
                                            </label>
                                        </Col>
                                        <Col xl={12}>
                                            <Form.Group>
                                                <Form.Label
                                                    className={'ks-label-control'}>Product Description</Form.Label>
                                                <Form.Control className={'ks-form-control ks-form-control-textarea'} as="textarea"
                                                              name="description"
                                                              rows={5}
                                                              onChange={(event) => this.handleChange(event)}
                                                              value={this.state.product.description}
                                                              placeholder="Enter description"/>
                                            </Form.Group>
                                            <label
                                                className={"error text-danger" + ((!this.state.errors.description) ? ' d-none' : '')}>
                                                {this.state.errors.description}
                                            </label>
                                        </Col>
                                        <Col xl={12}>
                                            <Form.Group className={'mt-3'}>
                                                <Button id="btdisabled" className={'btn-custom px-4'} variant="primary" type="submit">
                                                    Save
                                                </Button>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </main>
            </>
        )
    }
}
