import React, {Component} from 'react'
import {Table, thead, tbody, tr, td, Dropdown, Form, Button,Modal} from 'react-bootstrap';
import {RiDeleteBinLine} from 'react-icons/ri';
import {toast} from 'react-toastify';
import {toastNotify} from '../../helpers/AppHelper'
import axios from 'axios';
import {confirmAlert} from 'react-confirm-alert';
import _ from "lodash";
import Pagination from 'rc-pagination';
import './Product.scss';
import {Link, NavLink} from "react-router-dom";
import {trackPromise} from "react-promise-tracker";
import {LoadingSpinerComponent} from '../Loader/LoadingSpinerComponent'

export default class AllProducts extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            products: [],
            pagination: {
                current_page: 10,
                per_page: 10,
                total: 10
            },
            deletableItems: [],
            searchKeywords: {
                keyword: ''
            },
            showModal: false,
            productImage: {},
        };

        this.handleSingleDelete = this.handleSingleDelete.bind(this);
        this.handleBatchDelete = this.handleBatchDelete.bind(this);
        this.handleChangeRowCheckbox = this.handleChangeRowCheckbox.bind(this);
        this.handleChangePagination = this.handleChangePagination.bind(this);
        this.handleChangeSearchKeyword = this.handleChangeSearchKeyword.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleChangeRowCheckbox(id, event) {
        let deletableItems = this.state.deletableItems;

        if (event.target.checked) {
            deletableItems.push(id);
        } else {
            deletableItems = deletableItems
                .filter(item => item !== id);
        }

        let uniqueDeletableItems = [...new Set(deletableItems)];
        this.setState(state => ({
            deletableItems: uniqueDeletableItems
        }));
    }

    handleChangePagination(page) {
        this.loadProducts(page, this.state.searchKeywords);
    }

    handleChangeSearchKeyword(event) {
        let searchKeywords = this.state.searchKeywords;
        searchKeywords[event.target.name] = event.target.value;

        this.setState({searchKeywords});
    }
    handleCloseModal() {
        this.setState({
            productImage: {},
            showModal: false
        });
    }
    showProductImageInModal(event, key) {
        event.preventDefault();
        let productImage = this.state.products;
        let pic = productImage[key];
        if (_.isEmpty(pic)) return;

        // console.log(order)

        this.setState({
            productImage: pic,
            showModal: true,
        })
    }

    handleSubmitSearchForm(event) {
        event.preventDefault();
        this.loadProducts(1, this.state.searchKeywords);
    }

    async loadProducts(page = 1, searchKeywords = {}) {
        await trackPromise(
            axios
            .get("/api/products", {
                cancelToken: this.axiosCancelSource.token,
                params: {
                    page: page,
                    ...searchKeywords
                }
            })
            .then(response => {
                if (response.data) {
                    if (this._isMounted) {
                        this.setState({
                            pagination: response.data.meta,
                            products: response.data.data
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
            })
        );
    }

    handleSingleDelete(id, event) {
        event.preventDefault();

        confirmAlert({
            title: '',
            message: 'Are you sure to do this?',
            buttons: [{
                label: 'Yes',
                onClick: () => axios
                    .delete("/api/products/" + id, {
                        cancelToken: this.axiosCancelSource.token
                    })
                    .then(response => {
                        if (response.data) {
                            toastNotify(toast, 'success', "Deleted Successfully.");
                            this.setState(state => ({
                                products: state.products.filter(product => product.id !== id)
                            }));
                        }
                    })
                    .catch(error => {
                        if (axios.isCancel(error)) {
                            console.log(error.message);
                        } else {
                            toastNotify(toast, 'error', error);
                        }
                    })
            }, {
                label: 'No',
            }]
        });
    }

    handleBatchDelete(event) {
        event.preventDefault();

        if (_.isEmpty(this.state.deletableItems)) {
            return toastNotify(toast, 'warning', "You didn't select any items.");
        }

        confirmAlert({
            title: '',
            message: 'Are you sure to do this?',
            buttons: [{
                label: 'Yes',
                onClick: () => axios
                    .delete("/api/products/batchDelete", {
                        cancelToken: this.axiosCancelSource.token,
                        params: {
                            ids: this.state.deletableItems.join(','),
                        },
                    })
                    .then(response => {
                        if (response.data) {
                            toastNotify(toast, 'success', response.data);

                            this.state.deletableItems.map(item =>
                                this.setState(state => ({
                                    products: state.products.filter(product => product.id !== item),
                                    deletableItems: [],
                                }))
                            );

                        }
                    })
                    .catch(error => {
                        if (axios.isCancel(error)) {
                            console.log(error.message);
                        } else {
                            toastNotify(toast, 'error', error);
                        }
                    })
            }, {
                label: 'No',
            }]
        });
    }

    componentDidMount() {
        this._isMounted = true;
        this.axiosCancelSource = axios.CancelToken.source();
        document.title = 'Products';
        this.loadProducts();
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
                        All Products
                        <Link className={'ml-4 click-to-go-another'} to='/products/add'>
                            <small><strong>Add Product</strong></small>
                        </Link>
                    </h3>
                    <div className={'all-product'}>
                        <Form className={'mb-5'} onSubmit={(event) => this.handleSubmitSearchForm(event)}>
                            <div className={'form-control-grid'}>
                                <div style={{backgroundImage: 'url(/assets/img/search.svg)'}}
                                     className={'picker-control search-control'}>
                                    <Form.Control
                                        className={'ks-form-control pl-5'}
                                        type="search"
                                        name={'keyword'}
                                        onChange={this.handleChangeSearchKeyword}
                                        value={this.state.searchKeywords.keyword}
                                        placeholder="Search"
                                    />
                                </div>
                                <Button type={'submit'} className={'btn btn-light rounded btn-custom text-light px-4'}>
                                    <img src={'./assets/img/filter.svg'} alt={''} className={'img-fluid mr-2'}/>
                                    Filter
                                </Button>
                                <Button type={'button'} className={'btn rounded btn-danger'}
                                        onClick={(event) => this.handleBatchDelete(event)}>
                                    <RiDeleteBinLine size={'1.2rem'} className={'mr-2'}/>
                                    Delete
                                </Button>
                            </div>
                        </Form>
                        <Table responsive="lg" className={'table-custom'} hover>
                            <thead className={'bg-dark text-light'}>
                            <tr>
                                <th style={{width: '75px'}}>#</th>
                                <th style={{width: '200px'}}>Title</th>
                                <th style={{width: '200px'}}>Description</th>
                                <th style={{width: '200px'}}>Price</th>
                                <th style={{width: '200px'}}>Image</th>
                                <th style={{textAlign: 'right'}}>&nbsp;</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.products.map((product, key) =>
                                <tr key={product.id}>
                                    <td><Form.Check
                                        type="checkbox"
                                        onChange={(event) => this.handleChangeRowCheckbox(product.id, event)}
                                        checked={this.state.deletableItems.includes(product.id)}
                                        value={product.id}/>
                                    </td>
                                    <td>{product.title}</td>
                                    <td>{product.description}</td>
                                    <td>{product.price}</td>
                                    <td><img onClick={(event) => this.showProductImageInModal(event,key)} src={product.image ? "data:image/png;base64," + product.image : "/assets/img/user-img.png"} id="product-pic" alt="product-pic"
                                             className="img-fluid product-pic"/></td>
                                    <td style={{textAlign: 'right'}}>
                                        <Dropdown drop={'left'}>
                                            <Dropdown.Toggle className={'bg-white'} variant={'light'}
                                                             id="instant-action">
                                                <img src={'./assets/img/helipicon.png'} alt={''}
                                                     className={'img-fluid'}/>
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                    <NavLink to={`/products/${product.id}/edit`}
                                                             className={'dropdown-item'}>
                                                        Edit
                                                    </NavLink>
                                                    <Button className={'dropdown-item'} variant="link"
                                                            onClick={(event) => this.handleSingleDelete(product.id, event)}>
                                                        Delete
                                                    </Button>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </Table>
                        <LoadingSpinerComponent/>
                        {/*Pagination Links*/}
                        <div className="row">
                            <div className="col-md-12 mt-4 text-right">
                                <Pagination
                                    className="ant-pagination"
                                    current={this.state.pagination.current_page}
                                    pageSize={this.state.pagination.per_page}
                                    onChange={this.handleChangePagination}
                                    total={this.state.pagination.total}
                                />
                            </div>
                        </div>
                    </div>
                    {/*Modal Order Details*/}
                    <Modal show={this.state.showModal} size="lg" dialogClassName="all-orders"
                           onHide={this.handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>{this.state.productImage.title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <img src={this.state.productImage.image ? "data:image/png;base64," + this.state.productImage.image : "/assets/img/user-img.png"} id="product-pic" alt="product-pic"
                                 className="img-fluid"/>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleCloseModal}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </main>
            </>
        )
    }
}
