import React, {Component} from 'react'
import './Header.scss'
import {Dropdown} from 'react-bootstrap';
import {FaChevronDown} from "react-icons/fa";
import auth from "../../libraries/AuthLibrary";

export default class Header extends Component {
    render() {
        return (
            <header className="App-header py-3">
                <div className="container-fluid">
                    <div className="row align-items-center justify-content-between">
                        <div className="col-lg-2">

                        </div>
                        <div className="col-lg-6">
                            <ul className="list-unstyled d-flex align-items-center justify-content-end pb-0 mb-0">
                                <li className="ml-4">
                                    <Dropdown>
                                        <Dropdown.Toggle className={'bg-white border-0'} variant="light">
                                            <span
                                                className="d-inline-block mr-3"><strong>Action</strong> <FaChevronDown/> </span>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item
                                                href="#//"
                                                onClick={() => auth.logout()}>
                                                Logout
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}
