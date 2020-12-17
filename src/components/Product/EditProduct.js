import React, {Component} from 'react'
import {Form, Row, Col, Button} from "react-bootstrap";
import axios from "axios";
import {makeInputErrors, toastNotify} from "../../helpers/AppHelper";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";


export default class EditProduct extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {

            product: {
                id: '',
                title: '',
                description: '',
                price: '',
                image:''
            },
            errors: {}
        };

        this.handleChange = this.handleChange.bind(this);
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

    handleSubmit(event) {
        event.preventDefault();

        axios
            .put("/api/products/" + this.state.product.id, {...this.state.product}, {
                cancelToken: this.axiosCancelSource.token,
            })
            .then(response => {
                if (response.data) {
                    if (this._isMounted) {
                        this.setState({
                            product: response.data.data
                        });
                        toastNotify(toast, 'info', 'Updated Successfully.');
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

    handleEdit(id) {
        axios
            .get("/api/products/" + id, {
                cancelToken: this.axiosCancelSource.token
            })
            .then(response => {
                if (response.data) {
                    if (this._isMounted) {
                        this.setState({
                            product: response.data.data
                        });
                    }
                }
            })
            .catch(error => {
                if (axios.isCancel(error)) {
                    console.log(error.message);
                } else {
                    toastNotify(toast, 'error', error);
                }
            });
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
    componentDidMount() {
        this._isMounted = true;
        this.axiosCancelSource = axios.CancelToken.source();
        document.title = 'Edit : Product';
        this.handleEdit(this.props.match.params.id);
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
                        Edit Product
                        <Link className={'ml-4 click-to-go-another'} to='/products'>
                            <small><strong>View All Products</strong></small>
                        </Link>
                    </h3>
                    <div className={'edit-product'}>
                        <Form method={'POST'} onSubmit={(event) => this.handleSubmit(event)}>
                            <Row>
                                <Col xl={6}>
                                    <Row>
                                        <Col xl={12}>
                                            <Form.Group className={'upload-pic-fromControlFile d-flex align-items-center mb-4'}>
                                                <img src={this.state.product.image ? "data:image/png;base64," + this.state.product.image : "/assets/img/user-img.png"} id="product-pic" alt="product-pic"
                                                     className="img-fluid"/>
                                                <Form.File
                                                    onChange={(event) => this.handleChangeFile(event)}
                                                    id="FormControlFile"
                                                    label="Change Product Photo"
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
                                                              row={5}
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
                                                <Button className={'btn-custom px-4'} variant="info"
                                                        type="submit">
                                                    Update
                                                </Button>
                                                <Button className={'btn-custom-2 px-4 ml-2'} variant="secondary"
                                                        type="button"
                                                        onClick={() => this.props.history.push('/products/add')}>
                                                    Add New
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
