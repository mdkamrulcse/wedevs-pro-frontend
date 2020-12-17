import React, {Component} from 'react'
import './Sidebar.scss'
import {NavLink, Link} from "react-router-dom";
import {connect} from 'react-redux'
import $ from 'jquery'

class Sidebar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            sidebarShow: null
        }
    }

    // dropdownInit
    dropdownInit() {
        $('.nav-item.dropdown > a').on('click', function (e) {
            e.preventDefault();
            let parentElement = $(this).parent('li');
            $(parentElement).siblings().find('> .dropdown-menu').slideUp(500);
            parentElement.find("> .dropdown-menu").slideToggle(500);
        });
    }

    componentDidMount() {
        this.dropdownInit();
        this.setState({
            sidebarShow: this.props.store.sideBarShow
        })
    }

    render() {
        return (
            <>
                <nav id="sidebar" className={this.state.sidebarShow ? 'sidebarVisible' : 'sidebarHidden'}>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink activeClassName="active" className="nav-link" to="/">
                                <svg id="open-collective" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                     viewBox="0 0 16 16">
                                    <path id="Path_941" data-name="Path 941"
                                          d="M16.682,15.15l1.7,2a9.281,9.281,0,0,0,1.751-5.511,9.3,9.3,0,0,0-1.7-5.44l-1.706,2a6.393,6.393,0,0,1-.05,6.957Z"
                                          transform="translate(-4.136 -3.639)" fill="#fff" opacity="0.5"/>
                                    <path id="Path_942" data-name="Path 942"
                                          d="M14.5,15.217a5.5,5.5,0,0,1-3.334,1.116A5.39,5.39,0,0,1,5.723,11a5.39,5.39,0,0,1,5.445-5.333,5.493,5.493,0,0,1,3.406,1.172l1.933-1.893A8.236,8.236,0,0,0,11.168,3,8.085,8.085,0,0,0,3,11a8.085,8.085,0,0,0,8.168,8,8.237,8.237,0,0,0,5.269-1.887Z"
                                          transform="translate(-3 -3)" fill="#fff"/>
                                </svg>
                                Dashboard
                            </NavLink>
                        </li>

                            <li className="nav-item dropdown">
                                <NavLink activeClassName="active" className="nav-link dropdown-toggle" to="/company"
                                         role="button" data-toggle="dropdown" aria-haspopup="true"
                                         aria-expanded="false">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                        <path id="shopping-bag"
                                              d="M4.4,3.6H15.6a.8.8,0,0,1,.8.8V15.6a.8.8,0,0,1-.8.8H4.4a.8.8,0,0,1-.8-.8V4.4A.8.8,0,0,1,4.4,3.6ZM2,4.4A2.4,2.4,0,0,1,4.4,2H15.6A2.4,2.4,0,0,1,18,4.4V15.6A2.4,2.4,0,0,1,15.6,18H4.4A2.4,2.4,0,0,1,2,15.6ZM10,10C7.791,10,6,7.851,6,5.2H7.6c0,2.053,1.335,3.2,2.4,3.2s2.4-1.147,2.4-3.2H14C14,7.851,12.209,10,10,10Z"
                                              transform="translate(-2 -2)" fill="#fff" fillRule="evenodd"/>
                                    </svg>
                                    Product Details
                                </NavLink>
                                <div className="dropdown-menu">
                                        <Link className="dropdown-item" to="/products/add">Add Products</Link>
                                        <Link className="dropdown-item" to="/products">All Products</Link>
                                </div>
                            </li>
                    </ul>
                </nav>
            </>
        )
    }
}


// mapStateToProps
const mapStateToProps = (state) => ({
    store: state
});

// connect to redux store
export default connect(mapStateToProps)(Sidebar)
